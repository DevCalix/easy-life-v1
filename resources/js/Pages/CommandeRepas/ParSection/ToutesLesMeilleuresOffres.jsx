import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRestaurantPanier } from "@/Pages/CommandeRepas/Context/RestaurantPanierContext";

export default function Meilleuresoffres({ meilleuresOffres = [] }) {
     const { ajouterAuPanier } = useRestaurantPanier();
  const handleAddToCart = (offre) => {
      const repasData = {
        repas_id: offre.id, // Utilisez l'ID du repas
        variation_id: null, // Si vous avez des variations, vous pouvez les ajouter ici
        quantite: 1, // Quantité par défaut
      };

      ajouterAuPanier(repasData)
        .then(() => {
          toast.success(`${repasData.quantite} x ${offre.nom} a été ajouté au panier.`, {
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
        <Head title="Nos meilleurs offres"/>
        <NavBarResto/>
        <section className="meilleures-offres">
        <div className="container my-2 montserrat-normal">
            <h1 className="montserrat-normal fw-bold my-3">Nos Meilleures offres</h1>
            <hr/>
            <div className="row g-1">
            {meilleuresOffres.length > 0 ? (
                meilleuresOffres.map((offre, index) => (
                <div className="col-4 col-md-3" key={index}>
                    <div
                    className="card position-relative"
                    style={{
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        height: "180px",
                    }}
                    >
                    {/* Image de l'offre */}
                    <img
                        src={offre.photo || "/images/default-repas.jpg"}
                        alt={offre.nom}
                        className="card-img-top"
                        style={{
                        height: "100px",
                        objectFit: "cover",
                        cursor: "pointer",
                        }}
                        loading="lazy"
                    />

                    {/* Contenu de la carte */}
                    <div className="card-body p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <h6
                        className="card-title fw-bold text-truncate mb-2"
                        style={{ fontSize: "0.6rem" }}
                        >
                        {offre.nom}
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
                            fontSize: "0.5rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            }}
                        >
                            {offre.prix} XOF
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
                            onClick={() => handleAddToCart(offre)}
                        >
                            <i className="bi bi-plus" style={{ fontSize: "1rem" }}></i>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-center text-muted">Aucune offre trouvée.</p>
            )}
            </div>
        </div>
        </section>
        <PiedDePageResto/>
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
