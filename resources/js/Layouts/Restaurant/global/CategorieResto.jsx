import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import '../../../../css/Restaurant/categorieResto.css';

export default function CategorieResto({ categories = [] }) {

    return (
        <section className="bg-light">
            <div className="container">
                <h2 className="montserrat-normal fw-bold my-2">Explorez par catégories</h2>
                <div className="d-flex overflow-auto gap-2 custom-scroll align-items-center">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/commande-repas/repas-par-categories/${category.slug}`}
                            className="category-card flex-shrink-0 text-center shadow-sm bg-white rounded text-decoration-none"
                            style={{ minWidth: "150px", maxWidth: "180px" }}
                        >
                            <div className="p-1">
                                <img
                                    src={`${category.image}`} // Assurez-vous que le chemin est correct
                                    alt={category.nom}
                                    className="img-fluid mb-3"
                                    style={{
                                        width: "100%",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                                <h6 className="text-dark montserrat">{category.nom}</h6>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
