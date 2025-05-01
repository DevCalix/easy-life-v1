import React from "react";
import { Inertia } from "@inertiajs/inertia";
import "../../../css/hotelReservation/CoupDeCoeurSection.css";

export default function CoupDeCoeurSection({ topChambres = [] }) {
  const handleChambreDetail = (chambreId) => {
    // Redirige vers la page de détail de la chambre
    Inertia.visit(`/reservation-hotel/chambre-details/${chambreId}`);
  };

  return (
    <section className="coup-de-coeur-section py-3" id="coup-coeur">
      <div className="container">
        <h2 className="montserrat-normal fw-bold">Nos Coupes de coeurs</h2>
        <div className="carousel-container">
          <div className="carousel d-flex gap-2">
            {topChambres.map((chambre) => (
              <div key={chambre.id} className="hotel-card shadow-sm rounded">
                <img
                  src={chambre.image_principale} // Utilisez le champ de la base de données pour l'image
                  alt={chambre.hotel.nom} // Utilisez le nom de l'hôtel associé
                  className="hotel-image"
                />
                <div className="hotel-info p-3">
                  <h5 className="hotel-title montserrat-normal fw-bold">
                    {chambre.hotel.nom} - Chambre {chambre.numero_chambre}
                  </h5>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="text-success montserrat-normal fw-bold">
                      {chambre.prix_par_nuit} FCFA / nuit
                    </span>
                    <div className="montserrat-normal">
                      <button
                        className="btn btn-primary btn-sm ms-2 fw-bold"
                        onClick={() => handleChambreDetail(chambre.id)}
                      >
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
