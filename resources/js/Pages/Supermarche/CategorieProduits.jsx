import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import { Inertia } from "@inertiajs/inertia";
import { usePanier } from "./Context/PanierContext";

export default function ProduitsParCategorie({ categorie, produits }) {
    const { props } = usePage();
    const appUrl = props.appUrl;
    const { ajouterAuPanier } = usePanier();

    // Rediriger vers la page du produit
    const handleViewProduct = (product) => {
        Inertia.visit(`/supermarche/produits/page-produit/${product.slug}`);
    };

    // Ajouter un produit au panier
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
        <>
            <Head title={categorie.nom} />
            <MarketNavbar />

            <div className="container my-3 montserrat-normal">
                {/* Titre de la catégorie */}
                <h6 className="text-center fw-bold mb-3">{categorie.nom}</h6>

                {/* Grille des produits */}
                <div className="row g-2">
                    {produits.length > 0 ? (
                        produits.map((product) => (
                            <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                                <div className="card shadow-sm rounded border-1">
                                    {/* Image du produit */}
                                    <img
                                        src={product.image_principale ? `${appUrl}${product.image_principale}` : "/images/default-product.jpg"}
                                        alt={product.nom}
                                        className="card-img-top"
                                        style={{ height: "120px", objectFit: "cover", cursor: "pointer" }}
                                        onClick={() => handleViewProduct(product)}
                                    />

                                    <div className="card-body p-2 d-flex flex-column">
                                        {/* Nom du produit */}
                                        <h6 className="fw-bold text-truncate mb-1" style={{ fontSize: "0.8rem" }}>
                                            {product.nom}
                                        </h6>

                                        {/* Informations du magasin */}
                                        {product.store && (
                                            <div className="d-flex align-items-center mt-1">
                                                <img
                                                    src={product.store.photo_store ? `${appUrl}${product.store.photo_store}` : "/images/default-store.jpg"}
                                                    alt={product.store.nom}
                                                    className="rounded-circle me-2"
                                                    style={{ width: "25px", height: "25px", objectFit: "cover" }}
                                                />
                                                <span className="text-muted small">{product.store.nom}</span>
                                            </div>
                                        )}

                                        {/* Prix + Bouton Ajouter */}
                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                            <span className="text-primary fw-bold" style={{ fontSize: "0.8rem" }}>
                                                {product.prix} FCFA
                                            </span>
                                            <button
                                                className="btn btn-outline-success btn-sm rounded-circle"
                                                style={{ height: "28px", width: "28px", padding: "0" }}
                                                onClick={() => handleAjouterAuPanier(product)}
                                            >
                                                <i className="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">Aucun produit trouvé.</p>
                    )}
                </div>
            </div>

            <ToastContainer />
            <MarketFooter />
        </>
    );
}
