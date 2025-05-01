import React from "react";
import "../../../../css/Restaurant/RestoPopulaire.css";
import { Inertia } from "@inertiajs/inertia";

export default function RestoPopulaire({ restaurantsPopulaires = [] }) {

  return (
    <section className="popular-restaurants">
      <div className="container my-2 montserrat-normal">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="montserrat-normal fw-bold">Restaurants populaires</h2>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => Inertia.visit(route('restaurants-populaires.tous'))}
          >
            Voir tout
          </button>
        </div>
        <div className="d-flex overflow-auto gap-2 custom-scroll">
          {restaurantsPopulaires.map((restaurant, index) => (
            <div key={index} className="restaurant-card">
              <div className="card shadow-sm">
                <img
                  src={restaurant.photo_restaurant}
                  alt={restaurant.nom}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title montserrat">{restaurant.nom}</h5>
                  <p className="text-muted montserrat">{restaurant.adresse}</p>
                  <div className="d-flex justify-content-center align-items-center montserrat-normal">
                    <span className="badge bg-warning text-dark me-2">
                      {restaurant.rating} ★
                    </span>
                    <button
                        className="btn btn-sm montserrat-normal"
                        style={{ backgroundColor: "#F9690E", color: "#fff" }}
                        onClick={() => Inertia.visit(route('restaurant.menu', restaurant.id))}
                    >
                    Decouvrir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
