import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";

const SupermarcheProduits = () => {
  // Données des médicaments
  const produitsData = [
    { image: "/images/SuperMarche/PopularProducts/Banane.webp", name: "Banane Fraîche (1kg)", price: "1 959,69 FCFA", description: "Des bananes mûres et sucrées, idéales pour vos desserts ou smoothies." },
    { image: "/images/SuperMarche/PopularProducts/Eau_Minerale.webp", name: "Eau Minérale (1L)", price: "583,80 FCFA", description: "Une eau pure et rafraîchissante, parfaite pour une hydratation quotidienne." },
    { image: "/images/SuperMarche/PopularProducts/Chocolat_Noir.webp", name: "Chocolat Noir Bio (100g)", price: "2 297,28 FCFA", description: "70% cacao, une explosion de saveurs pour les amateurs de chocolat." },
    { image: "/images/SuperMarche/PopularProducts/Dentifrice.webp", name: "Dentifrice Mentholé (75ml)", price: "1 304,47 FCFA", description: "Une fraîcheur longue durée pour une hygiène buccale impeccable." },
    { image: "/images/SuperMarche/PopularProducts/Lait_Ecreme.webp", name: "Lait Écrémé (1L)", price: "787,16 FCFA", description: "Lait de qualité supérieure, parfait pour vos petits déjeuners." },
    { image: "/images/SuperMarche/PopularProducts/Pomme.webp", name: "Pomme Rouge (1kg)", price: "2 097,41 FCFA", description: "Des pommes croquantes et juteuses, idéales pour une collation saine." },
    { image: "/images/SuperMarche/PopularProducts/Jus_Orange.webp", name: "Jus d'Orange Pressé (500ml)", price: "1 638,79 FCFA", description: "100% naturel, pressé à froid pour préserver les vitamines." },
    { image: "/images/SuperMarche/PopularProducts/Miel.webp", name: "Miel Pur (500g)", price: "3 933,27 FCFA", description: "Miel de haute qualité, parfait pour sucrer vos plats et boissons." },
    { image: "/images/SuperMarche/PopularProducts/Viandes.webp", name: "Viande de Boeuf (500g)", price: "4 585,99 FCFA", description: "Viande fraîche et tendre, idéale pour vos recettes culinaires." },
    { image: "/images/SuperMarche/PopularProducts/Fromage.webp", name: "Fromage Cheddar (200g)", price: "2 945,82 FCFA", description: "Fromage affiné au goût riche et intense." },
    { image: "/images/SuperMarche/Nouveau/Yogurt_Nature.webp", name: "Yaourt Nature (4x125g)", price: "1 632,69 FCFA", description: "Yaourts nature onctueux et savoureux, riches en calcium." },
    { image: "/images/SuperMarche/Nouveau/Cereales_Fitness.webp", name: "Céréales Fitness Chocolat (375g)", price: "2 616,75 FCFA", description: "Des céréales croquantes pour un petit déjeuner énergique." },
    { image: "/images/SuperMarche/Nouveau/Jus_Pomme_Bio.webp", name: "Jus de Pomme Bio (1L)", price: "1 832,21 FCFA", description: "Un jus de pomme bio sans conservateurs, pour un goût naturel." },
    { image: "/images/SuperMarche/Nouveau/Eau_Gazeuse.webp", name: "Eau Gazeuse Perrier (1L)", price: "649,92 FCFA", description: "Eau gazeuse désaltérante, parfaite pour accompagner vos repas." },
    { image: "/images/SuperMarche/Nouveau/Biscuits_Granola.webp", name: "Biscuits Granola (300g)", price: "1 698,19 FCFA", description: "Des biscuits croustillants avec des pépites de chocolat." },
    { image: "/images/SuperMarche/Nouveau/Chips_Legumes.webp", name: "Chips de Légumes (150g)", price: "1 959,69 FCFA", description: "Une alternative saine et savoureuse aux chips classiques." },
    { image: "/images/SuperMarche/Nouveau/Fromage_Brie.webp", name: "Fromage Brie (200g)", price: "2 289,66 FCFA", description: "Fromage à pâte molle avec une saveur douce et crémeuse." },
    { image: "/images/SuperMarche/Nouveau/Lait_Almande.webp", name: "Lait d'Amande (1L)", price: "1 436,14 FCFA", description: "Lait végétal idéal pour vos recettes et boissons." },
    { image: "/images/SuperMarche/Nouveau/Soupe_Butternut.webp", name: "Soupe Butternut Bio (500ml)", price: "2 616,75 FCFA", description: "Une soupe bio onctueuse pour vos repas d'hiver." },
    { image: "/images/SuperMarche/Nouveau/Lingettes_Bio.webp", name: "Lingettes Écologiques (50pcs)", price: "2 158,22 FCFA", description: "Lingettes respectueuses de l'environnement, pratiques et douces." },
];


  // États pour recherche et filtre
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrescription, setFilterPrescription] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(produitsData);

  // Fonction pour rechercher et filtrer les médicaments
  const handleSearch = () => {
    const results = produitsData.filter((product) => {
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
            <h6
              className="card-title fw-bold text-truncate mb-2"
              style={{ fontSize: "0.6rem" }}
            >
              {product.name}
            </h6>

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
                  fontSize: "0.5rem",
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
