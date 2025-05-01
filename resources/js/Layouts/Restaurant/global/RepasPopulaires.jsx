import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../css/Restaurant/RepasPopulaires.css";
import { useRestaurantPanier } from "@/Pages/CommandeRepas/Context/RestaurantPanierContext";

export default function RepasPopulaires({ repasPopulaires = [] }) {
  // Récupérer les fonctions du panier
  const { ajouterAuPanier } = useRestaurantPanier();

  const handleCommand = (repas) => {
    // Redirige vers la page du repas
    Inertia.visit(`/commande-repas/repas/${repas.slug}/details`);
  };

  // Gérer l'ajout au panier
  const handleAddToCart = (repas) => {
    const repasData = {
      repas_id: repas.id, // Utilisez l'ID du repas
      variation_id: null, // Si vous avez des variations, vous pouvez les ajouter ici
      quantite: 1, // Quantité par défaut
    };

    ajouterAuPanier(repasData)
      .then(() => {
        toast.success(`${repasData.quantite} x ${repas.nom} a été ajouté au panier.`, {
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
    <section className="popular-dishes" id="popularDishesSection">
      <div className="container">
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="montserrat-normal fw-bold">Plats populaires</h2>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => Inertia.visit(route("plats-populaires.tous"))}
          >
            Voir tout
          </button>
        </div>
        <div className="d-flex overflow-auto gap-2">
          {repasPopulaires.map((repas, index) => (
            <div key={index} className="dish-card">
              <div className="card shadow-sm border-0 rounded">
                <img
                  src={repas.photo || "/images/default-repas.jpg"} // Utiliser l'URL de l'image du repas
                  alt={repas.nom}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title montserrat-normal fw-bold">{repas.nom}</h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-warning text-dark me-2">
                      {repas.rating} ★
                    </span>
                    <span className="montserrat-normal fw-bold text-success">{repas.prix} FCFA</span>
                  </div>

                  {/* Informations du restaurant associé */}
                  <div className="restaurant-info d-flex align-items-center mt-2">
                    {/* Logo du restaurant */}
                    <img
                      src={repas.restaurant.photo_restaurant || "/images/default-restaurant.jpg"}
                      alt={repas.restaurant.nom}
                      className="restaurant-logo"
                      style={{ width: "30px" }}
                    />
                    {/* Nom et note du restaurant */}
                    <div>
                      <p className="mb-0">{repas.restaurant.nom}</p>
                      <p className="mb-0">
                        <i className="bi bi-star-fill me-1 text-warning"></i>
                        {repas.restaurant.rating} / 5
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2 montserrat">
                    {/* Bouton Commander */}
                    <button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#F9690E", color: "#fff" }}
                      onClick={() => handleCommand(repas)}
                    >
                      Acheter
                    </button>

                    {/* Icône Ajouter au panier */}
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleAddToCart(repas)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        borderRadius: "50%", // Ajoute un style circulaire
                      }}
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
