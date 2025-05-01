import React from "react";
import { Head, usePage, Link } from "@inertiajs/react"; // Ajout de usePage et Link
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";

const ReservationStatus = ({ reservation }) => {
    const { auth } = usePage().props; // Récupérer l'utilisateur connecté

    // Fonction pour convertir une date "DD/MM/YYYY" en "YYYY-MM-DD"
    const convertToISODate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return `${year}-${month}-${day}`;
    };

    // Convertir les dates correctement
    const dateArrivee = new Date(convertToISODate(reservation.date_arrivee));
    const dateDepart = new Date(convertToISODate(reservation.date_depart));

    // Vérifier si les dates sont valides
    if (isNaN(dateArrivee) || isNaN(dateDepart)) {
        console.error("⚠️ Erreur : Les dates ne sont pas valides !");
        return null; // Empêcher l'affichage en cas d'erreur
    }

    // Calcul du nombre de jours
    const nombreJours = Math.max((dateDepart - dateArrivee) / (1000 * 60 * 60 * 24), 1);

    // Calcul du prix total
    const prixTotal = nombreJours * reservation.prix;

    return (
        <>
            <Head title="Statut de la réservation" />
            <HotelReservationNavbar />

            <div className="container py-5">
                <h1 className="montserrat-normal fw-bold">Statut de la réservation</h1>
                <hr className="border border-success border-3 opacity-75" />
                <div className="card shadow p-4 mt-4">
                    <p><strong>Clé de réservation :</strong> {reservation.reservation_key}</p>
                    <p><strong>Hotel :</strong> {reservation.hotel.nom}</p>
                    <p><strong>Chambre :</strong> {reservation.chambre.numero_chambre}</p>
                    <p><strong>Type de Chambre :</strong> {reservation.chambre.type}</p>
                    <p>
                        <strong>Statut :</strong>
                        <span className={`badge ${reservation.statut === 'validée' ? 'bg-success' : 'bg-secondary'}`}>
                            {reservation.statut}
                        </span>
                    </p>
                    <p><strong>Date d'arrivée :</strong> {reservation.date_arrivee}</p>
                    <p><strong>Date de départ :</strong> {reservation.date_depart}</p>
                    <p><strong>Nombre de personnes :</strong> {reservation.nombre_personnes}</p>
                    <p><strong>Nombre de jours :</strong> {nombreJours}</p>
                    <p><strong>Prix total :</strong> {prixTotal.toLocaleString()} FCFA</p>

                    {/* Afficher le bouton seulement si l'utilisateur est connecté */}
                    {auth && auth.user && (
                        <div className="mt-4">
                            <Link href={`/reservation-hotel/hotel/${reservation.hotel.id}/avis/create`} className="btn btn-primary">
                                Laissez un avis
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <HotelFooter />
        </>
    );
};

export default ReservationStatus;
