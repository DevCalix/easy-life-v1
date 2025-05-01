import React from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";
import { usePanier } from "@/Pages/Supermarche/Context/PanierContext";
import "react-toastify/dist/ReactToastify.css";
import "../../../../css/SuperMarche/nouveauSurEasyLife.css";

export default function NewOnEasyLife({ nouveauxProduits = [] }) {

        const { props } = usePage(); // Accéder aux props transmises par Laravel
        const appUrl = props.appUrl; // Récupérer l'URL de base
        const { ajouterAuPanier } = usePanier();
    // Redirige vers la page du produit
        const handleViewProduct = (product) => {
            Inertia.visit(`/supermarche/produits/page-produit/${product.slug}`);
        };

         const handleAjouterAuPanier = async (product, quantite = 1) => {
                try {
                    // Préparer les données à envoyer au backend
                    const produitData = {
                        produit_id: product.id, // ID du produit
                        quantite: quantite, // Quantité sélectionnée
                        variation_id: null, // Si le produit a des variations, vous devez les gérer ici
                    };

                    // Appeler la méthode ajouterAuPanier du contexte
                    await ajouterAuPanier(produitData);

                    // Afficher un toast de succès
                    toast.success(`${quantite} x ${product.nom} ajouté au panier !`, {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                } catch (error) {
                    // Afficher un toast d'erreur
                    toast.error(error.message || "Erreur lors de l'ajout au panier.", {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                }
            };



    return (
        <section className="bg-light py-2 montserrat" id="new-products">
            <div className="container">
                {/* En-tête avec titre et bouton "Voir tout" */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className="fw-bold">Nouveauté sur EASY LIFE</h6>
                                    <button
                                        className="btn btn-outline-primary btn-sm montserrat-regulier"
                                        onClick={() => Inertia.visit(route('produits-par-statut', 'nouveaux'))}
                                    >
                                        Voir tout
                                    </button>
                                </div>
                <div className="d-flex overflow-auto gap-2 custom-scroll align-items-center py-2">
                    {nouveauxProduits.length > 0 ? (
                        nouveauxProduits.map((produit, index) => (
                            <div
                                key={index}
                                className="new-item-card flex-shrink-0 text-center shadow-sm bg-white rounded"
                                style={{ minWidth: "130px", maxWidth: "170px" }}
                            >
                                <div className="p-2 position-relative">
                                    {/* Image du produit */}
                                    <img
                                        src={produit.image_principale ? `${appUrl}${produit.image_principale}` : "/images/default-product.jpg"}
                                        alt={produit.nom}
                                        className="img-fluid mb-3"
                                        style={{
                                            width: "100%",
                                            height: "140px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleViewProduct(produit)}
                                    />
                                    {/* Badge Nouveauté */}
                                    <span
                                        className="badge bg-danger text-white position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    >
                                        Nouveau
                                    </span>
                                    {/* Titre et prix */}
                                    <h6 className="text-dark fw-bold mb-1">{produit.nom}</h6>
                                    {produit.store && (
                                        <div className="d-flex align-items-center mt-1">
                                            <img
                                                src={
                                                    produit.store.photo_store
                                                        ? `${appUrl}${produit.store.photo_store}`
                                                        : `${appUrl}/images/default-store.jpg`
                                                }
                                                alt={produit.store.nom}
                                                className="rounded-circle me-2"
                                                style={{ width: "30px", height: "30px", objectFit: "cover" }}
                                            />
                                            <span className="text-muted small">{produit.store.nom}</span>
                                        </div>
                                    )}
                                    <p className="text-muted mb-1">{produit.prix} FCFA</p>
                                    {/* Boutons */}
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button
                                            className="btn btn-sm"
                                            id="btnExplorer"
                                            onClick={() => handleViewProduct(produit)}
                                        >
                                            Commander
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleAjouterAuPanier(produit, 1)}
                                        >
                                            <i className="bi bi-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">Aucun nouveau produit disponible.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
