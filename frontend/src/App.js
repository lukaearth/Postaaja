import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './assets/postaaja2.png';
import arrow from './assets/arrow.svg';
import './App.css';
import Testimonials from './components/Testimonials';
import heroImage from './assets/hero23.jpg';
import heroImage2 from './assets/hero22.jpg';
import SmoothScroll from './components/NavBar';
import { SiTelegram, SiOpenai } from 'react-icons/si';
import { Rocket, Clock, Brush, AlarmClock } from 'lucide-react';
import { PrivacyPolicy, TermsOfService } from './components/Policies';

function App() {
  const scriptsLoaded = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  const heroImages = [
    heroImage,
    heroImage2,
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Auto-rotate hero images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (scriptsLoaded.current) return;
    scriptsLoaded.current = true;

    const loadKoalendarScripts = async () => {
      try {
        if (window.Koalendar) return;

        const script1 = document.createElement('script');
        script1.innerHTML = `window.Koalendar=window.Koalendar||function(){(Koalendar.props=Koalendar.props||[]).push(arguments)};`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = 'https://koalendar.com/assets/widget.js';
        script2.async = true;
        script2.defer = true;
        await new Promise((resolve, reject) => {
          script2.onload = resolve;
          script2.onerror = () => reject(new Error('Failed to load Koalendar widget.js'));
          document.head.appendChild(script2);
        });

        setTimeout(() => {
          const script3 = document.createElement('script');
          script3.innerHTML = `Koalendar('inline', {"url":"https://koalendar.com/e/meet-with-postaaja","selector":"#inline-widget-meeting-with-postaaja"});`;
          document.head.appendChild(script3);
        }, 300);
      } catch (error) {
        console.error('Error loading Koalendar scripts:', error);
      }
    };

    loadKoalendarScripts();

    return () => {
      const scripts = document.querySelectorAll('script[data-koalendar]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <SmoothScroll />
              <header className="header">
                <div className="header-container">
                  <div className="nav">
                    <a href="/" className="logo">
                      <img alt="logo" src={logo} />
                      <span>Postaaja</span>
                    </a>
                    <button
                      className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                      aria-label="Avaa valikko"
                      aria-expanded={isMenuOpen}
                      onClick={toggleMenu}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                      <a href="#about-us" onClick={toggleMenu}>Näin pääset alkuun</a>
                      <a href="#services" onClick={toggleMenu}>Ominaisuudet</a>
                      <a href="#pricing" onClick={toggleMenu}>Hinnasto</a>
                      <a href="#why-choose-us" onClick={toggleMenu}>Miksi Postaaja?</a>
                    </div>
                    {!isMobile && (
                      <a className="trial-btn" href="#book-a-call">Kokeile kuukausi ilmaiseksi</a>
                    )}
                  </div>
                </div>

                <div className="hero">
                  <div className="hero-content">
                    <h1>Myynti-ilmoitukset helposti ja nopeasti</h1>
                    <p>Lopeta tuntien tuhlaaminen myynti-ilmoituksiin. 
                    <br />Anna Postaajan hoitaa kirjoittaminen, jotta sinä 
                    <br />voit keskittyä täysillä myymiseen.</p>
                    <a href="#book-a-call" className="cta-btn">
                      <span>Kokeile kuukausi ilmaiseksi</span>
                      <img alt="button-icon" src={arrow} />
                    </a>
                  </div>
                  <div className="hero-image">
                    {heroImages.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt="Pääkuva" 
                        className={`hero-slide ${index === currentHeroIndex ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </header>

              <Section id="about-us" title="Näin pääset alkuun">
                <div className="process-steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>Ota yhteyttä</h3>
                      <p>Ota yhteyttä sähköpostitse <a classname="mail" href="mailto:asiakaspalvelu@postaaja.com">asiakaspalvelu@postaaja.com</a>, tai sovi ilmainen konsultaatio sivun alaosasta.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>Luomme sinulle botin</h3>
                      <p>Keräämme näytteitä edellisistä töistäsi, ja opetamme tekoälyn kirjoittamaan sinun tyylilläsi.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>Käytä Telegramissa</h3>
                      <p>Avaa Postaaja Telegramissa ja seuraa ohjeita. Annamme sinulle helpot ohjeet tähän.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3>Syötä tiedot</h3>
                      <p>Syötä myymäsi tuotteen keskeiset tiedot valmiina olevan mallin avulla.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">5</div>
                    <div className="step-content">
                      <h3>Tekoäly kirjoittaa</h3>
                      <p>Botti luo ja palauttaa laadukkaan tekstin sinun äänelläsi <b>sekunneissa</b>.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">6</div>
                    <div className="step-content">
                      <h3>Tarkista ja julkaise</h3>
                      <p>Muokkaa tekstiä tarvittaessa ja julkaise missä haluat.</p>
                    </div>
                  </div>
                  <div className="step comingsoon">
                    <div className="step-number">7</div>
                    <div className="step-content">
                      <div className="coming-soon-badge">Tulossa pian</div>
                      <h3>Automaattinen Julkaisu</h3>
                      <p>Botti automaattisesti julkaisee valmiin ilmoituksesi valitsemillesi alustoille.</p>
                    </div>
                  </div>
                </div>
                <a href="#book-a-call" className="section-btn-6">Kokeile nyt ilmaiseksi</a>
              </Section>

              <Section id="services" title="Postaajan Ominaisuudet">
                <div className="features-grid">
                  <div className="feature">
                    <div className="feature-icon"><SiOpenai size={24} aria-hidden="true" /></div>
                    <h3>GPT-4o-pohjainen tekoäly</h3>
                    <p>Tekoälylle opetetaan sinun tyylisi, ja se generoi vakuuttavia myyntitekstejä puolestasi sekunneissa.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon"><Brush size={24} aria-hidden="true" /></div>
                    <h3>Yksilöllinen tyyli</h3>
                    <p>Säilyttää sinun oman äänen ja ilmaisutavan ilmoituksissa, jotta ilmoitukset kuulostavat edelleen sinulta.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon"><SiTelegram size={24} aria-hidden="true" /></div>
                    <h3>Helppo käyttöönotto</h3>
                    <p>Käytä bottia kätevästi suoraan Telegramissa. Opit käyttämään Postaajaa muutamassa minuutissa.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon"><AlarmClock size={24} aria-hidden="true" /></div>
                    <h3>Käytä milloin tahansa</h3>
                    <p>Postaaja on käytössäsi vuorokauden kaikkina aikoina, joten voit käyttää sitä milloin tahansa.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon"><Clock size={24} aria-hidden="true" /></div>
                    <h3>Säästä reilusti aikaa</h3>
                    <p>Julkaise enemmän, myy enemmän – samalla työajalla. Postaajan avulla vapautat kymmeniä tunteja työaikaa kuukaudesta.</p>
                  </div>
                  <div className="feature">
                    <div className="feature-icon"><Rocket size={24} aria-hidden="true" /></div>
                    <h3>Automaattinen julkaisu (tulossa)</h3>
                    <p>Rakennamme parhaillaan automaattisia julkaisutoimintoja useille alustoille.</p>
                  </div>
                </div>
                <a href="#book-a-call" className="section-btn">Tutustu ominaisuuksiin</a>
              </Section>

              <Section id="pricing" title="Selkeät hinnoittelupaketit" className="pricing-section">
                <p className="no-commitment">Postaajan paketeissa ei ole sitoumusta, ja voit peruuttaa palvelun yhdellä sähköpostilla milloin tahansa.</p>
                <div className="pricing-cards">
                  <div className="pricing-card">
                    <div className="card-header">
                      <h3>Aloittelija</h3>
                      <div className="price">49 €<span>/kk</span></div>
                      <p className="posts">30 ilmoitusta kuukaudessa</p>
                    </div>
                    <ul>
                      <li>Tärkeimmät ominaisuudet mukana</li>
                      <li>Personoitu tekoäly</li>
                      <li>Telegram-botti</li>
                      <li>Tekoälyllä luotu teksti</li>
                    </ul>
                    <a href="#book-a-call" className="pricing-btn">Aloita nyt</a>
                  </div>
                  <div className="pricing-card featured">
                    <div className="popular-badge">Suosituin</div>
                    <div className="card-header">
                      <h3>Ammattilainen</h3>
                      <div className="price">99 €<span>/kk</span></div>
                      <p className="posts">100 ilmoitusta kuukaudessa</p>
                    </div>
                    <ul>
                      <li>Kaikki Simppeli-paketin ominaisuudet</li>
                      <li>Ensisijainen tuki</li>
                      <li>Automaattinen Postaus (tulossa)</li>
                    </ul>
                    <a href="#book-a-call" className="pricing-btn featured-btn">Aloita nyt</a>
                  </div>
                  <div className="pricing-card">
                    <div className="card-header">
                      <h3>Yritys</h3>
                      <div className="price">299 €<span>/kk</span></div>
                      <p className="posts">500 ilmoitusta kuukaudessa</p>
                    </div>
                    <ul>
                      <li>Kaikki Ammattilainen-paketin ominaisuudet</li>
                      <li>Oma tilivastaava</li>
                      <li>Kuukausittaiset analyysit</li>
                    </ul>
                    <a href="#book-a-call" className="pricing-btn">Aloita nyt</a>
                  </div>
                </div>
              </Section>

              <Section id="why-choose-us" title="Miksi valita Postaaja?">
                <p className="section-subtitle">Postaajan avulla säästät <b>kymmeniä tunteja</b>  joka kuukausi. Älä usko pelkästään meitä – katso miten asiakkaamme säästävät aikaa ja tekevät enemmän kauppoja kuin koskaan ennen:</p>
                <Testimonials />
                <a href="#book-a-call" className="section-btn">Liity aikaa säästävien asiakkaidemme joukkoon
                  <img alt="button-icon" src={arrow} />
                </a>
              </Section>

              <Section id="book-a-call" title="Haluatko säästää aikaa ja tehostaa myyntiäsi?">
                <p className="section-subtitle">Varaa ilmainen konsultaatio ja näe, miten Postaaja voi mullistaa arkeasi – olipa alasi mikä tahansa. <b>Jos et koe konsultaatiota tarpeelliseksi, voit ottaa suoraan yhteyttä sähköpostitse <a href="mailto:asiakaspalvelu@postaaja.com" classname="mail">asiakaspalvelu@postaaja.com</a></b></p>
                <div id="inline-widget-meeting-with-postaaja" className="booking-widget">
                  <div className="booking-widget-loading">
                    <p>Ladataan varaustyökalua...</p>
                  </div>
                </div>
                <p className="booking-note">Tarvitsetko apua tai eivätkö vapaat ajat sovi sinulle?</p>
                <a href="#contact-info" className="section-btn">Ota yhteyttä</a>
              </Section>

              <footer className="footer">
                <div className="footer-container">
                  <div className="footer-brand">
                    <div className="footer-logo">
                      <img alt="Postaaja Logo" src={logo} />
                      <h2>Postaaja</h2>
                    </div>
                    <p>© 2025 Postaaja. Kaikki oikeudet pidätetään.</p>
                  </div>
                  <div className="footer-links">
                    <div className="footer-nav">
                      <a href="/privacy-policy">Tietosuojaseloste</a>
                      <a href="/terms-of-service">Käyttöehdot</a>
                    </div>
                    <div id="contact-info" className="footer-nav">
                      <a href="mailto:asiakaspalvelu@postaaja.com"><b>asiakaspalvelu@postaaja.com</b></a>
                    </div>
                    

                  </div>
                </div>
              </footer>
            </div>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-container">
        <div className="section-content">
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

export default App;