import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import { Inertia } from "@inertiajs/inertia";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";

export default function StProfile() {
    const { user} = usePage().props;
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
            <MarketNavbar />
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

                                        {/* <button className="btn btn-danger btn-sm" onClick={() => handleEditerProfil()}>
                                            Editer mon Compte
                                        </button> */}
                                    </div>

                            </div>
                        </div>
                    )}


                </div>
            </div>

            <MarketFooter />

            {/* Modal Bootstrap natif pour afficher les détails de la commande */}
            {/* <div className="modal fade" id="commandeModal" tabIndex="-1" aria-labelledby="commandeModalLabel" aria-hidden="true">
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
            </div> */}
        </>
    );
}
