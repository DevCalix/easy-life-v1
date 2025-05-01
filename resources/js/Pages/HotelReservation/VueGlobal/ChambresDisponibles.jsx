import React from "react";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import { Head, Link } from "@inertiajs/react";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";

const ChambresDisponibles = ({ chambres }) => {
  return (
    <>
      <HotelReservationNavbar />
      <div className="chambres-disponibles-page">
        <Head title="Chambres disponibles" />

        {/* En-tête de la page */}
        <div className="chambres-header text-center py-5">
          <h1 className="fw-bold  montserrat-normal">Chambres disponibles</h1>

          <p className="lead text-muted">
            Découvrez les chambres disponibles pour votre séjour.
          </p>

        </div>

        {/* Liste des chambres disponibles */}
        <div className="container">
          <div className="row">
            {chambres.length > 0 ? (
              chambres.map((chambre) => (
                <div key={chambre.id} className="col-md-4 mb-4">
                  <div className="card shadow-sm h-100">
                    {/* Image de la chambre */}
                    <img
                      src={chambre.image_principale}
                      alt={`Chambre ${chambre.numero_chambre}`}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />

                    {/* Corps de la carte */}
                    <div className="card-body">
                      <h5 className="card-title text-primary montserrat-normal fw-bold">
                        Chambre {chambre.numero_chambre}
                      </h5>

                      <p className="card-text text-muted montserrat-normal">
                        <i className="bi bi-cash-coin me-2"></i>
                        Prix par nuit : {chambre.prix_par_nuit} FCFA
                      </p>
                      <p className="card-text text-muted montserrat-normal">
                        <i className="bi bi-door-open me-2"></i>
                        Type : {chambre.type}
                      </p>
                      
                      {/* Bouton Voir les détails */}
                      <Link
                        href={`/reservation-hotel/chambre-details/${chambre.id}`}
                        className="btn btn-primary w-100"
                      >
                        Voir les détails
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-5">
                <p className="text-muted fs-5">
                  Aucune chambre disponible pour le moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <HotelFooter />
    </>
  );
};

export default ChambresDisponibles;
