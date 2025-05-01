import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import { Inertia } from "@inertiajs/inertia";

export default function StProfile() {
    const { user, commandes, rendezVous, isMedecin } = usePage().props;
    const [selectedCommande, setSelectedCommande] = useState(null);
    const [activeTab, setActiveTab] = useState("profil");

    // Fonction pour confirmer un rendez-vous
    const handleEditerProfil = () => {
        // Rediriger vers le formulaire de confirmation
        Inertia.visit(`/pharmacie-sante/profile-edit`);
    };
    const handleEditerProfilPro = (userId) => {

            Inertia.get(`/pharmacie-sante/specialiste-de-sante/{userId}/edit`);
    };

    return (
        <>
            <PharmaNavbar />
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
                            className={`nav-link ${activeTab === "commandes" ? "active" : ""}`}
                            onClick={() => setActiveTab("commandes")}
                        >
                            Commandes
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "rendezVous" ? "active" : ""}`}
                            onClick={() => setActiveTab("rendezVous")}
                        >
                            Rendez-vous médicaux
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
                                        {isMedecin && (
                                            <button className="btn btn-danger btn-sm" onClick={() => handleEditerProfilPro(user.id)}>
                                                Editer mon Profil
                                            </button>
                                        )}
                                        <button className="btn btn-danger btn-sm" onClick={() => handleEditerProfil()}>
                                            Editer mon Compte
                                        </button>
                                    </div>

                            </div>
                        </div>
                    )}

                    {/* Onglet Commandes */}
                    {activeTab === "commandes" && (
                        <div className="tab-pane fade show active">
                            <h3 className="mt-4 montserrat-normal fw-bold">Mes Commandes</h3>
                            <hr />
                            <div className="row">
                                {commandes.data.length > 0 ? (
                                    commandes.data.map((commande) => (
                                        <div key={commande.id} className="col-md-6 col-lg-4 mb-4">
                                            <div className="card shadow-sm">
                                                <div className="card-body">
                                                    <h5 className="card-title">Commande #{commande.id}</h5>
                                                    <p>
                                                        <strong>Statut :</strong>{" "}
                                                        <span className={`badge bg-${commande.statut === 'livrée' ? 'success' : commande.statut === 'en attente' ? 'warning' : 'info'}`}>
                                                            {commande.statut}
                                                        </span>
                                                    </p>
                                                    <p><strong>Montant :</strong> {commande.montant_total.toLocaleString()} FCFA</p>
                                                    <button
                                                        className="btn btn-info"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#commandeModal"
                                                        onClick={() => setSelectedCommande(commande)}
                                                    >
                                                        Détails
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Aucune commande passée.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Onglet Rendez-vous médicaux */}
                    {activeTab === "rendezVous" && (
                        <div className="tab-pane fade show active">
                            <h3 className="mt-4 montserrat-normal fw-bold">Mes Rendez-vous médicaux</h3>
                            <hr />
                            {rendezVous.length > 0 ? (
                                <div className="row">
                                    {rendezVous.map((rdv) => (
                                        <div key={rdv.id} className="col-md-6 col-lg-4 mb-4">
                                            <div className="card shadow-sm">
                                                <div className="card-body">
                                                    <h5 className="card-title">Rendez-vous #{rdv.id}</h5>
                                                    <p><strong>Date :</strong> {new Date(rdv.date).toLocaleDateString()}</p>
                                                    <p><strong>Heure :</strong> {rdv.heure}</p>
                                                    <p><strong>Statut :</strong> {rdv.statut}</p>
                                                    <p><strong>Médecin :</strong> {rdv.medecin.nom}</p>
                                                    {isMedecin && (
                                                        <div className="d-flex gap-2">
                                                            <button className="btn btn-success mt-2" onClick={() => handleEditerProfil(rdv.id)}>
                                                                Confirmer
                                                            </button>
                                                            <button className="btn btn-danger mt-2" onClick={() => handleAnnulerRdv(rdv.id)}>
                                                                Annuler
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Aucun rendez-vous médical réservé.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <PharmacieFooter />

            {/* Modal Bootstrap natif pour afficher les détails de la commande */}
            <div className="modal fade" id="commandeModal" tabIndex="-1" aria-labelledby="commandeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {selectedCommande && (
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title">Commande #{selectedCommande.id}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Date :</strong> {new Date(selectedCommande.created_at).toLocaleDateString()}</p>
                                    <p><strong>Statut :</strong> {selectedCommande.statut}</p>
                                    <p><strong>Total :</strong> {selectedCommande.montant_total.toLocaleString()} FCFA</p>
                                    <h6>Produits :</h6>
                                    <ul>
                                        {selectedCommande.produits.map((produit) => (
                                            <li key={produit.id}>
                                                {produit.nom} - {produit.quantite} x {produit.prix.toLocaleString()} FCFA
                                            </li>
                                        ))}
                                    </ul>
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
