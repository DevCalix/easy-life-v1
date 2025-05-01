import React from "react";
import "../../../css/hotelReservation/CityAccommodations.css";
import { Link } from "@inertiajs/react";

const CityAccommodations = ({ accommodations = [] }) => {
  return (
    <section className="horizontal-offers-section py-3">
      <div className="container">
        <h1 className="mb-4" id="cityTitle">
          Logements dans votre ville
        </h1>
        {/* Conteneur défilant horizontalement */}
        <div className="d-flex overflow-auto gap-2 horizontal-scroll">
          {accommodations.map((accommodation, index) => (
            <div
              key={index}
              className="card shadow-sm border-0 rounded"
              style={{ width: "18rem", minWidth: "18rem" }}
            >
              <img
                src={accommodation.image}
                className="card-img-top"
                alt={accommodation.name}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <div className="card-body text-center montserrat-normal">
                <h5 className="card-title" id="card-title-city">
                  {accommodation.name}
                </h5>
                
                <p className="card-text text-success poppins-bold">
                  {accommodation.price}
                </p>
                <Link
                  href={`/reservation-hotel/nos-hotels/${accommodation.id}`}
                  className="btn btn-primary w-100 mb-2"
                >
                  Détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityAccommodations;
