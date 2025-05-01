import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import { usePanier } from "./Context/PanierContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PanierPage() {
    const { panier, supprimerDuPanier, modifierQuantite } = usePanier();
    const { props } = usePage();
    const appUrl = props.appUrl; // URL de base pour les images

    // Calcul du sous-total
    const sousTotal = panier.reduce((total, item) => total + (item.prix_unitaire * item.quantite), 0);

    // Frais de livraison (exemple fixe)
    const fraisLivraison = 500; // 500 FCFA

    // Total final
    const totalFinal = sousTotal + fraisLivraison;

    // Gestion de la modification de la quantité
    const handleModifierQuantite = (id, nouvelleQuantite) => {
        if (nouvelleQuantite < 1) {
            toast.error("La quantité doit être d'au moins 1.", {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }
        modifierQuantite(id, nouvelleQuantite);
    };

    return (
        <>
            <Head title="Panier" />
            <MarketNavbar />
            <div className="container py-2">
                <h2 className="fw-bold montserrat-normal">Votre Panier</h2>

                {/* Liste des produits */}
                <div className="row">
                    <div className="col-lg-8">
                        {panier.length > 0 ? (
                            panier.map((item) => (
                                <div key={item.id} className="card mb-3 shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            {/* Image du produit */}
                                            <div className="col-md-3">
                                                <img
                                                    src={`${appUrl}${item.produit.image_principale}`}
                                                    alt={item.produit.nom}
                                                    className="img-fluid rounded"
                                                    style={{ maxHeight: "100px", objectFit: "cover" }}
                                                />
                                            </div>

                                            {/* Détails du produit */}
                                            <div className="col-md-6">
                                                <h5 className="card-title fw-bold montserrat-normal">{item.produit.nom}</h5>
                                                {item.variation && (
                                                    <p className="text-muted mb-1">
                                                        Variation : {item.variation.valeur_variation}
                                                    </p>
                                                )}
                                                <p className="text-muted mb-1 montserrat-normal">
                                                    Prix unitaire : {item.prix_unitaire.toLocaleString()} FCFA
                                                </p>
                                            </div>

                                            {/* Quantité et actions */}
                                            <div className="col-md-3">
                                                <div className="d-flex align-items-center gap-2">
                                                    {/* Bouton "-" pour diminuer la quantité */}
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => handleModifierQuantite(item.id, item.quantite - 1)}
                                                        disabled={item.quantite <= 1}
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </button>

                                                    {/* Affichage de la quantité */}
                                                    <span className="fw-bold">{item.quantite}</span>

                                                    {/* Bouton "+" pour augmenter la quantité */}
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => handleModifierQuantite(item.id, item.quantite + 1)}
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </button>

                                                    {/* Bouton de suppression */}
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => supprimerDuPanier(item.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Prix total pour cet article */}
                                            <div className="col-md-12">
                                                <p className="text-end fw-bold">
                                                    Total : {(item.prix_unitaire * item.quantite).toLocaleString()} FCFA
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <h4 className="text-muted">Votre panier est vide.</h4>
                                <Link href="/supermarche" className="btn btn-primary mt-3">
                                    Continuer vos achats
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Résumé du panier */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title fw-bold mb-3 montserrat-normal">Résumé du Panier</h5>

                                {/* Sous-total */}
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Sous-total</span>
                                    <span>{sousTotal.toLocaleString()} FCFA</span>
                                </div>

                                {/* Frais de livraison */}
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Frais de livraison</span>
                                    <span>{fraisLivraison.toLocaleString()} FCFA</span>
                                </div>

                                {/* Total final */}
                                <div className="d-flex justify-content-between fw-bold fs-6">
                                    <span>Total</span>
                                    <span>{totalFinal.toLocaleString()} FCFA</span>
                                </div>

                                {/* Bouton de commande */}
                                <div className="d-grid mt-4">
                                    <Link
                                        href="/supermarche/paiement"
                                        className="btn btn-primary btn-sm"
                                        disabled={panier.length === 0}
                                    >
                                        Passer la commande
                                    </Link>
                                    <Link
                                        href="/supermarche"
                                        className="btn btn-success btn-sm mt-3"
                                        disabled={panier.length === 0}
                                    >
                                        Continuer mes achats
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
            <MarketFooter />
        </>
    );
}
