import React from "react";
import { Inertia } from "@inertiajs/inertia";
import "../../../css/hotelReservation/PromotionsSection.css";

export default function PromotionsSection({ promotions = [] }) {
  const handlePromotionDetail = (promotionId) => {
    // Redirige vers la page de détail de la promotion
    Inertia.visit(`/reservation-hotel/promotion-details/${promotionId}`);
  };

  return (
    <section className="promotions-section py-2">
      <div className="container">
        <h2 className="montserrat-normal fw-bold">Promotions</h2>
        <div className="carousel-container">
          <div className="carousel d-flex gap-2">
            {promotions.map((promo) => (
              <div className="promo-card shadow-sm rounded" key={promo.id}>
                {/* Conteneur de l'image avec le badge de réduction */}
                <div className="promo-image-container">
                  <img
                    src={promo.chambre?.image_principale || promo.hotel?.image_principale}
                    alt={promo.chambre ? `Chambre ${promo.chambre.numero_chambre}` : promo.hotel.nom}
                    className="promo-image"
                  />
                  {/* Badge de réduction */}
                  <div className="promo-discount-badge">
                    <span className="montserrat-normal fw-bold">
                      {promo.pourcentage_reduction}%
                    </span>
                  </div>
                </div>

                {/* Contenu de la promotion (nom de l'hôtel, numéro de la chambre, bouton) */}
                <div className="promo-content p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="montserrat-normal fw-bold mb-0">
                      {promo.hotel.nom}
                    </h6>
                    <span> - </span>
                    <h6 className="montserrat-normal fw-bold mb-0">
                      {promo.chambre ? `Chambre ${promo.chambre.numero_chambre}` : "Promotion générale"}
                    </h6>
                  </div>

                  {/* Bouton "Détails" */}
                  <div className="d-flex justify-content-between align-items-center mt-3 montserrat-normal">
                    <button
                      className="btn btn-primary w-100 mb-2 fw-bold"
                      onClick={() => handlePromotionDetail(promo.id)}
                    >
                      Détails
                    </button>
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
