import React from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import "../../../../css/SuperMarche/marketBestOffers.css";

export default function MarketBestOffers({ bestOffers = [] }) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base

    // Redirige vers la page du produit
    const handleViewProduct = (product) => {
        Inertia.visit(`/supermarche/produits/page-produit/${product.slug}`);
    };

    // Redirige vers la page de tous les produits
    const handleShowProducts = () => {
        Inertia.visit("/supermarche/products/");
    };

    return (
        <section className="bg-light montserrat" id="special-offers">
            <div className="container">
                {/* En-tête avec titre et bouton "Voir tout" */}
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold">Meilleures Offres</h6>
                    <button
                        className="btn btn-outline-primary btn-sm montserrat-regulier"
                        onClick={() => Inertia.visit(route('produits-par-statut', 'meilleures-offres'))}
                    >
                        Voir tout
                    </button>
                </div>

                {/* Liste des produits en offre */}
                <div className="position-relative">
                    <div className="d-flex overflow-auto gap-1 custom-scroll align-items-center py-1">
                        {bestOffers.length > 0 ? (
                            bestOffers.map((offer, index) => (
                                <div
                                    key={index}
                                    className="offer-card flex-shrink-0 shadow-sm rounded text-decoration-none"
                                    style={{ minWidth: "100px", maxWidth: "150px", position: "relative" }}
                                >
                                    <div className="p-2">
                                        {/* Image du produit */}
                                        <div className="position-relative">
                                            <img
                                                src={
                                                    offer.image_principale
                                                        ? `${appUrl}${offer.image_principale}` // Utiliser appUrl pour générer l'URL complète
                                                        : `${appUrl}/images/default-product.jpg` // Image par défaut
                                                }
                                                alt={offer.nom}
                                                className="img-fluid rounded"
                                                style={{
                                                    width: "100%",
                                                    height: "150px",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => handleViewProduct(offer)}
                                            />
                                            {/* Badge de réduction */}
                                            {offer.pourcentage_reduction && (
                                                <span className="discount-badge bg-danger text-white position-absolute">
                                                    {offer.pourcentage_reduction}%
                                                </span>
                                            )}
                                        </div>

                                        {/* Nom du produit */}
                                        <h6 className="text-dark fw-bold mt-2">{offer.nom}</h6>
                                        {offer.store && (
                                            <div className="d-flex align-items-center mt-1">
                                                <img
                                                    src={
                                                        offer.store.photo_store
                                                            ? `${appUrl}${offer.store.photo_store}`
                                                            : `${appUrl}/images/default-store.jpg`
                                                    }
                                                    alt={offer.store.nom}
                                                    className="rounded-circle me-2"
                                                    style={{ width: "30px", height: "30px", objectFit: "cover" }}
                                                />
                                                <span className="text-muted small">{offer.store.nom}</span>
                                            </div>
                                        )}
                                        {/* Prix du produit */}
                                        <div>
                                            <span className="text-danger text-decoration-line-through me-2">
                                                {offer.prix} FCFA
                                            </span>
                                            <br />
                                            <span className="fw-bold text-success">
                                                {(
                                                    offer.prix -
                                                    (offer.prix * offer.pourcentage_reduction) / 100
                                                ).toFixed(2)}{" "}
                                                FCFA
                                            </span>
                                        </div>

                                        {/* Bouton "Voir l'offre" */}
                                        <button
                                            className="btn btn-sm mt-2 w-100"
                                            style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                                            onClick={() => handleViewProduct(offer)}
                                        >
                                            Voir l'offre
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted">Aucune offre disponible.</p>
                        )}
                    </div>
                </div>
            </div>
            <hr />
        </section>
    );
}
