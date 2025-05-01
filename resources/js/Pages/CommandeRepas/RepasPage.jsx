import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../css/Restaurant/repasPage.css";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import { useRestaurantPanier } from "./Context/RestaurantPanierContext";

export default function RepasPage({ repas = {}, repasSimilaire = [], boissons = []}) {
    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [mainImage, setMainImage] = useState(repas.photo || "/images/default-repas.jpg");

    // Utiliser le contexte de panier
    const { ajouterAuPanier } = useRestaurantPanier();

    // Gérer le changement de quantité
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    // Gérer la sélection d'une variation
    const handleVariationChange = (variation) => {
        setSelectedVariation(variation);
        if (variation?.image_variation) {
            setMainImage(variation.image_variation);
        } else {
            setMainImage(repas.photo || "/images/default-repas.jpg");
        }
    };

    // Réafficher l'image principale
    const resetMainImage = () => {
        setMainImage(repas.photo || "/images/default-repas.jpg");
        setSelectedVariation(null);
    };

    // Calculer le prix total en tenant compte de la réduction
    const calculateTotalPrice = () => {
        // Récupérer le prix de base (variation ou repas)
        const basePrice = selectedVariation
            ? parseFloat(selectedVariation.prix?.replace(",", ".") || "0")
            : parseFloat(repas.prix?.replace(",", ".") || "0");

        // Appliquer la réduction si le produit est en promotion
        const prixReduit = repas.reduction && repas.prix_reduit
            ? parseFloat(repas.prix_reduit.replace(",", ".") || basePrice)
            : basePrice;

        // Calculer le total
        return (quantity * prixReduit).toFixed(2);
    };

    // Gérer l'ajout au panier
    const handleAddToCart = () => {
        if (!repas?.id || !repas?.nom) {
            toast.error("Données du repas invalides.", {
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

        const repasData = {
            repas_id: repas.id,
            variation_id: selectedVariation?.id || null,
            quantite: quantity,
        };

        ajouterAuPanier(repasData)
            .then(() => {
                toast.success(`${quantity} x ${repas.nom} a été ajouté au panier.`, {
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
                console.error("Erreur lors de l'ajout au panier :", error.response?.data || error.message);
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

    // Gérer la commande directe
    const handleOrder = () => {
        // Rediriger vers la page de paiement direct
        router.visit("/commande-repas/paiement-direct", {
            method: "get",
            data: {
                repas: repas,
                quantity: quantity,
                selectedVariation: selectedVariation,
            },
        });
    };

    // Gérer l'ajout d'une boisson au panier
    const handleAddBoissonToCart = (boisson) => {
    // Récupérer la quantité sélectionnée
    const quantityInput = document.getElementById(`quantity-${boisson.id}`);
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity)) {
        toast.error("Veuillez entrer une quantité valide.", {
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

    const boissonData = {
        repas_id: boisson.id,
        quantite: quantity, // Utiliser la quantité sélectionnée
    };

    ajouterAuPanier(boissonData)
        .then(() => {
            toast.success(`${quantity} x ${boisson.nom} a été ajouté au panier.`, {
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
            console.error("Erreur lors de l'ajout au panier :", error.response?.data || error.message);
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

    // Gérer le retour vers la page précédente
    const handleGoBack = () => {
        Inertia.visit("/commande-repas");
    };

    return (
        <>
            <Head title={`Commander : ${repas.nom || "Repas"}`} />
            <NavBarResto />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <section className="product-page">
                <div className="container py-4">
                    {/* Bouton Retour */}
                    <button
                        className="btn btn-outline-secondary mb-4"
                        onClick={handleGoBack}
                    >
                        <i className="bi bi-arrow-left"></i> Retour
                    </button>

                    <div className="row">
                        {/* Image principale et galerie d'images secondaires */}
                        <div className="col-lg-6">
                            <div className="main-image-container">
                                <img
                                    src={mainImage}
                                    alt={repas.nom || "Repas"}
                                    className="img-fluid main-image rounded shadow-lg"
                                />
                                {mainImage !== repas.photo && (
                                    <button
                                        className="btn btn-sm btn-light reset-image-button my-1"
                                        onClick={resetMainImage}
                                    >
                                        <i className="bi bi-arrow-counterclockwise"></i> Réinitialiser l'image
                                    </button>
                                )}
                            </div>
                            <div className="image-gallery mt-3 d-flex gap-2">
                                {repas.imagesSecondairesRepas?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url_image || "/images/default-repas.jpg"}
                                        alt={`Image secondaire ${index + 1}`}
                                        className="thumbnail rounded shadow-sm"
                                        onClick={() => setMainImage(image.url_image)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Détails du repas */}
                        <div className="col-lg-6">
                            <h6 className="product-title my-2 montserrat-normal">{repas.nom || "Nom du repas"}</h6>
                            <p className="product-description text-muted mb-4">
                                {repas.description || "Aucune description disponible."}
                            </p>
                            <hr />
                            {/* Variations */}
                            {repas.variations?.length > 0 && (
                                <div className="variations mb-2">
                                    <h6 className="mb-3 montserrat-normal">Variations :</h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {repas.variations.map((variation) => (
                                            <button
                                                key={variation.id}
                                                className={`btn btn-outline-secondary ${
                                                    selectedVariation?.id === variation.id ? "active" : ""
                                                }`}
                                                onClick={() => handleVariationChange(variation)}
                                            >
                                                {variation.valeur_variation || "Variation"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Prix et quantité */}
                            <div className="price-quantity mb-4 d-flex justify-content-between align-items-center">
                                <span className="price h6 text-success montserrat-normal">
                                    {repas.reduction && repas.prix_reduit ? (
                                        <>
                                            <span className="text-decoration-line-through text-muted me-2">
                                                {selectedVariation ? selectedVariation.prix : repas.prix} XAF
                                            </span>
                                            <span>{repas.prix_reduit} XAF</span>
                                        </>
                                    ) : (
                                        <span>{selectedVariation ? selectedVariation.prix : repas.prix} XAF</span>
                                    )}
                                </span>
                                <div className="quantity d-flex align-items-center gap-2">
                                    <label htmlFor="quantity" className="mb-0">
                                        Quantité :
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        min="1"
                                        className="form-control"
                                        style={{ width: "80px" }}
                                    />
                                </div>
                            </div>

                            {/* Boutons d'action */}
                            <div className="actions d-flex gap-3">
                                <button
                                    className="btn btn-primary flex-grow-1"
                                    onClick={handleOrder}
                                >
                                    <i className="bi bi-cart-check me-2"></i> Commander
                                </button>
                                <button
                                    className="btn btn-secondary flex-grow-1"
                                    onClick={handleAddToCart}
                                >
                                    <i className="bi bi-cart-plus me-2"></i> Ajouter au panier
                                </button>
                            </div>

                            {/* Informations du restaurant */}
                            <div className="restaurant-info mt-4">
                                <h6 className="mb-3 montserrat-normal fw-bold">Restaurant</h6>
                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={repas.restaurant?.photo_restaurant || "/images/default-restaurant.jpg"}
                                        alt={repas.restaurant?.nom || "Restaurant"}
                                        className="img-fluid rounded-circle"
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                    <div>
                                        <h6 className="mb-0">{repas.restaurant?.nom || "Nom du restaurant"}</h6>
                                        <p className="text-muted mb-0">{repas.restaurant?.adresse || "Adresse non disponible"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Section des boissons */}
                    {boissons.length > 0 && (
                    <div className="boissons mt-5">
                    <h3 className="mb-4 montserrat-normal">Boissons</h3>
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2">
                        {boissons.map((boisson) => (
                            <div key={boisson.id} className="col">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={boisson.photo || "/images/default-repas.jpg"}
                                        alt={boisson.nom || "Boisson"}
                                        className="card-img-top"
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title montserrat-normal">{boisson.nom}</h5>
                                        <p className="card-text text-muted montserrat-normal">{boisson.prix}</p>

                                        {/* Conteneur flex pour aligner quantité et bouton */}
                                        <div className="d-flex align-items-center gap-2">
                                            <input
                                                type="number"
                                                id={`quantity-${boisson.id}`}
                                                min="1"
                                                defaultValue="1"
                                                className="form-control"
                                                style={{ width: "60px" }}
                                            />
                                            <button
                                                className="btn btn-outline-primary d-flex align-items-center"
                                                onClick={() => handleAddBoissonToCart(boisson)}
                                            >
                                                <i className="bi bi-cart-plus me-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                )}
                    {/* Section des repas similaires */}
                    <div className="similar-products mt-5">
                        <h3 className="mb-4 montserrat-normal">Les autres ont acheté aussi </h3>
                        <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4">
                            {repasSimilaire.map((repas) => (
                                <div key={repas.id} className="col">
                                    <div className="card h-100 shadow-sm">
                                        <img
                                            src={repas.photo || "/images/default-repas.jpg"}
                                            alt={repas.nom || "Repas"}
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title montserrat-normal">{repas.nom || "Nom du repas"}</h5>
                                            <p className="card-text text-muted montserrat-normal">{repas.prix || "0"} XAF</p>
                                            <button
                                                className="btn btn-outline-primary w-100"
                                                onClick={() =>
                                                    Inertia.visit(`/commande-repas/repas/${repas.slug}/details`)
                                                }
                                            >
                                                Voir plus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <PiedDePageResto />
        </>
    );
}
