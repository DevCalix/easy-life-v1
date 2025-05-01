import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import "../../../../css/hotelReservation/HotelDetails.css";

import { Head, Link } from "@inertiajs/react";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

const HotelDetails = ({ hotel }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    // Trouver la méta dont la clé est "whatsapp"
    const whatsappMeta = hotel.metas.find(meta => meta.cle === "whatsapp");
    // Construire le lien WhatsApp si une valeur est trouvée
    const whatsappLink = whatsappMeta ? `https://wa.me/${whatsappMeta.valeur}` : "#";

  return (
    <>
        <HotelReservationNavbar/>
        <div className="hotel-details-page">
        <Head title={`Détails de ${hotel.nom}`} />

        {/* Section de l'image principale */}
        <div className="hotel-hero">
            <img
            src={hotel.image_principale}
            alt={hotel.nom}
            className="hotel-hero-image"
            />
            <div className="hotel-hero-overlay">
            <h1 className="hotel-name montserrat-normal">{hotel.nom}</h1>
            <p className="hotel-location montserrat-normal">
                {hotel.ville}, {hotel.pays_region}
            </p>
            </div>
        </div>

        {/* Section des détails */}
        <div className="container py-2">
            <div className="row">
            {/* Description de l'hôtel et images secondaires */}
            <div className="col-md-8">
                <h2 className="my-2 montserrat-normal fw-bold">À propos de cet établissement</h2>
                <hr className="border border-danger border-3 opacity-75" />
                <p className="hotel-description text-muted montserrat-normal">{hotel.description}</p>

                {/* Section Galerie en Carousel Horizontal */}
                {hotel.images.length > 0 && (
                    <>
                    <h3 className="mt-2 montserrat-normal fw-bold">Galerie d'images</h3>
                    <hr className="border border-danger border-3 opacity-75" />
                    <div id="hotelImageCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="d-flex overflow-auto gap-2 p-2">
                            {hotel.images.map((image, index) => (
                                <img
                                key={index}
                                src={image.url}
                                alt={`Image ${index + 1}`}
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
                {/* Équipements */}
                <h3 className="mt-3 montserrat-normal fw-bold">Équipements</h3>
                <hr className="border border-danger border-3 opacity-75" />
                <ul className="list-group list-group-flush">
                {hotel.equipements.map((equipement, index) => (
                    <li key={index} className="list-group-item">
                    <i className="bi bi-check-circle me-2 text-success montserrat-normal"></i>
                    {equipement.nom}
                    </li>
                ))}
                </ul>

                {/* Services */}
                <h3 className="mt-3 montserrat-normal fw-bold">Services</h3>
                <hr className="border border-danger border-3 opacity-75" />
                <ul className="list-group list-group-flush">
                {hotel.services.map((service, index) => (
                    <li key={index} className="list-group-item">
                    <i className="bi bi-star me-2 text-primary montserrat-normal"></i>
                    {service.nom}
                    </li>
                ))}
                </ul>
            </div>

            <div className="col-md-4">
            {/* Carte 1 : Informations de base */}
            <div className="card shadow-sm montserrat-normal mb-3">
                <div className="card-body">
                <h5 className="card-title">Informations de base</h5>
                <p className="card-text">
                    <strong>Adresse :</strong> {hotel.adresse}
                </p>
                <p className="card-text">
                    <strong>Numéro/Appartement/Étage :</strong> {hotel.numero_appartement_etage}
                </p>
                <p className="card-text">
                    <strong>Ville :</strong> {hotel.ville}
                </p>
                <p className="card-text">
                    <strong>Pays/Région :</strong> {hotel.pays_region}
                </p>
                <p className="card-text">
                    <strong>Téléphone :</strong>{" "}
                    <a href={`tel:${hotel.telephone}`} className="text-decoration-none">
                        {hotel.telephone}
                    </a>
                </p>

                <p className="card-text">
                    <strong>Email :</strong> {hotel.email}
                </p>
                <p className="card-text">
                    <strong>Note :</strong>{" "}
                    <span className="badge bg-success">{hotel.note}/10</span>
                </p>
                </div>
            </div>

            {/* Carte 2 : Options et horaires */}
            <div className="card shadow-sm montserrat-normal mb-3">
                <div className="card-body">
                <h5 className="card-title">Options et horaires</h5>
                <p className="card-text">
                    <strong>Repas offerts :</strong>{" "}
                    {Array.isArray(hotel.repas_offerts)
                        ? hotel.repas_offerts.join(", ")
                        : JSON.parse(hotel.repas_offerts || "[]").join(", ")}
                </p>


                <p className="card-text">
                    <strong>Parking :</strong> {hotel.parking ? "Disponible" : "Non disponible"}
                </p>
                <p className="card-text">
                    <strong>Horaires d'arrivée :</strong> De {hotel.horaires_arrivee_de} à {hotel.horaires_arrivee_a}
                </p>
                <p className="card-text">
                    <strong>Horaires de départ :</strong> De {hotel.horaires_depart_de} à {hotel.horaires_depart_a}
                </p>
                <p className="card-text">
                    <strong>Enfants acceptés :</strong> {hotel.accepte_enfants ? "Oui" : "Non"}
                </p>
                <p className="card-text">
                    <strong>Animaux acceptés :</strong> {hotel.accepte_animaux ? "Oui" : "Non"}
                </p>
                <p className="card-text">
                    <strong>Fumeurs acceptés :</strong> {hotel.fumer ? "Oui" : "Non"}
                </p>
                </div>
            </div>

            {/* Bouton de réservation */}
            <Link
                href={`/reservation-hotel/chambres-disponible/${hotel.id}`}
                className="btn btn-primary w-100 mt-3"
                >
                Voir les chambres disponibles
            </Link>
            {whatsappMeta ? (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success w-100 mt-3">
                    Contacter sur WhatsApp
                </a>
            ) : (
            ''
            )}
            </div>
            </div>
        </div>


        {/* Section des avis */}
        <div className="container py-3">
            <h2 className="mb-2 montserrat-normal fw-bold">Avis des clients</h2>
            <hr className="border border-danger border-3 opacity-75" />

            {hotel.avis.length > 0 ? (
                <div className="row">
                    {hotel.avis.map((avis, index) => (
                        <div key={index} className="col-6 col-sm-6 col-md-3 mb-3">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{avis.utilisateur.name}</h5>
                                    <p className="card-text flex-grow-1">{avis.commentaire}</p>
                                    <p className="card-text text-success">
                                        <strong>Note :</strong> {avis.note}/5 ⭐
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted">Aucun avis pour le moment.</p>
            )}
        </div>

        </div>
        <HotelFooter/>
    </>
  );
};

export default HotelDetails;
