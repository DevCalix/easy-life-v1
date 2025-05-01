import React from "react";
import { Head, Link } from "@inertiajs/react";
import "../../../../css/hotelReservation/PromotionDetails.css";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";

const PromotionDetails = ({ promotion }) => {
  return (
    <>
        <>
            <HotelReservationNavbar/>
            <div className="promotion-details-page">
            <Head title={`Détails de la promotion`} />

            {/* Section de l'image principale */}
            <div className="promotion-hero">
                <img
                src={promotion.chambre?.image_principale || promotion.hotel?.image_principale || '/images/placeholder.jpg'}
                alt={promotion.chambre ? `Chambre ${promotion.chambre.numero_chambre}` : promotion.hotel?.nom || 'Promotion'}
                className="promotion-hero-image"
                />
                <div className="promotion-hero-overlay">
                <h1 className="promotion-name montserrat-normal">
                    Promotion de {promotion.pourcentage_reduction}%
                </h1>
                <p className="promotion-location montserrat-normal">
                    {promotion.hotel.nom}, {promotion.hotel.ville}
                </p>
                </div>
            </div>

            {/* Section des détails */}
            <div className="container py-2">
                <div className="row">
                {/* Description de la promotion */}
                <div className="col-md-8">
                    <h2 className="my-2 montserrat-normal fw-bold">À propos de cette promotion</h2>
                    <hr className="border border-danger border-3 opacity-75" />
                    <p className="promotion-description text-muted montserrat-normal">{promotion.description}</p>

                    {/* Informations de la chambre (si applicable) */}
                    {promotion.chambre && (
                    <>
                        <h3 className="mt-3 montserrat-normal fw-bold">Informations de la chambre</h3>
                        <hr className="border border-danger border-3 opacity-75" />
                        <ul className="list-group list-group-flush montserrat-normal">
                        <li className="list-group-item">
                            <strong>Numéro de chambre :</strong> {promotion.chambre.numero_chambre}
                        </li>
                        <li className="list-group-item">
                            <strong>Type :</strong> {promotion.chambre.type}
                        </li>
                        <li className="list-group-item">
                            <strong>Prix par nuit :</strong> {promotion.chambre.prix_par_nuit} FCFA
                        </li>
                        <li className="list-group-item">
                            <strong>Capacité :</strong> {promotion.chambre.capacite} personnes
                        </li>
                        <li className="list-group-item">
                            <strong>Lits disponibles :</strong> {promotion.chambre.lits_disponibles}
                        </li>
                        </ul>
                    </>
                    )}

                    {/* Équipements de la chambre (si applicable) */}
                    {promotion.chambre?.equipements?.length > 0 && (
                    <>
                        <h3 className="mt-3 montserrat-normal fw-bold">Équipements</h3>
                        <hr className="border border-danger border-3 opacity-75" />
                        <ul className="list-group list-group-flush montserrat-normal">
                        {promotion.chambre.equipements.map((equipement, index) => (
                            <li key={index} className="list-group-item">
                            <i className="bi bi-check-circle me-2 text-success montserrat-normal"></i>
                            {equipement.nom}
                            </li>
                        ))}
                        </ul>
                    </>
                    )}

                    {/* Images secondaires de la chambre ou de l'hôtel */}
                    {(promotion.chambre?.images?.length > 0 || promotion.hotel?.images?.length > 0) && (
                    <>
                        <h3 className="mt-3 montserrat-normal fw-bold">Galerie d'images</h3>
                        <hr className="border border-danger border-3 opacity-75" />
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
                        {/* Afficher les images secondaires de la chambre */}
                        {promotion.chambre?.images?.map((image, index) => (
                            <div key={index} className="col">
                            <img
                                src={image.url}
                                alt={`Image ${index + 1} de la chambre ${promotion.chambre.numero_chambre}`}
                                className="img-fluid rounded shadow-sm"
                                style={{ height: "150px", objectFit: "cover" }}
                            />
                            </div>
                        ))}

                        {/* Afficher les images secondaires de l'hôtel */}
                        {promotion.hotel?.images?.map((image, index) => (
                            <div key={index} className="col">
                            <img
                                src={image.url}
                                alt={`Image ${index + 1} de l'hôtel ${promotion.hotel.nom}`}
                                className="img-fluid rounded shadow-sm"
                                style={{ height: "150px", objectFit: "cover" }}
                            />
                            </div>
                        ))}
                        </div>
                    </>
                    )}
                </div>

                {/* Informations supplémentaires */}
                <div className="col-md-4">
                    {/* Carte 1 : Informations de la promotion */}
                    <div className="card shadow-sm montserrat-normal mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Informations de la promotion</h5>
                        <p className="card-text">
                        <strong>Réduction :</strong> {promotion.pourcentage_reduction}%
                        </p>
                        <p className="card-text">
                        <strong>Date de début :</strong> {promotion.date_debut}
                        </p>
                        <p className="card-text">
                        <strong>Date de fin :</strong> {promotion.date_fin}
                        </p>
                    </div>
                    </div>

                    {/* Carte 2 : Informations de l'hôtel */}
                    <div className="card shadow-sm montserrat-normal mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Informations de l'hôtel</h5>
                        <p className="card-text">
                        <strong>Nom :</strong> {promotion.hotel.nom}
                        </p>
                        <p className="card-text">
                        <strong>Adresse :</strong> {promotion.hotel.adresse}
                        </p>
                        <p className="card-text">
                        <strong>Ville :</strong> {promotion.hotel.ville}
                        </p>
                        <p className="card-text">
                        <strong>Téléphone :</strong> {promotion.hotel.telephone}
                        </p>
                        <p className="card-text">
                        <strong>Email :</strong> {promotion.hotel.email}
                        </p>
                    </div>
                    </div>

                    {/* Bouton de réservation */}
                    <Link
                    href={`/reservation-hotel/reservations/create?promotion_id=${promotion.id}`}
                    className="btn btn-primary w-100 mt-3"
                    >
                    Réserver maintenant
                    </Link>
                </div>
                </div>
            </div>
            </div>
            <HotelFooter/>
        </>
    </>
  );
};

export default PromotionDetails;
