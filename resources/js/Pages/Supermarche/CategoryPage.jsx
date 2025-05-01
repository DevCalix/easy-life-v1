import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";

const SupermarcheProduits = ({categoryName, products }) => {
  // États pour recherche et filtre
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrescription, setFilterPrescription] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Fonction pour rechercher et filtrer les médicaments
  const handleSearch = () => {
    const results = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterPrescription === "all" ||
        (filterPrescription === "requires" && product.requiresPrescription) ||
        (filterPrescription === "no-requires" && !product.requiresPrescription);

      return matchesSearch && matchesFilter;
    });

    setFilteredProducts(results);
  };
   // Redirige vers la page du produit
      const handleViewProduct = (product) => {
          Inertia.visit(`/supermarche/product/${product.name}`);
      };

  return (
    <>
      {/* <PharmaNavbar/> */}
      <div className="container my-2 montserrat-normal">
        <h6 className="text-center fw-bold">{categoryName}</h6>
        {/* Barre de recherche et filtres */}
        <div className="d-flex flex-row gap-1 mb-2 align-items-center">
        {/* Barre de recherche */}
        <input
            type="text"
            className="form-control"
            placeholder="Rechercher un produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Bouton avec une icône uniquement */}
        <button className="btn btn-primary" onClick={handleSearch}>
            <i className="fas fa-search"></i> {/* Icône Font Awesome */}
        </button>
        </div>



        {/* Grille des médicaments */}
        <div className="row g-1">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product, index) => (
      <div className="col-4 col-md-3" key={index}>
        <div
          className="card position-relative"
          style={{
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            height: "180px", // Ajustement de la hauteur globale de la carte
          }}
        >
          {/* Badge pour les médicaments nécessitant une ordonnance */}
          {product.requiresPrescription && (
            <span
              className="badge bg-danger position-absolute"
              style={{ top: "5px", left: "5px", fontSize: "10px" }}
            >
              O
            </span>
          )}

          {/* Image du médicament */}
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{
              height: "100px",
              objectFit: "cover",
              cursor:"pointer"
            }}
            onClick={() => handleViewProduct(product)}
          />

          {/* Contenu de la carte */}
          <div className="card-body p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <h5
              className="card-title fw-bold text-truncate mb-2"
              style={{ fontSize: "0.7rem" }}
            >
              {product.name}
            </h5>

            {/* Section prix + bouton "+" */}
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                width: "100%",
                marginTop: "auto", // Pousse cette section en bas
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
                {product.price}
              </span>

              {/* Bouton "+" */}
              <button
                className="btn btn-outline-success btn-sm d-flex justify-content-center align-items-center"
                style={{
                  height: "24px",
                  width: "24px",
                  padding: "0",
                  borderRadius: "50%",
                  marginRight: "1px", // Collé avec un léger espace de 5px
                }}
              >
                <i className="bi bi-plus" style={{ fontSize: "1rem" }}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-muted">Aucun médicament trouvé.</p>
  )}
</div>

      </div>
      <MarketFooter/>
    </>
  );
};

export default SupermarcheProduits;
