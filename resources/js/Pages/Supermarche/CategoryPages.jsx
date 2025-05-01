import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import { Inertia } from "@inertiajs/inertia";
import React from "react";

const CategoryPage = ({categoryName, products }) => {
    // Redirige vers la page du produit
    const handleViewProduct = (product) => {
        Inertia.visit(`/supermarche/product/${product.name}`);
    };

    // Ajoute un produit au panier (fonctionnalité simplifiée)
    const handleAddToCart = (product) => {
        console.log("Ajouté au panier :", product.name);
    };

    return (
        <>
            <MarketNavbar />
            <div className="container py-5">
                {/* Titre de la catégorie */}
                <h1 className="text-center mb-4 poppins-bold">{categoryName}</h1>
                <div className="row g-3">
                    {products.map((product, index) => (
                        <div className="col-6 col-md-2 col-sm-2" key={index}>
                            {/* Card Produit */}
                            <div className="card h-100 shadow-sm">
                                {/* Image */}
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{
                                        maxHeight: "200px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => handleViewProduct(product)}
                                />
                                {/* Contenu de la carte */}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-center poppins-medium">
                                        {product.name}
                                    </h5>
                                    <p className="card-text text-center text-muted">
                                        {product.price}
                                    </p>
                                    {/* Boutons */}
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => handleViewProduct(product)}
                                        >
                                            Commander
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => handleAddToCart(product)}
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
            <MarketFooter />
        </>
    );
};

export default CategoryPage;
