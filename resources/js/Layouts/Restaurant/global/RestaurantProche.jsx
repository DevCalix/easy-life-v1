import React from "react";
import "../../../../css/Restaurant/RestaurantProche.css"

export default function RestaurantProche() {
  const nearbyRestaurants = [
    {
      image: "/images/LogoPartenaire/La_Bella_Pizza.webp",
      name: "La Bella Pizza",
      distance: "1.2 km",
      rating: 4.7,
      type: "Italien",
    },
    {
      image: "/images/LogoPartenaire/Sushi_Zen.webp",
      name: "Sushi Zen",
      distance: "0.8 km",
      rating: 4.9,
      type: "Japonais",
    },
    {
      image: "/images/LogoPartenaire/Burger_King.webp",
      name: "Burger King",
      distance: "1.5 km",
      rating: 4.6,
      type: "Fast Food",
    },
    {
      image: "/images/LogoPartenaire/Raising_Canes.webp",
      name: "Raising Canes",
      distance: "0.5 km",
      rating: 4.8,
      type: "Végétarien",
    },
    {
      image: "/images/LogoPartenaire/Swahili_grill.webp",
      name: "Swahili Grill",
      distance: "1.1 km",
      rating: 4.5,
      type: "Desserts",
    },
  ];

  return (
    <section className="nearby-restaurants">
      <div className="container">
        <hr/>
        <h2 className="fw-bold mb-4 montserrat-normal">Restaurants proches</h2>
        <div className="d-flex overflow-auto gap-2">
          {nearbyRestaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-card" >
              <div className="card shadow-sm border-0 rounded">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                />
                <div className="card-body text-center montserrat">
                  <h5 className="card-title fw-bold" style={{ fontSize:"1rem" }}>{restaurant.name}</h5>
                  <p className="text-muted montserrat">
                    {restaurant.type} • {restaurant.distance}
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="badge bg-warning text-dark me-2">
                      {restaurant.rating} ★
                    </span>
                  <button className="btn btn-sm ms-2" style={{ backgroundColor: "#F9690E", color: "#fff"}}>
                    Voir le menu
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
