import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import { Inertia } from "@inertiajs/inertia";
import { usePanier } from "./Context/PanierContext";

export default function ProduitsParStore({ store, produits }) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    const { ajouterAuPanier } = usePanier();
    // Trouver la méta dont la clé est "whatsapp"
    const whatsappMeta = store.metas.find(meta => meta.cle === "whatsapp");
    // Construire le lien WhatsApp si une valeur est trouvée
    const predefinedMessage = encodeURIComponent(`Bonjour, je suis intéressé par vos produits. Pouvez-vous m'en dire plus ?`);
    const whatsappLink = whatsappMeta ? `https://wa.me/${whatsappMeta.valeur}?text=${predefinedMessage}` : "#";


    // Rediriger vers la page du produit
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
            <Head title={`Produits de ${store.nom}`} />
            <MarketNavbar />

            {/* En-tête du magasin */}
            <div className="container-fluid py-3" style={{ backgroundColor: "#03C54C" }}>
                <div className="container">
                    <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                        <div className="row g-0 align-items-center">
                            {/* Image du magasin */}
                            <div className="col-md-4 text-center p-2 bg-white">
                                <img
                                    src={store.photo_store ? `${appUrl}${store.photo_store}` : "/images/default-store.jpg"}
                                    alt={store.nom}
                                    className="img-fluid rounded"
                                    style={{ width: "150px", objectFit: "cover" }}
                                />
                            </div>

                            {/* Informations du magasin */}
                            <div className="col-md-8 p-3 bg-white">
                                {/* <h2 className="fw-bold mb-3 text-dark">{store.nom}</h2> */}
                                <div className="d-flex flex-column gap-3 montserrat-normal">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-geo-alt-fill me-2 text-primary fs-5"></i>
                                        <p className="text-muted mb-0">{store.adresse}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-telephone-fill me-2 text-primary fs-5"></i>
                                        <a href={`tel:${store.numero_telephone}`} className="text-decoration-none fw-bold text-dark">
                                            {store.numero_telephone}
                                        </a>


                                        {whatsappMeta ? (
                                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success m-3">
                                                <i className="bi bi-whatsapp"></i>
                                            </a>
                                        ) : (
                                        ''
                                        )}

                                    </div>

                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-clock-fill me-2 text-primary fs-5"></i>
                                        <p className="text-muted mb-0">{store.horaires_ouverture}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-star-fill me-2 text-warning fs-5"></i>
                                        <p className="text-muted mb-0">
                                            {store.rating} / 5 <span className="text-muted">(Avis clients)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste des produits */}
            <div className="container my-2 montserrat-normal">
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
                                        loading="lazy"
                                    />

                                    {/* Contenu de la carte */}
                                    <div className="card-body p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <h6
                                            className="card-title fw-bold text-truncate mb-2"
                                            style={{ fontSize: "0.7rem" }}
                                        >
                                            {product.nom}
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
                                                    fontSize: "0.7rem",
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
                                                onClick={() => handleAjouterAuPanier(product, 1)}
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
                        <p className="text-center text-muted">Aucun produit trouvé dans ce magasin.</p>
                    )}
                </div>
            </div>

            <ToastContainer />
            <MarketFooter />
        </>
    );
}
