import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { useNavigate } from 'react-router-dom';
import fc25Image from '../assets/images/game003.avif';
import jerseyImage1 from '../assets/images/game002.webp';
import jerseyImage2 from '../assets/images/game001.webp';

const Carousel = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: fc25Image,
      title: "Next-Gen Gaming",
      subtitle: "Experience cutting-edge gameplay",
      description: "Discover the latest titles with stunning graphics",
      buttonText: "Explore Games",
      theme: "dark"
    },
    {
      image: jerseyImage1,
      title: "Premium Gear",
      subtitle: "Elevate your gaming setup",
      description: "High-performance equipment for serious gamers",
      buttonText: "Shop Gear",
      theme: "light"
    },
    {
      image: jerseyImage2,
      title: "Exclusive Deals",
      subtitle: "Limited-time offers",
      description: "Save on top-rated gaming products",
      buttonText: "View Deals",
      theme: "dark"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="modern-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className={`slide-overlay ${slide.theme === 'dark' ? 'dark-overlay' : 'light-overlay'}`}></div>
            <div className="slide-content">
              <div className="content-wrapper">
                <h3 className="slide-subtitle">{slide.subtitle}</h3>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
                <button 
                  onClick={() => navigate("/GetProducts")} 
                  className={`slide-button ${slide.theme === 'dark' ? 'light-button' : 'dark-button'}`}
                >
                  {slide.buttonText}
                  <span className="button-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="carousel-control prev" onClick={goToPrev}>
          <svg viewBox="0 0 24 24">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>
        <button className="carousel-control next" onClick={goToNext}>
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="indicator-progress"></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;