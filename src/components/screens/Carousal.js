import React, { useEffect } from "react";
import teleim from "/Users/heeren094/Downloads/hackton/telecom/src/components/screens/teleim.jpg";
import teleimg1 from "/Users/heeren094/Downloads/hackton/telecom/src/components/screens/teleimg1.jpg";
import tele2 from "/Users/heeren094/Downloads/hackton/telecom/src/components/screens/tele2.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Carousal.css"; // Custom styles

export default function Carousal() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const slides = [
    {
      image: teleim,
      title: "Welcome to Services",
      description:
        "Telecommunications services encompass a wide range of technologies and systems that facilitate the transmission of data, voice, video, and text across networks.",
      animation: "fade-up",
    },
    {
      image: teleimg1,
      title: "5G New Evolution",
      description:
        "5G, or the fifth generation of mobile network technology, represents a significant evolution in wireless communication.",
      animation: "fade-right",
    },
    {
      image: tele2,
      title: "Remote Connection",
      description:
        "The ability to access and control a system, device, or network from a distant location.",
      animation: "fade-left",
    },
  ];

  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-pause="hover"
      >
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={slide.image}
                className="d-block w-100"
                alt={`Slide ${index + 1}: ${slide.title}`}
                style={{ filter: "brightness(50%)" }}
              />
              <div
                className="carousel-caption d-none d-md-block"
                data-aos={slide.animation}
              >
                <h1 className="carousel-title">{slide.title}</h1>
                <p className="carousel-description">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
<button
  className="carousel-control-prev"
  type="button"
  data-bs-target="#carouselExampleCaptions"
  data-bs-slide="prev"
>
  <i className="fas fa-chevron-left"></i>
</button>
<button
  className="carousel-control-next"
  type="button"
  data-bs-target="#carouselExampleCaptions"
  data-bs-slide="next"
>
  <i className="fas fa-chevron-right"></i>
</button>

      </div>
    </div>
  );
}