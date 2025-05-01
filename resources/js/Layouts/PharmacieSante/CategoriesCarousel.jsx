import React from "react";
import { Link } from "@inertiajs/react";

const CategoriesCarousel = ({ categories = [] }) => {
    // Fonction pour faire défiler le carrousel
    const handleScroll = (direction) => {
        const carousel = document.querySelector(".categories-carousel");
        const scrollAmount = direction === "left" ? -300 : 300;

        carousel.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="container my-4 position-relative">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Catégories</h5>
                <div>
                    <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => handleScroll("left")}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleScroll("right")}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
            <hr />

            {/* Carrousel des catégories */}
            <div
                className="d-flex overflow-auto categories-carousel gap-3 px-2"
                style={{
                    scrollSnapType: "x mandatory",
                }}
            >
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        href={route('medicaments.par-categorie', category.slug)}
                        className="card flex-shrink-0 position-relative text-decoration-none"
                        style={{
                            width: "200px",
                            scrollSnapAlign: "start",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <img
                            src={category.image_principale || "/images/default-category.jpg"}
                            alt={category.nom}
                            className="card-img-top"
                            style={{
                                height: "150px",
                                objectFit: "cover",
                            }}
                        />
                        <div className="card-body text-center">
                            <h6 className="card-title fw-bold mb-0 text-dark">{category.nom}</h6>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoriesCarousel;
