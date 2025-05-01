import React from "react";
import { Head, Link } from "@inertiajs/react";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import { Inertia } from "@inertiajs/inertia";
import { useRestaurantPanier } from "../Context/RestaurantPanierContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResultatsRecherche({ resultats, query }) {
    const { ajouterAuPanier } = useRestaurantPanier();
     // Fonction pour rediriger vers la page de détails du repas
      const handleViewRepas = (repas) => {
        Inertia.visit(`/commande-repas/repas/${repas.slug}/details`);
      };

      const handleAddToCart = (repas) => {
          const repasData = {
            repas_id: repas.id, // Utilisez l'ID du repas
            variation_id: null, // Si vous avez des variations, vous pouvez les ajouter ici
            quantite: 1, // Quantité par défaut
          };

          ajouterAuPanier(repasData)
            .then(() => {
              toast.success(`${repasData.quantite} x ${repas.title} a été ajouté au panier.`, {
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
      <Head title={`Résultats pour "${query}"`} />
      <NavBarResto />
      <section className="resultats-recherche">
        <div className="container my-4">
          <h2 className="montserrat-normal fw-bold mb-4">
            Résultats pour "{query}"
          </h2>

          {/* Affichage des résultats */}
          <div className="row g-3">
            {resultats.data.length > 0 ? (
              resultats.data.map((repas, index) => (
                <div className="col-6 col-md-4 col-lg-3" key={index}>
                  <div
                    className="card shadow-sm"
                    style={{
                      height: "100%",
                      border: "none",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Image du repas */}
                    <img
                      src={repas.photo || "/images/default-repas.jpg"}
                      alt={repas.nom}
                      className="card-img-top"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => Inertia.visit(`/commande-repas/repas/${repas.slug}/details`)}
                    />

                    {/* Contenu de la carte */}
                    <div className="card-body">
                      <h6
                        className="card-title fw-bold text-truncate mb-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {repas.nom}
                      </h6>

                      {/* Informations du restaurant */}
                      <div className="d-flex align-items-center">
                        <img
                          src={repas.restaurant.photo_restaurant || "/images/default-restaurant.jpg"}
                          alt={repas.restaurant.nom}
                          className="rounded-circle me-2"
                          style={{
                            width: "24px",
                            height: "24px",
                            objectFit: "cover",
                          }}
                          loading="lazy"
                          onClick={() => handleViewRepas(repas)}
                        />
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.8rem" }}
                        >
                          {repas.restaurant.nom}
                        </span>
                      </div>

                      {/* Prix */}
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span
                          className="text-primary fw-bold"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {repas.prix} XOF
                        </span>
                        <button
                          className="btn btn-outline-success btn-sm"
                          style={{
                            height: "24px",
                            width: "24px",
                            padding: "0",
                            borderRadius: "50%",
                          }}
                          onClick={() => handleAddToCart(repas)}
                        >
                          <i className="bi bi-plus" style={{ fontSize: "1rem" }}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">Aucun résultat trouvé.</p>
            )}
          </div>

          {/* Pagination */}
          {resultats.links && (
            <div className="d-flex justify-content-center mt-4">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  {resultats.links.map((link, index) => (
                    <li
                      key={index}
                      className={`page-item ${link.active ? "active" : ""} ${
                        link.url ? "" : "disabled"
                      }`}
                    >
                      <Link
                        href={link.url || "#"}
                        className="page-link"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
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
