import React from "react";
import { Head } from "@inertiajs/react";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";

export default function TousLesRestaurantsProches({ restaurantsProches = [] }) {
  return (
    <>
      <Head title="Tous les restaurants proches" />
      <NavBarResto />
      <div className="container my-4">
        <h2 className="montserrat-normal fw-bold mb-4">Tous les restaurants proches</h2>
        <div className="row g-3">
          {restaurantsProches.map((restaurant, index) => (
            <div key={index} className="col-md-4">
              <div className="card shadow-sm">
                <img
                  src={restaurant.photo_restaurant || "/images/default-restaurant.jpg"}
                  alt={restaurant.nom}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{restaurant.nom}</h5>
                  <p className="text-muted">{restaurant.adresse}</p>
                  <p className="text-warning fw-bold">{restaurant.rating} ★</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PiedDePageResto />
    </>
  );
}
