import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRestaurantPanier } from "./Context/RestaurantPanierContext";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";

export default function RepasCommandePanier() {
    // Récupérer les données du panier passées par Inertia
    const { panier: initialPanier, totalPanier: initialTotalPanier } = usePage().props;

    // Utiliser un état local pour le panier et le total
    const [panier, setPanier] = useState(initialPanier);
    const [totalPanier, setTotalPanier] = useState(initialTotalPanier);

    // Utiliser le contexte du panier
    const { supprimerDuPanier, mettreAJourQuantite, viderPanier, loading, error } = useRestaurantPanier();

    // Fonction pour recalculer le total du panier
    const recalculerTotal = (panier) => {
        return panier.reduce((total, item) => total + item.quantite * item.repas.prix, 0);
    };

    // Gérer la suppression d'un élément du panier
    const handleSupprimer = async (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet élément du panier ?")) {
            try {
                // Supprimer l'élément côté serveur
                await supprimerDuPanier(id);

                // Mettre à jour l'état local du panier après la suppression
                const nouveauPanier = panier.filter((item) => item.id !== id);
                setPanier(nouveauPanier);

                // Recalculer le total du panier
                setTotalPanier(recalculerTotal(nouveauPanier));

                toast.success("Élément supprimé du panier avec succès.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (err) {
                console.error("Erreur lors de la suppression :", err);
                toast.error("Une erreur s'est produite lors de la suppression.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    // Gérer la mise à jour de la quantité
    const handleQuantiteChange = async (id, nouvelleQuantite) => {
        if (nouvelleQuantite < 1) {
            toast.error("La quantité doit être au moins 1.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            // Mettre à jour la quantité côté serveur
            await mettreAJourQuantite(id, nouvelleQuantite);

            // Mettre à jour l'état local du panier
            const nouveauPanier = panier.map((item) =>
                item.id === id ? { ...item, quantite: nouvelleQuantite } : item
            );
            setPanier(nouveauPanier);

            // Recalculer le total du panier
            setTotalPanier(recalculerTotal(nouveauPanier));

            toast.success("Quantité mise à jour avec succès.", {
                position: "top-right",
                autoClose: 100,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la quantité :", err);
        }
    };

    return (
        <>
            <Head title="Mon Panier" />
            <ToastContainer />
            <NavBarResto />
            <div className="container py-4 bg-light min-vh-100">
                <h1 className="text-center mb-4 text-success montserrat-normal fw-bold">Mon Panier</h1>

                {panier.length > 0 ? (
                    <>
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                {panier.map((item) => (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                                        <div>
                                            <h5 className="mb-1 fw-bold montserrat-normal">{item.repas.nom}</h5>
                                            {item.variation && (
                                                <p className="mb-1 text-muted">
                                                    <small>Variation : {item.variation.nom}</small>
                                                </p>
                                            )}
                                            <p className="mb-1">
                                                <span className="text-muted montserrat-normal">{item.quantite} x </span>
                                                <span className="text-success fw-bold montserrat-normal">{item.repas.prix.toLocaleString()} FCFA</span>
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantiteChange(item.id, item.quantite - 1)}
                                                    disabled={item.quantite <= 1}
                                                >
                                                    <i className="bi bi-dash"></i>
                                                </button>
                                                <span className="fw-bold">{item.quantite}</span>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantiteChange(item.id, item.quantite + 1)}
                                                >
                                                    <i className="bi bi-plus"></i>
                                                </button>
                                            </div>
                                            <p className="mb-0 fw-bold montserrat-normal">
                                                {(item.quantite * item.repas.prix).toLocaleString()} FCFA
                                            </p>
                                            <button
                                                className="btn btn-outline-danger btn-sm montserrat-normal"
                                                onClick={() => handleSupprimer(item.id)}
                                                disabled={loading}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0 text-danger fw-bold montserrat-normal">Total : {totalPanier.toLocaleString()} FCFA</h4>
                            <div className="d-flex gap-2">
                                <Link href="/commande-repas/paiement" className="btn btn-danger btn-sm">
                                    <i className="bi bi-cart-check me-2"></i> Passer la commande
                                </Link>
                                <Link href="/commande-repas" className="btn btn-warning btn-sm">
                                    <i className="bi bi-arrow-left me-2"></i> Continuer mes achats
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-5">
                        <p className="text-muted fs-5">Votre panier est vide.</p>
                        <Link href="/commande-repas" className="btn btn-primary btn-lg">
                            <i className="bi bi-arrow-left me-2"></i> Voir les repas disponibles
                        </Link>
                    </div>
                )}
            </div>
            <PiedDePageResto />
        </>
    );
}
