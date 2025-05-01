import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import { Inertia } from "@inertiajs/inertia";
import { usePanier } from "./Context/PanierContext"; // Assurez-vous que le chemin est correct

export default function ProduitsParStatut({ produits, statut }) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base

    // Titre de la page en fonction du statut
    const titrePage = {
        'nouveaux': 'Nouveaux Produits',
        'meilleures-offres': 'Meilleures Offres',
        'produits-populaires': 'Produits Populaires',
    }[statut];

    const { ajouterAuPanier } = usePanier();

    // Redirige vers la page du produit
    const handleViewProduct = (product) => {
        Inertia.visit(`/supermarche/produits/page-produit/${product.slug}`);
    };

    // Fonction pour ajouter un produit au panier
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
            <Head title={titrePage} />
            <MarketNavbar />
            <div className="container my-2 montserrat-normal">
                {/* Grille des produits */}
                <div className="row g-1">
                    {produits.data.length > 0 ? (
                        produits.data.map((product, index) => (
                            <div className="col-4 col-md-3" key={index}>
                                <div
                                    className="card h-100 border-1 shadow-sm rounded-3 overflow-hidden"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleViewProduct(product)}
                                >
                                    {/* Image du produit */}
                                    <img
                                        src={product.image_principale ? `${appUrl}${product.image_principale}` : "/images/default-product.jpg"}
                                        alt={product.nom}
                                        className="card-img-top"
                                        style={{ height: "150px", objectFit: "cover" }}
                                        loading="lazy"
                                    />

                                    {/* Contenu de la carte */}
                                    <div className="card-body p-3" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }} >
                                        {/* Nom du produit */}
                                        <h6 className="card-title fw-bold text-truncate mb-2" style={{ fontSize: "0.9rem" }}>
                                            {product.nom}
                                        </h6>

                                        {/* Informations du magasin */}
                                        {product.store && (
                                            <div className="d-flex align-items-center mb-2">
                                                <img
                                                    src={product.store.photo_store ? `${appUrl}${product.store.photo_store}` : "/images/default-store.jpg"}
                                                    alt={product.store.nom}
                                                    className="rounded-circle me-2"
                                                    style={{ width: "25px", height: "25px", objectFit: "cover" }}
                                                />
                                                <span className="text-muted small" style={{ fontSize: "0.6rem" }}>{product.store.nom}</span>
                                            </div>
                                        )}

                                        {/* Section prix + bouton "+" */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            {/* Prix */}
                                            <span className="text-primary fw-bold" style={{ fontSize: "0.5rem" }}>
                                                {product.prix} FCFA
                                            </span>

                                            {/* Bouton "+" */}
                                            <button
                                                className="btn btn-outline-success btn-sm d-flex justify-content-center align-items-center"
                                                style={{
                                                    height: "25px",
                                                    width: "25px",
                                                    padding: "0",
                                                    borderRadius: "50%",
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Empêcher la redirection
                                                    handleAjouterAuPanier(product, 1);
                                                }}
                                                aria-label={`Ajouter ${product.nom} au panier`}
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

                {/* Pagination
                {produits.links && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                {produits.links.map((link, index) => (
                                    <li key={index} className={`page-item ${link.active ? 'active' : ''} ${link.url ? '' : 'disabled'}`}>
                                        <Link href={link.url || "#"} className="page-link" dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )} */}
            </div>
            <ToastContainer />
            <MarketFooter />
        </>
    );
}
