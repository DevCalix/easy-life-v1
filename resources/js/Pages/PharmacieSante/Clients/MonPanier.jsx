import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { usePharmaPanier } from "../Context/PharmaPanierContext";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

export default function Panier() {
    const { panier: initialPanier, totalPanier: initialTotalPanier, nombreProduitsUniques: initialNombreProduitsUniques } = usePage().props;
    const { panier, supprimerDuPanier, mettreAJourQuantite, totalPanier, nombreProduitsUniques } = usePharmaPanier();

    // Stocke l'état de mise à jour pour chaque produit
    const [updatingItems, setUpdatingItems] = useState({});

    useEffect(() => {
        if (initialPanier) {
            // Synchronisation avec les props initiales si nécessaire
        }
    }, [initialPanier]);

    // Gérer la mise à jour de la quantité
    const handleQuantiteChange = async (itemId, newQuantite) => {
        if (newQuantite < 1) return;

        setUpdatingItems((prev) => ({ ...prev, [itemId]: true })); // Désactiver le bouton

        try {
            await mettreAJourQuantite(itemId, newQuantite);
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la quantité :", err);
        } finally {
            setUpdatingItems((prev) => ({ ...prev, [itemId]: false })); // Réactiver le bouton
        }
    };

    return (
        <>
            <Head title="Panier" />
            <PharmaNavbar />
            <div className="container py-5">
                <h1 className="mb-2 montserrat-normal fw-bold">Votre Panier</h1>
                <hr />

                {panier.length > 0 ? (
                    <div className="row">
                        <div className="col-md-8">
                            {/* Liste des produits dans le panier */}
                            {panier.map((item) => (
                                <div key={item.id} className="card mb-3">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div className="me-2">
                                            <h5 className="card-title">{item.medicament.nom}</h5>
                                            {item.variation && (
                                                <p className="card-text text-muted">{item.variation.nom}</p>
                                            )}
                                            <p className="card-text text-success fw-bold">
                                                {item.medicament.prix.toLocaleString()} FCFA
                                            </p>
                                        </div>

                                        <div className="d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantiteChange(item.id, item.quantite - 1)}
                                                    disabled={item.quantite <= 1 || updatingItems[item.id]}
                                                >
                                                    <i className="bi bi-dash"></i>
                                                </button>
                                                <span className="fw-bold">{item.quantite}</span>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantiteChange(item.id, item.quantite + 1)}
                                                    disabled={updatingItems[item.id]}
                                                >
                                                    <i className="bi bi-plus"></i>
                                                </button>
                                            </div>
                                            <p className="card-text fw-bold mb-0">
                                                {(item.medicament.prix * item.quantite).toLocaleString()} FCFA
                                            </p>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => supprimerDuPanier(item.id)}
                                                disabled={updatingItems[item.id]}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Résumé du panier */}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold montserrat-normal">Résumé du Panier</h5>
                                    <p className="card-text">
                                        Nombre de médicaments : {nombreProduitsUniques}
                                    </p>
                                    <p className="card-text fw-bold">
                                        Total : {totalPanier.toLocaleString()} FCFA
                                    </p>
                                    <button className="btn btn-danger w-100 mb-2">
                                        Continuer mes achats
                                    </button>
                                    <Link
                                        href={route('pharmacie.paiement')}
                                        className="btn btn-primary w-100"
                                    >
                                        Passer la commande
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-muted">Votre panier est vide.</p>
                        <Link href={route('accueil.pharmacie')} className="btn btn-primary">
                            Retour à la boutique
                        </Link>
                    </div>
                )}
            </div>
            <PharmacieFooter />
        </>
    );
}
