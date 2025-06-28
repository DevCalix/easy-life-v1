import React, { useEffect, useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import { Inertia } from "@inertiajs/inertia";
import { Modal } from "bootstrap";

export default function StProfile() {
    const { flash, user, commandes, rendezVous, isMedecin, abonnementVip, currentUser   } = usePage().props;
    const [successMessage, setSuccessMessage] = useState("");
    // Configuration des abonnements
    const ABONNEMENTS = {
        generaliste: {
            prix: 2500,
            label: "Généraliste",
            description: "Accès aux médecins généralistes",
            avantages: [
                "2 Consultations par mois",
                "10% sur nos pharmacies partenaires",
            ]
        },
        specialiste: {
            prix: 6000,
            label: "Spécialiste",
            description: "Accès aux médecins spécialistes",
            avantages: [
                "2 Consultations par mois",
                "15% sur nos pharmacies partenaires"
            ]
        }
    };
    const [selectedCommande, setSelectedCommande] = useState(null);
    const [activeTab, setActiveTab] = useState("profil");

    const handleEditerProfil = () => {
        Inertia.visit(`/pharmacie-sante/profile-edit`);
    };

    const handleEditerProfilPro = (userId) => {
        Inertia.get(`/pharmacie-sante/specialiste-de-sante/{userId}/edit`);
    };

    const handleConfirmeRdv = (rdvId) => {
        Inertia.get(`/pharmacie-sante/rendez-vous/${rdvId}/confirmer`);
    };

    const handleAnnulerRdv = (rdvId) => {
        Inertia.post(`/pharmacie-sante/rendez-vous/${rdvId}/annuler`);
    }
    const handleRenouvelerAbonnement = () => {
        Inertia.visit('/pharmacie-sante/abonnement-vip');
    }

    useEffect(() => {
        if (flash?.success) {
            setSuccessMessage(flash.success);
            const modalEl = document.getElementById("successModal");
            if (modalEl) {
            const modal = new Modal(modalEl);
            modal.show();
            }
        } // Pour le rendez-vous
        if (flash?.rdv_confirm) {
            const modalEl = document.getElementById("rdvSuccessModal");
            if (modalEl) {
            const modal = new Modal(modalEl);
            modal.show();
            }
        }
    }, [flash]);

console.log(flash);



    return (
        <>
            <PharmaNavbar />
            <Head title="Mon Profil" />

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold mb-0 montserrat-normal">Mon Profil</h1>
                    <span className={`badge bg-${isMedecin ? 'info' : 'secondary'} fs-6`}>
                        {isMedecin ? "Compte Professionnel" : "Compte Patient"}
                    </span>
                </div>

                {/* Onglets de navigation */}
                <ul className="nav nav-tabs nav-underline mb-2 montserrat-normal">
                    <li className="nav-item">
                        <button
                            className={`nav-link px-2 ${activeTab === "profil" ? "active fw-bold" : ""}`}
                            onClick={() => setActiveTab("profil")}
                        >
                            <i className="bi bi-person-fill me-2"></i>Profil
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link px-2 ${activeTab === "commandes" ? "active fw-bold" : ""}`}
                            onClick={() => setActiveTab("commandes")}
                        >
                            <i className="bi bi-cart-fill me-2"></i>Commandes
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link px-2 ${activeTab === "rendezVous" ? "active fw-bold" : ""}`}
                            onClick={() => setActiveTab("rendezVous")}
                        >
                            <i className="bi bi-calendar2-heart-fill me-2"></i>Rendez-vous
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link px-2 ${activeTab === "abonnement" ? "active fw-bold" : ""}`}
                            onClick={() => setActiveTab("abonnement")}
                        >
                            <i className="bi bi-star-fill me-2"></i>Mon Abonnement
                        </button>
                    </li>
                </ul>

                {/* Contenu des onglets */}
                <div className="tab-content bg-white rounded-3 shadow-sm p-4">
                    {/* Onglet Profil */}
                    {activeTab === "profil" && (
                        <div className="tab-pane fade show active">
                            <div className="row">
                                <div className="col-md-3 text-center mb-4 mb-md-0">
                                    <div className="bg-light rounded-circle p-4 d-inline-flex align-items-center justify-content-center" style={{width: '150px', height: '150px'}}>
                                        <span className="display-4 text-primary">{user.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <h3 className="mb-2 montserrat-normal fw-bold">Informations personnelles</h3>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">Nom complet</p>
                                            <h5 className="fw-normal">{user.name}</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-1 text-muted">Email</p>
                                            <h5 className="fw-normal">{user.email}</h5>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-3 mt-4">
                                        {isMedecin && (
                                            <button
                                                onClick={() => handleEditerProfilPro(user.id)}
                                                className="btn btn-primary"
                                            >
                                                <i className="bi bi-pencil-square me-2"></i>Éditer profil pro
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleEditerProfil()}
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="bi bi-gear-fill me-2"></i>Éditer mon compte
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet Commandes */}
                    {activeTab === "commandes" && (
                        <div className="tab-pane fade show active">
                            <h3 className="mb-4 montserrat-normal">Mes Commandes</h3>
                            {commandes.data.length > 0 ? (
                                <div className="row g-4">
                                    {commandes.data.map((commande) => (
                                        <div key={commande.id} className="col-md-6 col-lg-4">
                                            <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <h5 className="card-title mb-0">Commande #{commande.id}</h5>
                                                        <span className={`badge bg-${
                                                            commande.statut === 'livrée' ? 'success' :
                                                            commande.statut === 'en attente' ? 'warning' :
                                                            'info'
                                                        }`}>
                                                            {commande.statut}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted small mb-2">
                                                        <i className="bi bi-calendar me-2"></i>
                                                        {new Date(commande.created_at).toLocaleDateString()}
                                                    </p>
                                                    <p className="fw-bold mb-3">
                                                        {commande.montant_total.toLocaleString()} FCFA
                                                    </p>
                                                    <button
                                                        className="btn btn-outline-secondary w-100"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#commandeModal"
                                                        onClick={() => setSelectedCommande(commande)}
                                                    >
                                                        <i className="bi bi-eye-fill me-2"></i>Voir détails
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi bi-cart-x display-4 text-muted mb-3"></i>
                                    <h5>Aucune commande passée</h5>
                                    <p className="text-muted">Vous n'avez pas encore passé de commande</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Onglet Rendez-vous médicaux */}
                    {activeTab === "rendezVous" && (
                    <div className="tab-pane fade show active">
                        <h3 className="mb-2 montserrat-normal fw-bold">Mes Rendez-vous médicaux</h3>
                        {rendezVous.length > 0 ? (
                        <div className="row g-2">
                            {rendezVous.map((rdv) => (
                            <div key={rdv.id} className="col-md-6 col-lg-4">
                                <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body montserrat-normal">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title mb-0">Rendez-vous #{rdv.id}</h5>
                                    <span
                                        className={`badge bg-${
                                        rdv.statut === "confirmé"
                                            ? "success"
                                            : rdv.statut === "en attente"
                                            ? "warning"
                                            : "secondary"
                                        }`}
                                    >
                                        {rdv.statut}
                                    </span>
                                    </div>

                                    <div className="mb-3">
                                    <p className="mb-1 text-muted">Date</p>
                                    <p className="fw-normal">
                                        {new Date(rdv.date).toLocaleDateString()} à {rdv.heure}
                                    </p>
                                    </div>

                                    {/* Dynamique : Si l’utilisateur est le médecin de ce RDV, on affiche le patient, sinon le médecin */}
                                    <div className="mb-3">
                                    <p className="mb-1 badge bg-success text-white">
                                        {rdv.st_medecin_id === currentUser.medecin?.id ? "Patient" : "Intervenant médical"}
                                    </p>
                                    <p className="fw-normal fst-italic">
                                        {rdv.st_medecin_id === currentUser.medecin?.id
                                        ? rdv.user?.name
                                        : rdv.medecin.nom}
                                    </p>
                                    </div>

                                    {/* Boutons d’action seulement si l’utilisateur est le médecin du RDV */}
                                    {rdv.st_medecin_id === currentUser.medecin?.id && (
                                    <div className="d-grid gap-2 d-md-flex">
                                        <button
                                        onClick={() => handleConfirmeRdv(rdv.id)}
                                        className="btn btn-success flex-grow-1"
                                        >
                                        <i className="bi bi-check-circle me-2"></i>
                                        {rdv.statut === "confirmé" ? "Modifier la date" : "Confirmer"}
                                        </button>
                                        <button
                                        onClick={() => handleAnnulerRdv(rdv.id)}
                                        className="btn btn-outline-danger flex-grow-1"
                                        disabled={rdv.statut === "annulé"}
                                        >
                                        <i className="bi bi-x-circle me-2"></i>Annuler
                                        </button>
                                    </div>
                                    )}
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        ) : (
                        <div className="text-center py-5">
                            <i className="bi bi-calendar2-x display-4 text-muted mb-3"></i>
                            <h5>Aucun rendez-vous</h5>
                            <p className="text-muted">Vous n'avez pas encore pris de rendez-vous</p>
                        </div>
                        )}
                    </div>
                    )}


                    {/* Nouvel Onglet Abonnement */}
                    {activeTab === "abonnement" && (
                        <div className="tab-pane fade show active">
                            {abonnementVip ? (
                                <div className="row">
                                    <div className="col-lg-8 mx-auto">
                                        <div className={`card border-${ABONNEMENTS[abonnementVip.type]?.couleur || 'primary'} border-2`}>
                                            <div className="card-header bg-white">
                                                <h3 className="fw-bold text-center mb-0">
                                                    <i className={`bi bi-star-fill text-${ABONNEMENTS[abonnementVip.type]?.couleur || 'primary'} me-2`}></i>
                                                    Abonnement VIP {ABONNEMENTS[abonnementVip.type]?.label}
                                                </h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row mb-4">
                                                    <div className="col-md-6 text-center">
                                                        <p className="text-muted mb-1">Statut</p>
                                                        <h4>
                                                            <span className={`badge bg-${abonnementVip.estActif ? 'success' : 'danger'}`}>
                                                                {abonnementVip.estActif ? 'ACTIF' : 'EXPIRÉ'}
                                                            </span>
                                                        </h4>
                                                    </div>
                                                    <div className="col-md-6 text-center">
                                                        <p className="text-muted mb-1">Date d'expiration</p>
                                                        <h4 className="fw-bold">{abonnementVip.expire_at}</h4>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <h5 className="fw-bold mb-3">Avantages inclus :</h5>
                                                    <ul className="list-group">
                                                        {ABONNEMENTS[abonnementVip.type]?.avantages.map((avantage, index) => (
                                                            <li key={index} className="list-group-item border-0">
                                                                <i className={`bi bi-check-circle-fill text-${ABONNEMENTS[abonnementVip.type]?.couleur || 'primary'} me-2`}></i>
                                                                {avantage}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="d-grid gap-3">
                                                    <button
                                                        onClick={handleRenouvelerAbonnement}
                                                        className={`btn btn-${ABONNEMENTS[abonnementVip.type]?.couleur || 'primary'} py-3 fw-bold`}
                                                    >
                                                        <i className="bi bi-arrow-repeat me-2"></i>
                                                        Renouveler mon abonnement
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-3">
                                    <i className="bi bi-star text-muted" style={{ fontSize: '4rem' }}></i>
                                    <h3 className="mt-3">Aucun abonnement actif</h3>
                                    <p className="text-muted mb-4">Vous n'avez pas encore souscrit à un abonnement VIP</p>
                                    <button
                                        onClick={() => Inertia.visit('/pharmacie-sante/abonnement-vip')}
                                        className="btn btn-primary px-4 py-2"
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Souscrire à un abonnement
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>

            <PharmacieFooter />

            {/* Modal Bootstrap pour les détails de commande */}
            <div className="modal fade" id="commandeModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        {selectedCommande && (
                            <>
                                <div className="modal-header bg-light">
                                    <h5 className="modal-title">Détails de la commande #{selectedCommande.id}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <p className="text-muted small mb-1">Date</p>
                                        <p>{new Date(selectedCommande.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-muted small mb-1">Statut</p>
                                        <p>
                                            <span className={`badge bg-${
                                                selectedCommande.statut === 'livrée' ? 'success' :
                                                selectedCommande.statut === 'en attente' ? 'warning' :
                                                'info'
                                            }`}>
                                                {selectedCommande.statut}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-muted small mb-1">Total</p>
                                        <h5>{selectedCommande.montant_total.toLocaleString()} FCFA</h5>
                                    </div>
                                    <h6 className="mb-3">Produits</h6>
                                    <ul className="list-group mb-3">
                                        {selectedCommande.produits.map((produit) => (
                                            <li key={produit.id} className="list-group-item">
                                                <div className="d-flex justify-content-between">
                                                    <span>{produit.nom}</span>
                                                    <span>
                                                        {produit.quantite} x {produit.prix.toLocaleString()} FCFA
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Fermer
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal succès */}
            <div
                className="modal fade"
                id="successModal"
                tabIndex="-1"
                aria-labelledby="successModalLabel"
                aria-hidden="true"
                >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-success shadow-sm">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title d-flex align-items-center" id="successModalLabel">
                        <i className="bi bi-person-check-fill me-2" style={{ fontSize: '1.5rem' }}></i>
                        Inscription réussie !
                        </h5>
                        <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Fermer"
                        ></button>
                    </div>
                    <div className="modal-body fs-5 text-center text-success">
                        {successMessage || "Merci d’avoir rejoint notre communauté. Votre compte a bien été créé. Vous pouvez maintenant vous connecter et profiter de tous nos services."}
                    </div>

                    <div className="modal-footer justify-content-center">
                        <button
                        type="button"
                        className="btn btn-success px-4"
                        data-bs-dismiss="modal"
                        >
                        Commencer
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Modal succès (rendez-vous) */}
            <div
            className="modal fade"
            id="rdvSuccessModal"
            tabIndex="-1"
            aria-labelledby="rdvSuccessModalLabel"
            aria-hidden="true"
            >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-primary shadow-sm">
                <div className="modal-header bg-primary text-white">
                    <h5
                    className="modal-title d-flex align-items-center"
                    id="rdvSuccessModalLabel"
                    >
                    <i
                        className="bi bi-calendar-check-fill me-2"
                        style={{ fontSize: "1.5rem" }}
                    ></i>
                    Rendez-vous
                    </h5>
                    <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Fermer"
                    ></button>
                </div>
                <div className="modal-body fs-5 text-center text-primary">
                    {flash?.rdv_confirm}
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                    type="button"
                    className="btn btn-primary px-4"
                    data-bs-dismiss="modal"
                    >
                    OK
                    </button>
                </div>
                </div>
            </div>
            </div>

        </>
    );
}
