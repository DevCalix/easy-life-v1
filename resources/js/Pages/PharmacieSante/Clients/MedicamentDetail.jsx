import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import { usePharmaPanier } from "../Context/PharmaPanierContext";

export default function MedicamentDetail({ medicament = {}, medicamentsSimilaires = [] }) {
    const { panier, ajouterAuPanier, supprimerDuPanier, viderPanier, loading, error } = usePharmaPanier(); // Utilisez le contexte
    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [mainImage, setMainImage] = useState(medicament.image_principale || "/images/default-medicament.jpg");

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
            setMainImage(medicament.image_principale || "/images/default-medicament.jpg");
        }
    };

    // Réafficher l'image principale
    const resetMainImage = () => {
        setMainImage(medicament.image_principale || "/images/default-medicament.jpg");
        setSelectedVariation(null);
    };

    // Calculer le prix total
    const calculateTotalPrice = () => {
        const basePrice = selectedVariation
            ? parseFloat(selectedVariation.prix?.replace(",", ".") || "0")
            : parseFloat(medicament.prix?.replace(",", ".") || "0");
        return (quantity * basePrice).toFixed(2);
    };

    // Gérer l'ajout au panier
    const handleAddToCart = async () => {
        if (!medicament?.id || !medicament?.nom) {
            toast.error("Données du médicament invalides.", {
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

        const prixUnitaire = parseFloat(
            (selectedVariation ? selectedVariation.prix : medicament.prix)
                .replace(",", ".") // Remplacez la virgule par un point
                .replace(/[^0-9.]/g, "") // Supprimez les caractères non numériques
        );

        const medicamentData = {
            st_medicament_id: medicament.id,
            st_variation_medicament_id: selectedVariation?.id || null,
            quantite: quantity,
            prix_unitaire: prixUnitaire,
        };

        try {
            await ajouterAuPanier(medicamentData); // Utilisez la fonction du contexte
            toast.success(`${quantity} x ${medicament.nom} a été ajouté au panier.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Erreur complète lors de l'ajout au panier :", error.response?.data || error.message);
            toast.error(error.response?.data?.error || "Une erreur s'est produite lors de l'ajout au panier.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    // Gérer la commande directe
    // Gérer la commande directe
const handleOrder = () => {
    if (!medicament?.id || !medicament?.nom) {
        toast.error("Données du médicament invalides.", {
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

    // Préparer les données du médicament pour la commande directe
    const medicamentData = {
        st_medicament_id: medicament.id,
        st_variation_medicament_id: selectedVariation?.id || null,
        quantite: quantity,
        prix_unitaire: parseFloat(
            (selectedVariation ? selectedVariation.prix : medicament.prix)
                .replace(",", ".") // Remplacez la virgule par un point
                .replace(/[^0-9.]/g, "") // Supprimez les caractères non numériques
        ),
    };

    // Rediriger vers la page de paiement avec les données du médicament
    router.visit(route('pharmacie.paiement.direct'), {
        method: 'get',
        data: medicamentData,
    });

    toast.info(`Commande de ${quantity} x ${medicament.nom} pour un total de ${calculateTotalPrice()} XOF.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

    // Gérer le retour vers la page précédente
    const handleGoBack = () => {
        Inertia.visit("/pharmacie-sante");
    };

    return (
        <>
            <Head title={`Détails de ${medicament.nom || "Médicament"}`} />
            <PharmaNavbar />
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
            <section className="medicament-page bg-light py-5">
                <div className="container">
                    {/* Bouton Retour */}
                    <button
                        className="btn btn-outline-secondary mb-4 d-flex align-items-center gap-2"
                        onClick={handleGoBack}
                    >
                        <i className="bi bi-arrow-left"></i> Retour
                    </button>

                    <div className="row g-4">
                        {/* Image principale et galerie d'images secondaires */}
                        <div className="col-lg-6">
                            <div className="main-image-container position-relative">
                                <img
                                    src={mainImage}
                                    alt={medicament.nom || "Médicament"}
                                    className="img-fluid rounded-3 shadow-lg w-100"
                                    style={{ height: "400px", objectFit: "cover" }}
                                />
                                {mainImage !== medicament.image_principale && (
                                    <button
                                        className="btn btn-light reset-image-button position-absolute top-0 end-0 m-2"
                                        onClick={resetMainImage}
                                    >
                                        <i className="bi bi-arrow-counterclockwise"></i> Réinitialiser
                                    </button>
                                )}
                            </div>
                            <div className="image-gallery mt-3 d-flex flex-wrap gap-2">
                                {medicament.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url || "/images/default-medicament.jpg"}
                                        alt={`Image secondaire ${index + 1}`}
                                        className="thumbnail rounded-3 shadow-sm cursor-pointer"
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        onClick={() => setMainImage(image.url)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Détails du médicament */}
                        <div className="col-lg-6">
                            <div className="bg-white p-4 rounded-3 shadow-sm">
                                <h1 className="medicament-title mb-3 fw-bold montserrat-normal">
                                    {medicament.nom || "Nom du médicament"}
                                </h1>
                                <p className="medicament-description text-muted mb-4">
                                    {medicament.description || "Aucune description disponible."}
                                </p>
                                {/* Badge pour les médicaments nécessitant une ordonnance */}
                                {medicament.ordonnance_requise == true && (
                                    <div className="alert alert-warning mb-2 fw-bold text-danger montserrat-normal" role="alert">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        Ce médicament nécessite une ordonnance.
                                    </div>
                                )}

                                <hr className="my-4" />

                                {/* Variations */}
                                {medicament.variations?.length > 0 && (
                                    <div className="variations mb-4">
                                        <h6 className="mb-3 fw-bold montserrat-normal">Variations :</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {medicament.variations.map((variation) => (
                                                <button
                                                    key={variation.id}
                                                    className={`btn btn-outline-primary btn-sm ${
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
                                <div className="price-quantity mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="price h4 text-success fw-bold montserrat-normal">
                                            {selectedVariation ? selectedVariation.prix : medicament.prix} XOF
                                        </span>
                                        <div className="quantity d-flex align-items-center gap-2">
                                            <label htmlFor="quantity" className="mb-0 fw-bold">
                                                Quantité :
                                            </label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                min="1"
                                                className="form-control form-control-sm"
                                                style={{ width: "80px" }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons d'action */}
                                <div className="actions d-flex gap-3">
                                    <button
                                        className="btn btn-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                        onClick={handleOrder}
                                    >
                                        <i className="bi bi-cart-check"></i> Commander
                                    </button>
                                    <button
                                        className="btn btn-secondary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                                        onClick={handleAddToCart}
                                    >
                                        <i className="bi bi-cart-plus"></i> Ajouter au panier
                                    </button>
                                </div>

                                {/* Informations de la pharmacie */}
                                <div className="pharmacie-info mt-4">
                                    <h6 className="mb-3 fw-bold montserrat-normal">Pharmacie</h6>
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={medicament.pharmacie?.image_principale || "/images/default-pharmacie.jpg"}
                                            alt={medicament.pharmacie?.nom || "Pharmacie"}
                                            className="img-fluid rounded-circle"
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                        <div>
                                            <h6 className="mb-0 fw-bold">{medicament.pharmacie?.nom || "Nom de la pharmacie"}</h6>
                                            <p className="text-muted mb-0">{medicament.pharmacie?.adresse || "Adresse non disponible"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section des médicaments similaires */}
                    <div className="similar-products mt-5">
                        <h3 className="mb-4 fw-bold montserrat-normal">Vous pourriez aussi aimer</h3>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                            {medicamentsSimilaires.map((medicament) => (
                                <div key={medicament.id} className="col">
                                    <div className="card h-100 shadow-sm border-0">
                                        <img
                                            src={medicament.image_principale || "/images/default-medicament.jpg"}
                                            alt={medicament.nom || "Médicament"}
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title fw-bold montserrat-normal mb-2">
                                                {medicament.nom || "Nom du médicament"}
                                            </h5>
                                            <p className="card-text text-muted montserrat-normal mb-3">
                                                {medicament.prix || "0"} XOF
                                            </p>
                                            <button
                                                className="btn btn-outline-primary mt-auto"
                                                onClick={() =>
                                                    Inertia.visit(`/pharmacie-sante/medicaments/details/${medicament.slug}`)
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
            <PharmacieFooter />
        </>
    );
}
