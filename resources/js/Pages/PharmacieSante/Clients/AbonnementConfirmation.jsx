import React from "react";
import { Head, Link } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

// Configuration des abonnements
const ABONNEMENTS = {
    generaliste: {
        prix: 2500,
        label: "Généraliste",
        avantages: [
            "2 Consultations par mois",
            "10% sur nos pharmacies partenaires"
        ],
        couleur: "blue"
    },
    specialiste: {
        prix: 6000,
        label: "Spécialiste",
        avantages: [
            "2 Consultations par mois",
            "15% sur nos pharmacies partenaires"
        ],
        couleur: "purple"
    }
};

export default function AbonnementConfirmation({ type, expiration }) {
    const abonnement = ABONNEMENTS[type] || ABONNEMENTS.generaliste;

    return (
        <>
            <PharmaNavbar />
            <Head title="Confirmation d'abonnement" />

            <div className="container py-2">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-2 text-center">
                                {/* Icône de succès */}
                                <div className="mb-4">
                                    <div className="bg-success bg-opacity-10 d-inline-flex p-3 rounded-circle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                    </div>
                                </div>

                                <h1 className="fw-bold text-success mb-3 montserrat-normal">Abonnement réussi !</h1>
                                <p className="lead mb-2 montserrat-normal">
                                    Félicitations, votre abonnement VIP {abonnement.label} a été activé avec succès.
                                </p>

                                <div className="card border-0 bg-light mb-4">
                                    <div className="card-body text-start">
                                        <h4 className="fw-bold mb-3 montserrat-normal">Détails de votre abonnement</h4>

                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <p className="mb-1 text-muted montserrat-normal">Type d'abonnement</p>
                                                <p className="fw-bold montserrat-normal">{abonnement.label}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="mb-1 text-muted montserrat-normal">Date d'expiration</p>
                                                <p className="fw-bold montserrat-normal">{expiration}</p>
                                            </div>
                                        </div>

                                        <h5 className="fw-bold mt-4 mb-3 montserrat-normal">Avantages inclus :</h5>
                                        <ul className="list-unstyled">
                                            {abonnement.avantages.map((avantage, index) => (
                                                <li key={index} className="mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16">
                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                    </svg>
                                                    {avantage}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="d-grid gap-3">
                                    <Link
                                        href={route('specialiste.all')}
                                        className="btn btn-primary py-3 fw-bold montserrat-normal"
                                    >
                                        <i className="bi bi-people-fill me-2"></i>
                                        Consulter les médecins disponibles
                                    </Link>

                                    <Link
                                        href={route('accueil.pharmacie')}
                                        className="btn btn-outline-secondary py-3 montserrat-normal"
                                    >
                                        <i className="bi bi-house-door-fill me-2"></i>
                                        Retour à l'accueil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PharmacieFooter />
        </>
    );
}
