import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Simple Privacy Policy and Terms of Service components for Postaaja
// Place these components in your React app and route to them (e.g. /privacy-policy and /terms-of-service)

export function PrivacyPolicy() {
  return (
    <div className="policy-page container">
      {/* Back Button */}
      <Link to="/" className="back-btn">
         
  <span>←  Takaisin</span>
      </Link>

      <h1>Tietosuojaseloste</h1>

      <section>
        <h2>1. Yhteenveto</h2>
        <p>
          Postaaja kerää ja käsittelee käyttäjätietoja tarjotakseen palvelunsa. Tämä
          tietosuojaseloste kertoo, mitä tietoja keräämme, miksi ja miten niitä käytetään.
        </p>
      </section>

      <section>
        <h2>2. Mitä tietoja keräämme</h2>
        <ul>
          <li>Yhteystiedot (nimi, sähköposti, puhelinnumero) kun varaat konsultoinnin tai otat yhteyttä.</li>
          <li>Tekniset tiedot (IP-osoite, selain, laitetiedot ja evästeet sivuston toiminnallisuutta varten).</li>
        </ul>
      </section>

      <section>
        <h2>3. Miten käytämme tietoja</h2>
        <p>Käytämme tietoja palvelun tarjoamiseen, asiakastukeen, laskutukseen ja palvelun kehittämiseen. Emme myy henkilötietoja kolmansille osapuolille.</p>
      </section>

      <section>
        <h2>4. Kolmannet osapuolet</h2>
        <p>
          Käytämme kolmannen osapuolen palveluita (esim. Koalendar, sähköposti- ja maksupalvelut) joiden omat tietosuojakäytännöt voivat koskea tietojen käsittelyä.
        </p>
      </section>

      <section>
        <h2>5. Evästeet</h2>
        <p>Sivustomme käyttää evästeitä perustoiminnallisuuteen ja analytiikkaan. Voit estää evästeet selaimesi asetuksista, mutta osa sivusta saattaa toimia heikommin.</p>
      </section>

      <section>
        <h2>6. Säilytys ja turvallisuus</h2>
        <p>Tallennamme henkilötietoja vain niin kauan kuin on tarpeen palvelun tarjoamiseksi tai lain edellyttämällä tavalla. Käytämme perustason suojaustoimia tietojen suojaamiseksi.</p>
      </section>

      <section>
        <h2>7. Käyttäjän oikeudet</h2>
        <p>Sinulla on oikeus pyytää pääsyä omiin tietoihisi, korjausta, poistamista ja käsittelyn rajoittamista. Ota yhteyttä osoitteeseen <a href="mailto:asiakaspalvelu@postaaja.com">asiakaspalvelu@postaaja.com</a>.</p>
      </section>

      <section>
        <h2>8. Muutokset</h2>
        <p>Muutamme tätä tietosuojaselostetta tarvittaessa. Ilmoitamme merkittävistä muutoksista sivustolla.</p>
      </section>

      <section>
        <h2>9. Yhteystiedot</h2>
        <p>Jos sinulla on kysymyksiä tietosuojaselosteesta, ota yhteyttä: <a href="mailto:asiakaspalvelu@postaaja.com">asiakaspalvelu@postaaja.com</a>.</p>
      </section>
    </div>
  );
}

export function TermsOfService() {
  return (
    <div className="policy-page container">
      {/* Back Button */}
      <Link to="/" className="back-btn">
        <span>← Takaisin</span>
      </Link>

      <h1>Käyttöehdot</h1>

      <section>
        <h2>1. Palvelun kuvaus</h2>
        <p>Postaaja tarjoaa Telegram-pohjaisen tekoälypalvelun, joka auttaa luomaan myynti-ilmoituksia ja sisältöä asiakkaan ohjeiden mukaisesti.</p>
      </section>

      <section>
        <h2>2. Hyväksyntä</h2>
        <p>Käyttämällä palvelua hyväksyt nämä käyttöehdot.</p>
      </section>

      <section>
        <h2>3. Maksut ja peruutukset</h2>
        <p>
          Kuvailemme palvelupaketit ja hinnat sivustolla. Paketeissa ei ole sitoumusta ja voit peruuttaa palvelun milloin tahansa lähettämällä sähköpostin osoitteeseen <a href="mailto:asiakaspalvelu@postaaja.com">asiakaspalvelu@postaaja.com</a>.
        </p>
      </section>

      <section>
        <h2>4. Vastuut ja takuut</h2>
        <p>Palvelu toimitetaan "sellaisena kuin se on". Emme takaa virheettömyyttä tai jatkuvaa katkeamatonta palvelua. Postaaja ei ole vastuussa kolmansien osapuolten alustoilla tapahtuvista toimista tai käytöstä.</p>
      </section>

      <section>
        <h2>5. Käyttäjän velvollisuudet</h2>
        <ul>
          <li>Et käytä palvelua lainvastaiseen tai loukkaavaan toimintaan.</li>
          <li>Vastaat itse julkaisemiesi ilmoitusten sisällöstä ja niiden lainmukaisuudesta.</li>
        </ul>
      </section>

      <section>
        <h2>6. Immateriaalioikeudet</h2>
        <p>Postaaja omistaa palvelun ja sivuston sisältöjen tekijänoikeudet. Käyttäjä säilyttää omat oikeutensa aineistoihinsa ja esittämiinsä tyyleihin, joiden perusteella luomme tekstejä.</p>
      </section>

      <section>
        <h2>7. Vastuunrajoitus</h2>
        <p>Postaaja ei ole vastuussa välillisistä tappioista tai ansionmenetyksistä. Vastuumme rajoittuu maksetun tilauksen määrään viimeisen 12 kuukauden ajalta.</p>
      </section>

      <section>
        <h2>8. Sovellettava laki</h2>
        <p>Näihin ehtoihin sovelletaan Suomen lakia ja mahdolliset riidat ratkaistaan ensisijaisesti neuvottelemalla.</p>
      </section>

      <section>
        <h2>9. Yhteystiedot</h2>
        <p>Jos sinulla on kysymyksiä käyttöehdoista, ota yhteyttä: <a href="mailto:asiakaspalvelu@postaaja.com">asiakaspalvelu@postaaja.com</a>.</p>
      </section>
    </div>
  );
}

export default { PrivacyPolicy, TermsOfService };