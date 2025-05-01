import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import { useRestaurantPanier } from "@/Pages/CommandeRepas/Context/RestaurantPanierContext";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";

export default function RestaurantDestination({ restaurant = {}, repas = [] }) {
  // Récupérer les fonctions du panier
  const { ajouterAuPanier } = useRestaurantPanier();
  // Trouver la méta dont la clé est "whatsapp"
  const whatsappMeta = restaurant.metas.find(meta => meta.cle === "whatsapp");
  // Construire le lien WhatsApp si une valeur est trouvée
  const predefinedMessage = encodeURIComponent(`Bonjour, je suis intéressé par vos produits. Pouvez-vous m'en dire plus ?`);
  const whatsappLink = whatsappMeta ? `https://wa.me/${whatsappMeta.valeur}?text=${predefinedMessage}` : "#";

  // Gérer la vue d'un repas
  const handleViewRepas = (repas) => {
    Inertia.visit(`/commande-repas/repas/${repas.slug}/details`);
  };

  // Gérer l'ajout d'un repas au panier
  const handleAjouterAuPanier = (repas, quantity) => {
    if (!repas?.id || !repas?.nom) {
      console.error("Données du repas invalides :", repas);
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
      repas_id: repas.id, // Utilisez l'ID du repas
      variation_id: null, // Si vous avez des variations, vous pouvez les ajouter ici
      quantite: quantity, // Quantité définie
    };

    console.log("Données envoyées :", repasData); // Afficher les données envoyées

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

  return (
    <>
      <Head title={`Repas de ${restaurant.nom || "Restaurant"}`} />
      <NavBarResto />

      {/* En-tête du restaurant */}
      <div className="container my-4">
        <div className="card shadow-sm border-0">
          <div className="row g-0 align-items-center">
            {/* Image du restaurant */}
            <div className="col-md-3 text-center p-3">
              <img
                src={restaurant.photo_restaurant || "/images/default-restaurant.jpg"}
                alt={restaurant.nom || "Restaurant"}
                className="img-fluid"
                style={{ width: "150px", objectFit: "cover" }}
              />
            </div>

            {/* Informations du restaurant */}
            <div className="col-md-9 p-3 rounded" style={{ backgroundColor: "#FF6E0E" }}>
              <h6 className="fw-bold mb-3 text-white">{restaurant.nom || "Restaurant"}</h6>
              <div className="d-flex flex-column gap-2 montserrat-normal">
                <p className="text-white mb-0">
                  <i className="bi bi-geo-alt-fill me-2 text-white"></i>
                  {restaurant.adresse || "Adresse non disponible"}
                </p>
                <div className="d-flex align-items-center">
                    <i className="bi bi-telephone-fill me-1 text-primary fs-6"></i>
                    <a href={`tel:${restaurant.numero_telephone}`} className="text-decoration-none fw-bold text-dark">
                        {restaurant.numero_telephone}
                    </a>
                    {/* Bouton Réserver */}
                    <Link href={`/commande-repas/reservations/create`} className="btn btn-dark m-1">
                        Réserver
                    </Link>
                    {whatsappMeta ? (
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success m-1">
                            <i className="bi bi-whatsapp"></i>
                        </a>
                    ) : (
                    ''
                    )}
                </div>

                <p className="text-white mb-0">
                  <i className="bi bi-clock-fill me-2 text-white"></i>
                  {restaurant.horaires_ouverture || "Horaires non disponibles"}
                </p>
                <p className="text-white mb-0">
                  <i className="bi bi-star-fill me-2 text-warning"></i>
                  {restaurant.rating || "0"} / 5
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des repas */}
      <div className="container my-2 montserrat-normal">
        {/* Grille des repas */}
        <div className="row g-1">
          {repas.length > 0 ? (
            repas.map((repas, index) => (
              <div className="col-4 col-md-3" key={index}>
                <div
                  className="card position-relative"
                  style={{
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    height: "180px",
                  }}
                >
                  {/* Image du repas */}
                  <img
                    src={repas.photo || "/images/default-repas.jpg"}
                    alt={repas.nom || "Repas"}
                    className="card-img-top"
                    style={{
                      height: "100px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => handleViewRepas(repas)}
                    loading="lazy"
                  />

                  {/* Contenu de la carte */}
                  <div
                    className="card-body p-2"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <h6
                      className="card-title fw-bold text-truncate mb-2"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {repas.nom || "Nom du repas"}
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
                        className="text-white fw-bold"
                        style={{
                          fontSize: "0.7rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {repas.prix || "0"} XOF
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
                        onClick={() => handleAjouterAuPanier(repas, 1)}
                        aria-label={`Ajouter ${repas.nom} au panier`}
                      >
                        <i className="bi bi-plus" style={{ fontSize: "1rem" }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-white">Aucun repas trouvé dans ce restaurant.</p>
          )}
        </div>
      </div>
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
