import React from "react";
import { Head } from "@inertiajs/react";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import { Inertia } from "@inertiajs/inertia";

export default function TousLesRestaurantsPopulaires({ restaurantsPopulaires = [] }) {
  return (
    <>
      <Head title="Tous les restaurants populaires" />
      <NavBarResto />
      <section className="restaurants-populaires">
        <div className="container my-2 montserrat-normal">
            <h2 className="montserrat-normal fw-bold my-3">Restaurants populaires</h2>
            <hr/>
            <div className="row g-1">
            {restaurantsPopulaires.length > 0 ? (
                restaurantsPopulaires.map((restaurant, index) => (
                <div className="col-4 col-md-3" key={index}>
                    <div
                    className="card position-relative"
                    style={{
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        height: "180px",
                    }}
                    >
                    {/* Image du restaurant */}
                    <img
                        src={restaurant.photo_restaurant || "/images/default-restaurant.jpg"}
                        alt={restaurant.nom}
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
                        {restaurant.nom}
                        </h6>

                        {/* Section note + bouton "+" */}
                        <div
                        className="d-flex justify-content-between align-items-center"
                        style={{
                            width: "100%",
                            marginTop: "auto",
                        }}
                        >
                        {/* Note */}
                        <span
                            className="text-warning fw-bold"
                            style={{
                            fontSize: "0.5rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            }}
                        >
                            {restaurant.rating} ★
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
                            onClick={() => Inertia.visit(route('restaurant.menu', restaurant.id))}
                        >
                            <i
                                className="bi bi-eye-fill"
                                style={{ fontSize: "1rem", cursor: "pointer" }}
                                title="Voir plus"
                                aria-label="Voir plus"
                            ></i>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-center text-muted">Aucun restaurant trouvé.</p>
            )}
            </div>
        </div>
        </section>
      <PiedDePageResto />
    </>
  );
}
