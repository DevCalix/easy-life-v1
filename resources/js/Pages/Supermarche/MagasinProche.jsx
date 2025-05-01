import MarketFooter from '@/Layouts/Supermarche/global/MarketFooter';
import MarketNavbar from '@/Layouts/Supermarche/global/MarketNavbar';
import { Inertia } from '@inertiajs/inertia';
import React from 'react';

const MagasinProche = ({ products }) => {
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
            <div className="container my-5">
                <h1 className="text-center mb-4 poppins-bold">Nos Produits</h1>
                <hr/>
                <div className="row g-4">
                    {products.map((product, index) => (
                        <div key={index} className="col-6 col-md-3">
                            <div className="product-card border rounded shadow-sm p-3 text-center bg-light">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="img-fluid mb-3"
                                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                                />
                                <h5 className="product-name fw-bold text-truncate">{product.name}</h5>
                                <p className="price text-primary fw-bold mt-2">{product.price}</p>

                                {/* Boutons */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-sm btn-primary"
                                    onClick={() => handleViewProduct(product)}
                                    >Commander</button>
                                    <button className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleAddToCart(product)}>
                                        <i className="bi bi-cart-plus"></i>
                                    </button>
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

export default MagasinProche;
