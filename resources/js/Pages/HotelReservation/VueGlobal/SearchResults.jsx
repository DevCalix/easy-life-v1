import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import React, { useState } from "react";

export default function SearchResults({ hotels, destination, nombreChambres, nombrePersonnes }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les hôtels en fonction du terme de recherche
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        <HotelReservationNavbar/>
        <div className="container mt-5">
        {/* En-tête des résultats */}
        <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">
            Résultats de la recherche pour <span className="text-primary">"{destination}"</span>
            </h1>
            <p className="lead text-muted">
            <i className="bi bi-door-closed me-2"></i>
            Nombre de chambres : <strong>{nombreChambres}</strong> |{" "}
            <i className="bi bi-people-fill me-2"></i>
            Nombre de personnes : <strong>{nombrePersonnes}</strong>
            </p>
        </div>

        {/* Barre de recherche rapide */}
        <div className="mb-4">
            <input
            type="text"
            className="form-control"
            placeholder="Filtrer par hôtel ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Liste des hôtels */}
        <div className="row">
            {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
                <div key={hotel.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card shadow-sm h-100 hover-scale">
                    {/* Image principale de l'hôtel */}
                    <img
                    src={hotel.image_principale}
                    className="card-img-top rounded-top"
                    alt={hotel.nom}
                    style={{ height: "200px", objectFit: "cover" }}
                    />

                    {/* Corps de la carte */}
                    <div className="card-body d-flex flex-column">
                    {/* Nom de l'hôtel */}
                    <h5 className="card-title text-primary">
                        <i className="bi bi-building me-2"></i>
                        {hotel.nom}
                    </h5>

                    {/* Localisation */}
                    <p className="card-text text-muted">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        {hotel.ville}, {hotel.pays_region}
                    </p>

                    {/* Description courte */}
                    <p className="card-text">
                        <i className="bi bi-info-circle me-2"></i>
                        {hotel.description.substring(0, 100)}...
                    </p>

                    {/* Équipements */}
                    <div className="mb-2">
                        <h6 className="fw-bold">
                        <i className="bi bi-tools me-2"></i>
                        Équipements :
                        </h6>
                        <ul className="list-unstyled small text-muted">
                        {hotel.equipements.slice(0, 3).map((equipement) => (
                            <li key={equipement.id}>
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            {equipement.nom}
                            </li>
                        ))}
                        {hotel.equipements.length > 3 && <li>...</li>}
                        </ul>
                    </div>

                    {/* Bouton pour voir les détails */}
                    <a
                        href={`/reservation-hotel/nos-hotels/${hotel.id}`}
                        className="btn btn-primary mt-auto"
                    >
                        <i className="bi bi-eye-fill me-2"></i>
                        Voir les détails
                    </a>
                   
                    </div>
                </div>
                </div>
            ))
            ) : (
            <div className="text-center py-5">
                <p className="text-muted fs-5">
                <i className="bi bi-search me-2"></i>
                Aucun hôtel trouvé pour cette destination.
                </p>
            </div>
            )}
        </div>
            <div className="text-center">
                <a href="/reservation-hotel" className="btn btn-outline-primary mb-3">
                    <i className="bi bi-arrow-left me-2"></i>
                    Retour à l'accueil
                </a>
            </div>
        </div>
        <HotelFooter/>
    </>
  );
}
