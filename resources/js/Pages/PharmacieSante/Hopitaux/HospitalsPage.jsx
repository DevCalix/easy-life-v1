import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import React, { useState } from "react";

const HospitalsPage = ({ hopitals = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les hôpitaux en fonction de la ville
  const filteredHospitals = hopitals.filter((hospital) =>
    hospital.adresse.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PharmaNavbar />
      <div className="container my-5">
        {/* Titre principal */}
        <div className="text-center mb-5">
          <h1 className="fw-bold montserrat-normal text-success">Hôpitaux Proches</h1>
          <hr className="border border-success border-1 opacity-75"/>
          <p className="text-muted">
            Trouvez rapidement un hôpital proche avec toutes les informations
            d'urgence et plus.
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-5">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Rechercher par ville (ex : Douala, Yaoundé)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Liste des hôpitaux */}
        <div className="row gy-4">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="col-6 col-md-4 col-lg-3"
              >
                <div className="card shadow-lg border-0 rounded-3 h-100">
                  {/* Image de l'hôpital */}
                  <img
                    src={hospital.image_principale ? hospital.image_principale : "/images/placeholder.png"} // Utilisez une image par défaut si aucune image n'est disponible
                    className="card-img-top img-fluid rounded-3"
                    alt={hospital.nom}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <div className="card-body">
                    {/* Nom et Adresse */}
                    <h5 className="card-title fw-bold montserrat-normal">{hospital.nom}</h5>
                    <p className="card-text mb-2">
                      <i className="bi bi-geo-alt text-primary me-2 montserrat-normal"></i>
                      {hospital.adresse}
                    </p>

                    {/* Bouton Appeler */}
                    <a
                      href={`tel:${hospital.telephone}`}
                      className="btn btn-danger w-100 mt-3"
                    >
                      <i className="bi bi-telephone-fill me-2 montserrat-normal"></i>Appeler
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              Aucun hôpital trouvé pour "{searchQuery}".
            </div>
          )}
        </div>
      </div>
      <PharmacieFooter />
    </>
  );
};

export default HospitalsPage;
