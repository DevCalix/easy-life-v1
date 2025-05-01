import { Link, usePage } from "@inertiajs/react";
import React, { useRef } from "react";
import "../../../../css/SuperMarche/marketCategory.css";

export default function MarketCategoryCarousel({ categories = [] }) {
    const carouselRef = useRef(null);
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-light position-relative montserrat">
            <hr />
            <div className="container">
                <h2 className="fw-bold mb-1 fs-6">Explorez par catégories</h2>
                <div className="d-flex align-items-center position-relative">
                    {/* Flèche gauche */}
                    <button
                        className="carousel-control-prev custom-arrow shadow"
                        onClick={scrollLeft}
                        style={{ left: "-10px" }}
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>

                    {/* Liste des catégories */}
                    <div
                        className="d-flex overflow-auto gap-2 custom-scroll align-items-center py-1"
                        ref={carouselRef}
                    >
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                href={`/supermarche/produit-par-categories/${category.slug}`}
                                className="category-card flex-shrink-0 text-center shadow-sm bg-white rounded text-decoration-none"
                                style={{ minWidth: "100px", maxWidth: "120px" }}
                            >
                                <div className="p-1">
                                    <img
                                        src={category.image_url ? `${appUrl}${category.image_url}` : "/images/default-category.jpg"} // Utilisez l'image de la catégorie
                                        alt={category.nom}
                                        className="img-fluid mb-3"
                                        style={{
                                            width: "100%",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <h6 className="text-dark fw-semibold">{category.nom}</h6>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Flèche droite */}
                    <button
                        className="carousel-control-next custom-arrow shadow"
                        onClick={scrollRight}
                        style={{ right: "-10px" }}
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
            <hr />
        </section>
    );
}
