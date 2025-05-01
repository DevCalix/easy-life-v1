import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import { Inertia } from "@inertiajs/inertia";
import { usePanier } from "./Context/PanierContext"; // Assurez-vous que le chemin est correct

export default function Recherche({ produits, term }) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base

    const { ajouterAuPanier } = usePanier();

    // Redirige vers la page du produit
    const handleViewProduct = (product) => {
        Inertia.visit(`/supermarche/produits/page-produit/${product.slug}`);
    };

    // Fonction pour ajouter un produit au panier
    const handleAjouterAuPanier = async (product, quantite = 1) => {
        try {
            await ajouterAuPanier(product, quantite);
            toast.success(`${quantite} x ${product.nom} ajouté au panier !`, {
                position: "bottom-right",
                autoClose: 3000,
            });
        } catch (error) {
            toast.error(error.message || "Erreur lors de l'ajout au panier.", {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <>
            <Head title={`Résultats pour "${term}"`} />
            <MarketNavbar />
            <div className="container my-2 montserrat-normal">
                <h6 className="mb-4">Résultats pour "{term}"</h6>

                {/* Grille des produits */}
                <div className="row g-1">
                    {produits.length > 0 ? (
                        produits.map((product, index) => (
                            <div className="col-4 col-md-3" key={index}>
                                <div
                                    className="card position-relative"
                                    style={{
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                        height: "180px",
                                    }}
                                >
                                    {/* Image du produit */}
                                    <img
                                        src={product.image_principale ? `${appUrl}${product.image_principale}` : "/images/default-product.jpg"}
                                        alt={product.nom}
                                        className="card-img-top"
                                        style={{
                                            height: "100px",
                                            objectFit: "cover",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleViewProduct(product)}
                                    />

                                    {/* Contenu de la carte */}
                                    <div className="card-body p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <h6
                                            className="card-title fw-bold text-truncate mb-2"
                                            style={{ fontSize: "0.6rem" }}
                                        >
                                            {product.nom}
                                        </h6>
                                        <h6
                                            className="card-title fw-bold text-truncate mb-2"
                                            style={{ fontSize: "0.6rem" }}
                                        >
                                            Source : {product.store.nom}
                                        </h6>

                                        {/* Section prix + bouton "+" */}
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{
                                                width: "100%",
                                                marginTop: "auto",
                                            }}
                                        >
                                            {/* Prix */}
                                            <span
                                                className="text-primary fw-bold"
                                                style={{
                                                    fontSize: "0.5rem",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {product.prix} FCFA
                                            </span>

                                            {/* Bouton "+" */}
                                            <button
                                                className="btn btn-outline-success btn-sm d-flex justify-content-center align-items-center"
                                                style={{
                                                    height: "24px",
                                                    width: "24px",
                                                    padding: "0",
                                                    borderRadius: "50%",
                                                    marginRight: "1px",
                                                }}
                                                onClick={() => handleAjouterAuPanier(product, 1)} // Passer le produit et la quantité
                                            >
                                                <i className="bi bi-plus" style={{ fontSize: "1rem" }}></i>
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
