import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "../../../css/hotelReservation/HotelSearchSection.css";

export default function HotelSearchSection() {
  const [destination, setDestination] = useState("");
  const [nombreChambres, setNombreChambres] = useState("1");
  const [nombrePersonnes, setNombrePersonnes] = useState(1);

  const handleSearch = () => {
    // Redirige vers la route de recherche avec les paramètres
    Inertia.visit("/reservation-hotel/recherche-logement", {
      method: "get",
      data: {
        destination,
        nombreChambres,
        nombrePersonnes,
      },
    });
  };

  return (
    <section className="hotel-search-section py-3" id="hotel-search">
      <div className="container-fluid">
        <h1 className="section-title montserrat-normal fw-bold">
          Trouvez votre <span className="highlight">logement idéal</span>
        </h1>
        <div className="search-form" id="hotel-search">
          {/* Formulaire */}
          <div className="row g-2 montserrat-normal">
            {/* Destination */}
            <div className="col-md-4">
              <label htmlFor="destination" className="form-label poppins-medium">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                className="form-control"
                placeholder="Ville, région ou hôtel"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Nombre de chambres */}
            <div className="col-md-3">
              <label htmlFor="nombreChambres" className="form-label">
                Nombre de chambres
              </label>
              <input
                type="number"
                id="nombreChambres"
                className="form-control"
                value={nombreChambres}
                onChange={(e) => setNombreChambres(e.target.value)}
              />
            </div>

            {/* Nombre de personnes */}
            <div className="col-md-3">
              <label htmlFor="nombrePersonnes" className="form-label">
                Nombre de personnes
              </label>
              <input
                type="number"
                id="nombrePersonnes"
                className="form-control"
                value={nombrePersonnes}
                onChange={(e) => setNombrePersonnes(e.target.value)}
              />
            </div>

            {/* Bouton Rechercher */}
            <div className="col-md-1 d-flex align-items-end">
              <button className="btn btn-search btn-sm" onClick={handleSearch}>
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
