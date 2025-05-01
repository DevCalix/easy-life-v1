import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../css/SuperMarche/productPage.css";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import { usePanier } from "./Context/PanierContext";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import { Inertia } from "@inertiajs/inertia";

export default function ProductPage({ produit, produitsSimilaires }) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    const [quantite, setQuantite] = useState(1);
    const [imagePrincipale, setImagePrincipale] = useState(produit.image_principale);
    const [selectedVariation, setSelectedVariation] = useState(null); // Pour gérer la variation sélectionnée
    const { ajouterAuPanier } = usePanier();

   // Calcul du prix affiché en fonction de la variation et de la réduction
    const prixBase = parseFloat(selectedVariation ? selectedVariation.prix_additionnel : produit.prix)|| 0;
    const prixAvecReduction = produit.pourcentage_reduction
        ? prixBase * (1 - produit.pourcentage_reduction / 100)
        : prixBase;

    // Gestion de la quantité
    const handleQuantiteChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantite(value);
    };

    const handleViewStore = (storeId) => {
                Inertia.visit(`/supermarche/info-stores/${storeId}`);
            };

    // Ajouter au panier
    const handleAddToCart = () => {
        if (produit.is_variable && !selectedVariation) {
            toast.error("Veuillez sélectionner une variation avant d'ajouter au panier.", {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }

        // Calculer le prix unitaire en tenant compte de la réduction et de la variation
        const prixBase = parseFloat(selectedVariation ? selectedVariation.prix_additionnel : produit.prix) || 0;
        const prixAvecReduction = produit.pourcentage_reduction
            ? prixBase * (1 - produit.pourcentage_reduction / 100)
            : prixBase;

        // Préparer les données à envoyer au backend
        const produitData = {
            produit_id: produit.id, // ID du produit
            quantite: quantite, // Quantité sélectionnée
            variation_id: selectedVariation?.id || null, // ID de la variation (si applicable)
            prix_unitaire: prixAvecReduction, // Prix unitaire avec réduction
            prix_total: prixAvecReduction * quantite, // Prix total pour la quantité sélectionnée
        };

        // Appeler la méthode ajouterAuPanier du contexte
        ajouterAuPanier(produitData)
            .then(() => {
                toast.success(`${quantite} x ${produit.nom} a été ajouté au panier.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout au panier :", error);
                toast.error("Une erreur s'est produite lors de l'ajout au panier.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    // Commander directement
    const handleCommander = async () => {
        if (produit.is_variable && !selectedVariation) {
            toast.error("Veuillez sélectionner une variation avant de commander.", {
                position: "bottom-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            // Données de la commande
            const commandeData = {
                produit_id: produit.id,
                quantite: quantite,
                variation_id: selectedVariation?.id || null, // ID de la variation si applicable
                prix: prixAvecReduction, // Prix selon la variation ou le produit de base
                nom_produit: produit.nom,
                image_produit: produit.image_principale,
            };

            // Rediriger vers la page de paiement avec les données de la commande
            Inertia.visit(route("sp-direct.paiement"), {
                method: "post",
                data: commandeData,
            });
        } catch (error) {
            toast.error(error.message || "Erreur lors de la commande. Veuillez réessayer.", {
                position: "bottom-right",
                autoClose: 3000,
            });
        }
    };

    // Changer l'image principale au survol
    const handleImageHover = (image) => {
        setImagePrincipale(image);
    };

    // Sélectionner une variation
    const handleVariationChange = (variation) => {
        setSelectedVariation(variation);

        // Si la variation a une image, l'afficher comme image principale
        if (variation.images && variation.images.length > 0) {
            setImagePrincipale(variation.images[0].url);
        } else {
            setImagePrincipale(produit.image_principale); // Revenir à l'image principale du produit
        }
    };

    return (
        <>
            <Head title={produit.nom} />
            <MarketNavbar />
            <div className="container py-3">
                <div className="row">
                    {/* Image principale et galerie d'images secondaires */}
                    <div className="col-lg-6 text-center mb-2">
                        <div className="position-relative">
                            <img
                                src={
                                    imagePrincipale
                                        ? `${appUrl}${imagePrincipale}`
                                        : "/storage/supermache/default_product.webp"
                                }
                                alt={produit.nom}
                                className="img-fluid rounded shadow-lg mb-3"
                                style={{ maxHeight: "450px", objectFit: "contain" }}
                            />
                            {produit.pourcentage_reduction && (
                                <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                                    -{produit.pourcentage_reduction}%
                                </span>
                            )}
                            {/* Bouton pour revenir à l'image principale */}
                            {imagePrincipale !== produit.image_principale && (
                                <button
                                    className="btn btn-sm btn-secondary position-absolute top-0 end-0 m-2"
                                    onClick={() => setImagePrincipale(produit.image_principale)}
                                >
                                    <i className="bi bi-arrow-counterclockwise"></i>
                                </button>
                            )}
                        </div>
                        {/* Galerie d'images secondaires */}
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                            {produit.imagesSecondaires?.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${appUrl}${image.url}`} // Utilisez l'URL complète
                                    alt={`Image secondaire ${index + 1}`}
                                    className="img-thumbnail cursor-pointer"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        border: imagePrincipale === image.url ? "2px solid #F9690E" : "1px solid #ddd",
                                    }}
                                    onClick={() => handleImageHover(image.url)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Détails du produit */}
                    <div className="col-lg-6 d-flex flex-column justify-content-between">
                        <div>
                            <h6 className="fw-bold text-dark mb-2">{produit.nom}</h6>
                            <p className="fs-6 fw-semibold">{produit.description}</p>
                            <div className="d-flex align-items-center gap-2">
                                <p className="text-danger fs-6 fw-semibold">
                                    {prixAvecReduction.toFixed(2)} FCFA
                                </p>
                                {produit.pourcentage_reduction && (
                                    <p className="text-muted text-decoration-line-through fs-6">
                                        {prixBase.toFixed(2)} FCFA
                                    </p>
                                )}
                            </div>

                            {/* Sélection des variations (si le produit est à variation) */}
                            {produit.is_variable && Array.isArray(produit.variations) && produit.variations.length > 0 ? (
                                <div className="mt-3">
                                    <h6 className="fw-bold mb-2">Choisissez une variation :</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {produit.variations.map((variation) => (
                                            <button
                                                key={variation.id}
                                                className={`btn btn-outline-secondary ${
                                                    selectedVariation?.id === variation.id ? "active" : ""
                                                }`}
                                                onClick={() => handleVariationChange(variation)}
                                            >
                                                {variation.valeur_variation}
                                            </button>
                                        ))}
                                    </div>
                                    {!selectedVariation && (
                                        <p className="text-danger mt-2">Veuillez sélectionner une variation.</p>
                                    )}
                                </div>
                            ) : null}
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
                                    <span
                                        className="text-muted small cursor-pointer"
                                        onClick={() => handleViewStore(produit.store.id)}
                                        style={{ cursor: 'pointer' }}
                                        >
                                        {produit.store.nom}
                                    </span>

                                </div>
                            )}
                        </div>

                       {/* Section de commande et panier */}
                        <div className="d-flex justify-content-between align-items-center mt-1">
                            <input
                                type="number"
                                className="form-control w-25 me-2"
                                value={quantite}
                                onChange={handleQuantiteChange}
                                min="1"
                            />
                            <button
                                className="btn btn-primary me-2"
                                onClick={handleCommander}
                                disabled={produit.is_variable && !selectedVariation} // Désactiver si variation non sélectionnée
                            >
                                <i className="bi bi-bag-check me-2"></i> Commander
                            </button>
                            {/* Activer "Ajouter au panier" même pour les produits à variation */}
                            <button
                                className="btn btn-outline-success"
                                onClick={handleAddToCart}
                                disabled={produit.is_variable && !selectedVariation} // Désactiver si variation non sélectionnée
                            >
                                <i className="bi bi-cart-fill me-2"></i> Ajouter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section Produits Similaires */}
                <div className="mt-5">
                    <h6 className="fw-bold mb-3">Les autres ont aussi acheté</h6>
                    <div className="row g-3">
                        {produitsSimilaires.length > 0 ? (
                            produitsSimilaires.map((produitSimilaire) => (
                                <div className="col-6 col-md-4 col-lg-3" key={produitSimilaire.id}>
                                    <div className="card h-100 shadow-sm">
                                        <Link href={route("page-produit", produitSimilaire.slug)}>
                                            <img
                                                src={`${appUrl}${produitSimilaire.image_principale}`}
                                                alt={produitSimilaire.nom}
                                                className="card-img-top"
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        </Link>
                                        <div className="card-body">
                                            <h6 className="card-title fw-bold">{produitSimilaire.nom}</h6>
                                            <p className="card-text text-danger fw-semibold">
                                                {produitSimilaire.prix} FCFA
                                            </p>
                                            {produitSimilaire.pourcentage_reduction && (
                                                <p className="card-text text-muted text-decoration-line-through">
                                                    {Math.round(produitSimilaire.prix / (1 - produitSimilaire.pourcentage_reduction / 100))} FCFA
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted">Aucun produit similaire trouvé.</p>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer />
            <MarketFooter />
        </>
    );
}
