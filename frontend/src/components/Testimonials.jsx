import React, { useState } from 'react';
import './Testimonials.css';

const testimonialsData = [
  {
    name: 'Mika K.',
    rating: 5,
    text: 'Postaaja on mullistanut työni täysin. Ennen käytin monta tuntia jokaisen myynti-ilmoituksen tekemiseen. Nykyään tietojen lisääminen vie vain viisi minuuttia, ja tekoäly tuottaa täydellistä suomenkielistä tekstiä, joka vastaa täysin odotuksiani. Olen huomannut, että aikaa myymiseen jää nykyään paljon enemmän.',
    date: '15. joulukuuta 2024',
    company: 'Kiinteistönvälittäjä',
  },
  {
    name: 'Anna L.',
    rating: 5,
    text: 'Telegram botti on erinomainen. Voin luoda ilmoituksia liikkeellä ollessani, esimerkiksi kiinteistöesittelyiden lomassa. Tekoäly saa tekstit kuulostamaan ihan minulta, ja suomenkieliset tekstit ovat aina kieliopillisesti täydellisiä. Ilmoitukseni keräävät nyt ennennäkemättömän paljon katseluita ja yhteydenottoja.',
    date: '8. joulukuuta 2024',
    company: 'Kiinteistönvälittäjä',
  },
  {
    name: 'Jari M.',
    rating: 4.5,
    text: 'Kiireisenä kiinteistönvälittäjänä aika on arvokkainta. Postaaja säästää sitä reilusti jokaiselta ilmoitukselta. Suosittelen lämpimästi!',
    date: '30. marraskuuta 2024',
    company: 'Kiinteistönvälittäjä',
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }

    return stars;
  };

  return (
    <div className="testimonials">
      <div className="testimonial-container">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="testimonial-card">
              <div className="reviewer-info">
                <span className="reviewer-name">{testimonial.name}</span>
                <div className="star-rating">{renderStars(testimonial.rating)}</div>
              </div>
              <p className="review-text">"{testimonial.text}"</p>
              <div className="review-footer">
                <span className="review-date">{testimonial.date}</span>
                <span className="review-company">{testimonial.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow left-arrow" onClick={handlePrev}>
      ←
      </button>
      <button className="arrow right-arrow" onClick={handleNext}>
      →
      </button>
    </div>
  );
};

export default Testimonials;