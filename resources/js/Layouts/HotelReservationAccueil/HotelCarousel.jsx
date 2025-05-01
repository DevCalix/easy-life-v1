import React from "react";
import '../../../css/hotelReservation/HotelCarousel.css';
import { Link } from "@inertiajs/react";

const HotelCarousel = ({ topHotels = [] }) => {
  return (
    <section className="hotel-carousel py-3 bg-light">
      <div className="container">
        <h2 className="" id="hotel-carousel-title" style={{ fontSize: "15px" }}>
          Nos meilleurs espaces
        </h2>
        <div
          id="hotelCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {/* Indicateurs */}
          <div className="carousel-indicators">
            {topHotels.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#hotelCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : ""}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {topHotels.map((hotel, index) => (
              <div
                key={hotel.id} // Utiliser l'ID de l'hôtel comme clé
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <Link href={`/reservation-hotel/nos-hotels/${hotel.id}`} className="d-block">
                  <img
                    src={hotel.image_principale}
                    className="d-block w-100 rounded"
                    alt={hotel.nom}
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                  </Link>
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                  <h5 className="text-white">{hotel.nom}</h5>
                  <p className="text-light">{hotel.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contrôles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#hotelCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#hotelCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotelCarousel;
