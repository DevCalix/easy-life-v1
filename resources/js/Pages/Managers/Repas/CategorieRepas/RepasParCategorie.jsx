import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRestaurantPanier } from "@/Pages/CommandeRepas/Context/RestaurantPanierContext";

export default function RepasParCategorie({ categorie, repas = [] }) {
  // Récupérer les fonctions du panier
  const { ajouterAuPanier } = useRestaurantPanier();

  const handleCommand = (repasItem) => {
    // Redirige vers la page produit
    Inertia.visit(`/commande-repas/repas/${repasItem.slug}/details`);
  };

  // Gérer l'ajout au panier
  const handleAddToCart = (repasItem) => {
    if (!repasItem?.id || !repasItem?.nom) {
      console.error("Données du repas invalides :", repasItem);
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
      repas_id: repasItem.id, // Utilisez l'ID du repas
      variation_id: null, // Si vous avez des variations, vous pouvez les ajouter ici
      quantite: 1, // Quantité par défaut
    };

    ajouterAuPanier(repasData)
      .then(() => {
        toast.success(`${repasData.quantite} x ${repasItem.nom} a été ajouté au panier.`, {
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

  return (
    <>
      <Head title={categorie.nom} />
      <NavBarResto />
      <section className="py-2">
        <div className="container">
          <h2 className="montserrat-normal fw-bold mb-1 text-center">{categorie.nom}</h2>
          <hr />
          <div className="row gx-2">
            {repas.map((repasItem, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3 mb-2">
                {/* Affichage des cartes pour les produits */}
                <div className="card shadow-sm h-100">
                  <img
                    src={repasItem.photo || "/images/default-repas.jpg"} // Image par défaut si non définie
                    alt={repasItem.nom}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p className="mb-0 montserrat-normal fw-bold">{repasItem.nom}</p>
                    <p className="text-success fw-bold montserrat-normal">{repasItem.prix} FCFA</p>
                    <div className="mt-3 d-flex justify-content-between align-items-center montserrat-normal">
                      {/* Bouton Commander */}
                      <button
                        className="btn btn-sm"
                        style={{ backgroundColor: "#F9690E", color: "#fff" }}
                        onClick={() => handleCommand(repasItem)}
                      >
                        Acheter
                      </button>

                      {/* Icône Ajouter au panier */}
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleAddToCart(repasItem)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          borderRadius: "50%",
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
      <PiedDePageResto />
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
