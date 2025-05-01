import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";
import { Inertia } from "@inertiajs/inertia";

export default function HtProfile() {
    const { user, reservations } = usePage().props;
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [activeTab, setActiveTab] = useState("profil");

    // Fonction pour convertir une date "DD/MM/YYYY" en "YYYY-MM-DD"
    const convertToISODate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year}-${month}-${day}`;
    };

    // Fonction pour calculer le nombre de jours et le prix total
    const calculateReservationDetails = (reservation) => {
        const dateArrivee = new Date(convertToISODate(reservation.date_arrivee));
        const dateDepart = new Date(convertToISODate(reservation.date_depart));

        // Vérifier si les dates sont valides
        if (isNaN(dateArrivee) || isNaN(dateDepart)) {
            console.error("⚠️ Erreur : Les dates ne sont pas valides !");
            return { nombreJours: 0, prixTotal: 0 };
        }

        // Calcul du nombre de jours
        const nombreJours = Math.max((dateDepart - dateArrivee) / (1000 * 60 * 60 * 24), 1);

        // Calcul du prix total
        const prixTotal = nombreJours * reservation.prix;

        return { nombreJours, prixTotal };
    };

    // Fonction pour éditer le profil
    const handleEditerProfil = () => {
        Inertia.visit(`/reservation-hotel/profile-edit`);
    };

    return (
        <>
            <HotelReservationNavbar />
            <Head title="Mon Profil" />

            <div className="container my-5">
                <h1 className="mb-2 montserrat-normal fw-bold">Mon Profil</h1>
                <hr />

                {/* Onglets de navigation */}
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "profil" ? "active" : ""}`}
                            onClick={() => setActiveTab("profil")}
                        >
                            Profil
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "reservations" ? "active" : ""}`}
                            onClick={() => setActiveTab("reservations")}
                        >
                            Mes Réservations
                        </button>
                    </li>
                </ul>

                {/* Contenu des onglets */}
                <div className="tab-content">
                    {/* Onglet Profil */}
                    {activeTab === "profil" && (
                        <div className="tab-pane fade show active">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body montserrat-normal">
                                    <h5 className="card-title">Informations personnelles</h5>
                                    <p><strong>Nom :</strong> {user.name}</p>
                                    <p><strong>Email :</strong> {user.email}</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-danger btn-sm" onClick={handleEditerProfil}>
                                        Éditer mon profil
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet Réservations */}
                    {activeTab === "reservations" && (
                        <div className="tab-pane fade show active">
                            <h3 className="mt-4 montserrat-normal fw-bold">Mes Réservations</h3>
                            <hr />
                            <div className="row">
                                {reservations.length > 0 ? (
                                    reservations.map((reservation) => {
                                        const { nombreJours, prixTotal } = calculateReservationDetails(reservation);

                                        return (
                                            <div key={reservation.id} className="col-md-6 col-lg-4 mb-4">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <h5 className="card-title">Réservation #{reservation.id}</h5>
                                                        <p>
                                                            <strong>Hôtel :</strong> {reservation.hotel.nom}
                                                        </p>
                                                        <p>
                                                            <strong>Chambre :</strong> {reservation.chambre.numero_chambre}
                                                        </p>
                                                        <p>
                                                            <strong>Statut :</strong>{" "}
                                                            <span className={`badge bg-${reservation.statut === 'validée' ? 'success' : reservation.statut === 'en_attente' ? 'warning' : 'danger'}`}>
                                                                {reservation.statut}
                                                            </span>
                                                        </p>
                                                        
                                                        <p>
                                                            <strong>Prix total :</strong> {prixTotal.toLocaleString()} FCFA
                                                        </p>
                                                        <button
                                                            className="btn btn-info"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#reservationModal"
                                                            onClick={() => setSelectedReservation(reservation)}
                                                        >
                                                            Détails
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>Aucune réservation trouvée.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <HotelFooter />

            {/* Modal Bootstrap natif pour afficher les détails de la réservation */}
            <div className="modal fade" id="reservationModal" tabIndex="-1" aria-labelledby="reservationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {selectedReservation && (
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title">Réservation #{selectedReservation.id}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Hôtel :</strong> {selectedReservation.hotel.nom}</p>
                                    <p><strong>Chambre :</strong> {selectedReservation.chambre.numero_chambre}</p>
                                    <p><strong>Date d'arrivée :</strong> {selectedReservation.date_arrivee}</p>
                                    <p><strong>Date de départ :</strong> {selectedReservation.date_depart}</p>
                                    <p><strong>Nombre de personnes :</strong> {selectedReservation.nombre_personnes}</p>
                                    <p><strong>Nombre de jours :</strong> {calculateReservationDetails(selectedReservation).nombreJours} jours</p>

                                    <p><strong>Prix par nuit :</strong> {selectedReservation.prix} FCFA</p>
                                    <p><strong>Prix total :</strong> {calculateReservationDetails(selectedReservation).prixTotal.toLocaleString()} FCFA</p>
                                    <p><strong>Statut :</strong> {selectedReservation.statut}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
