import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import "../../../../css/hotelReservation/ChambreDetails.css"; // Assurez-vous d'avoir ce fichier CSS
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";

const ChambreDetails = ({ chambre }) => {
  const [selectedImage, setSelectedImage] = useState(null); // État pour l'image sélectionnée

  return (
    <>
      <HotelReservationNavbar />
      <div className="chambre-details-page">
        <Head title={`Détails de la chambre ${chambre.numero_chambre}`} />

        {/* Section de l'image principale */}
        <div className="chambre-hero">
          <img
            src={chambre.image_principale}
            alt={`Chambre ${chambre.numero_chambre}`}
            className="chambre-hero-image"
          />
          <div className="chambre-hero-overlay">
            <h1 className="chambre-name montserrat-normal">
              Chambre {chambre.numero_chambre}
            </h1>
            <p className="chambre-location montserrat-normal">
              {chambre.hotel.nom}, {chambre.hotel.ville}
            </p>
          </div>
        </div>

        {/* Section des détails */}
        <div className="container py-2">
          <div className="row">
            {/* Description de la chambre et images secondaires */}
            <div className="col-md-8">
              <h2 className="my-2 montserrat-normal fw-bold">À propos de cette chambre</h2>
              <hr className="border border-danger border-3 opacity-75" />
              <p className="chambre-description text-muted montserrat-normal">{chambre.description}</p>

              {/* Section des images secondaires en carrousel horizontal */}
              {chambre.images.length > 0 && (
                <>
                  <h3 className="mt-2 montserrat-normal fw-bold">Galerie d'images</h3>
                  <hr className="border border-danger border-3 opacity-75" />
                  <div id="chambreImageCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="d-flex overflow-auto gap-2 p-2">
                          {chambre.images.map((image, index) => (
                            <img
                              key={index}
                              src={image.url}
                              alt={`Image ${index + 1} de la chambre ${chambre.numero_chambre}`}
                              className="rounded shadow-sm"
                              style={{ height: "150px", width: "200px", objectFit: "cover", cursor: "pointer" }}
                              data-bs-toggle="modal"
                              data-bs-target="#imagePreviewModal"
                              onClick={() => setSelectedImage(image.url)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Équipements */}
              <h3 className="mt-3 montserrat-normal fw-bold">Équipements</h3>
              <hr className="border border-danger border-3 opacity-75" />
              <ul className="list-group list-group-flush">
                {chambre.equipements.map((equipement, index) => (
                  <li key={index} className="list-group-item">
                    <i className="bi bi-check-circle me-2 text-success montserrat-normal"></i>
                    {equipement.nom}
                  </li>
                ))}
              </ul>
            </div>

            {/* Informations supplémentaires */}
            <div className="col-md-4">
              {/* Carte 1 : Informations de la chambre */}
              <div className="card shadow-sm montserrat-normal mb-3">
                <div className="card-body">
                  <h5 className="card-title">Informations de la chambre</h5>
                  <p className="card-text">
                    <strong>Type :</strong> {chambre.type}
                  </p>
                  <p className="card-text">
                    <strong>Prix par nuit :</strong> {chambre.prix_par_nuit} FCFA
                  </p>
                  <p className="card-text">
                    <strong>Capacité :</strong> {chambre.capacite} personnes
                  </p>
                  <p className="card-text">
                    <strong>Lits disponibles :</strong> {chambre.lits_disponibles}
                  </p>
                  <p className="card-text">
                    <strong>Disponibilité :</strong>{" "}
                    {chambre.est_disponible ? (
                      <span className="badge bg-success">Disponible</span>
                    ) : (
                      <span className="badge bg-danger">Indisponible</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Carte 2 : Informations de l'hôtel */}
              <div className="card shadow-sm montserrat-normal mb-3">
                <div className="card-body">
                  <h5 className="card-title">Informations de l'hôtel</h5>
                  <p className="card-text">
                    <strong>Nom :</strong> {chambre.hotel.nom}
                  </p>
                  <p className="card-text">
                    <strong>Adresse :</strong> {chambre.hotel.adresse}
                  </p>
                  <p className="card-text">
                    <strong>Ville :</strong> {chambre.hotel.ville}
                  </p>
                  <p className="card-text">
                    <strong>Téléphone :</strong> {chambre.hotel.telephone}
                  </p>
                  <p className="card-text">
                    <strong>Email :</strong> {chambre.hotel.email}
                  </p>
                  <p className="card-text">
                    <strong>Note :</strong>{" "}
                    <span className="badge bg-success">{chambre.hotel.note}/5</span>
                  </p>
                </div>
              </div>

              {/* Bouton de réservation */}
              <Link
                href={`/reservation-hotel/reservations/create?hotel_id=${chambre.hotel.id}&chambre_id=${chambre.id}`}
                className="btn btn-primary w-100 mt-3"
              >
                Réserver maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
      <HotelFooter />

      {/* Modal pour afficher l'image sélectionnée */}
      <div className="modal fade" id="imagePreviewModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div className="modal-body text-center">
              {selectedImage && <img src={selectedImage} className="img-fluid rounded shadow" alt="Aperçu" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChambreDetails;
