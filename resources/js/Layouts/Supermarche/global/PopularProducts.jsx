import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";
import { usePanier } from "@/Pages/Supermarche/Context/PanierContext";
import "react-toastify/dist/ReactToastify.css";
import "../../../../css/SuperMarche/popularProducts.css";

export default function PopularProducts({ produitsPopulaires = [] }) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base

    // Redirige vers la page du produit
    const handleViewProduct = (product) => {
        Inertia.visit(`/supermarche/produits/page-produit/${product.slug}`);
    };
    const handleViewStore = (storeId) => {
            Inertia.visit(`/supermarche/info-stores/${storeId}`);
        };

    // Ajoute un produit au panier
    const { ajouterAuPanier } = usePanier();

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
        <section className="bg-light montserrat" id="popular-products">
            <div className="container" id="market-products">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold">Produits Populaires</h6>
                    <button
                        className="btn btn-outline-primary btn-sm montserrat-regulier"
                        onClick={() => Inertia.visit(route('produits-par-statut', 'produits-populaires'))}
                    >
                        Voir tout
                    </button>
                </div>
                <div className="d-flex overflow-auto gap-2 custom-scroll align-items-center py-2">
                    {produitsPopulaires.length > 0 ? (
                        produitsPopulaires.map((produit) => (
                            <div
                                key={produit.id}
                                className="product-card flex-shrink-0 text-center shadow-sm bg-white rounded text-decoration-none"
                                style={{ minWidth: "120px", maxWidth: "170px", position: "relative" }}
                            >
                                <div className="p-1">
                                    <img
                                        src={
                                            produit.image_principale
                                                ? `${appUrl}${produit.image_principale}` // Utiliser appUrl pour générer l'URL complète
                                                : `${appUrl}/images/default-product.jpg` // Image par défaut
                                        }
                                        alt={produit.nom}
                                        className="img-fluid mb-1"
                                        style={{
                                            width: "100%",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleViewProduct(produit)}
                                    />
                                    <h6 className="text-dark fw-semibold">{produit.nom}</h6>
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
                                    <p className="text-success fw-bold montserrat-regulier">
                                        {produit.prix} FCFA
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link
                                            href={`/supermarche/produits/page-produit/${produit.slug}`}
                                            className="btn btn-sm"
                                            style={{
                                                backgroundColor: "#4CAF50",
                                                flex: 1,
                                                marginRight: "5px",
                                                borderRadius: "4px",
                                            }}
                                        >
                                            Commander
                                        </Link>
                                        <button
                                            className="btn btn-sm"
                                            style={{
                                                backgroundColor: "#4CAF50",
                                                color: "#fff",
                                                borderRadius: "50%",
                                                width: "36px",
                                                height: "36px",
                                            }}
                                            onClick={() => handleAjouterAuPanier(produit, 1)}
                                        >
                                            <i className="bi bi-cart-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">Aucun produit populaire disponible.</p>
                    )}
                </div>
            </div>
            <hr />
        </section>
    );
}
