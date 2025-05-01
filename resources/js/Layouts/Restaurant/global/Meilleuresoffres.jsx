import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../css/Restaurant/meilleuresoffresResto.css";
import { useRestaurantPanier } from "@/Pages/CommandeRepas/Context/RestaurantPanierContext";

export default function BestOffers({ meilleuresOffres }) {
  const [cart, setCart] = useState([]);
  // Récupérer les fonctions du panier
  const { ajouterAuPanier } = useRestaurantPanier();

  // Mapper les données dynamiques pour correspondre à la structure attendue
  const formattedOffers = meilleuresOffres.map((offer) => ({
    id: offer.id, // Assurez-vous que l'ID du repas est inclus
    image: offer.photo, // Utilisez le champ photo du modèle Repas
    title: offer.nom, // Utilisez le champ nom du modèle Repas
    description: offer.description, // Utilisez le champ description du modèle Repas
    price: `${offer.prix_reduit} FCFA`, // Utilisez le champ prix_reduit
    originalPrice: `${offer.prix} FCFA`, // Utilisez le champ prix
    offer: `${offer.reduction}% de réduction`, // Utilisez le champ reduction
    slug: offer.slug,
    restaurant: {
      name: offer.restaurant.nom, // Nom du restaurant
      photo: offer.restaurant.photo_restaurant, // Photo du restaurant
    },
  }));

  const handleCommand = (offer) => {
    // Redirige vers la page de détails du repas
    Inertia.visit(`/commande-repas/repas/${offer.slug}/details`);
  };

  // Gérer l'ajout au panier
  const handleAddToCart = (offer) => {
    const repasData = {
      repas_id: offer.id, // Utilisez l'ID du repas
      variation_id: null, // Si vous avez des variations, vous pouvez les ajouter ici
      quantite: 1, // Quantité par défaut
    };

    ajouterAuPanier(repasData)
      .then(() => {
        toast.success(`${repasData.quantite} x ${offer.title} a été ajouté au panier.`, {
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
        console.error("Erreur lors de l'ajout au panier :", error.response || error); // Afficher la réponse du serveur
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

  return (
    <>
        <section className="best-offers bg-light">
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold">Meilleures Offres</h6>
            <button
                className="btn btn-outline-primary btn-sm montserrat-regulier"
                onClick={() => Inertia.visit(route("meilleures-offres.toutes"))}
            >
                Voir tout
            </button>
            </div>
            <div className="d-flex overflow-auto gap-2 py-2 custom-scroll">
            {formattedOffers.map((offer, index) => (
                <div
                key={index}
                className="card shadow-sm border-0 rounded"
                style={{ minWidth: "200px", maxWidth: "200px" }}
                >
                <img
                    src={offer.image}
                    alt={offer.title}
                    className="card-img-top"
                    style={{
                    height: "120px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    }}
                />
                <div className="card-body text-center p-2">
                    {/* Informations du restaurant */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                    <img
                        src={offer.restaurant.photo}
                        alt={offer.restaurant.name}
                        style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        }}
                    />
                    <span className="montserrat-normal" style={{ fontSize: "0.8rem" }}>
                        {offer.restaurant.name}
                    </span>
                    </div>

                    {/* Informations du repas */}
                    <h5 className="card-title montserrat-normal mb-1" style={{ fontSize: "0.9rem" }}>
                    {offer.title}
                    </h5>

                    <div className="d-flex justify-content-between align-items-center">
                    <span
                        className="text-danger text-decoration-line-through montserrat-normal"
                        style={{ fontSize: "0.8rem" }}
                    >
                        {offer.originalPrice}
                    </span>
                    <span className="fw-bold text-success" style={{ fontSize: "0.9rem" }}>
                        {offer.price}
                    </span>
                    </div>
                    <span
                    className="badge mt-1 montserrat-normal"
                    style={{ backgroundColor: "#F9690E", color: "#fff", fontSize: "0.75rem" }}
                    >
                    {offer.offer}
                    </span>

                    {/* Boutons Commander et Ajouter au panier */}
                    <div className="d-flex justify-content-between align-items-center mt-2">
                    <button
                        className="btn btn-sm montserrat-normal"
                        style={{
                        backgroundColor: "#F9690E",
                        color: "#fff",
                        fontSize: "0.8rem",
                        padding: "0.25rem 0.5rem",
                        }}
                        onClick={() => handleCommand(offer)}
                    >
                        Commander
                    </button>

                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleAddToCart(offer)}
                        style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        borderRadius: "50%",
                        fontSize: "0.8rem",
                        padding: "0.25rem 0.5rem",
                        }}
                    >
                        <i className="bi bi-cart-plus"></i>
                    </button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
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
    </>
  );
}
