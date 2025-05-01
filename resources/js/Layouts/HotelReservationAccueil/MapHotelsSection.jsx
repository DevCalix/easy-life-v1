import React, { useEffect } from "react";
import L from "leaflet"; // Import de Leaflet
import "leaflet/dist/leaflet.css"; // Import des styles Leaflet
import "../../../css/hotelReservation/MapHotelsSection.css";

// Icône personnalisée pour les hôtels
const hotelIcon = L.icon({
  iconUrl: "/images/icons/hotel-marker.png", // Remplacez avec le chemin de votre icône
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const hotels = [
  {
    name: "Hôtel Luxe Paris",
    latitude: 48.8566,
    longitude: 2.3522,
    description: "Un hôtel 5 étoiles au cœur de Paris.",
  },
  {
    name: "Résidence Riviera",
    latitude: 48.8666,
    longitude: 2.3522,
    description: "Des appartements confortables et modernes.",
  },
  {
    name: "Villa Bord de Mer",
    latitude: 48.8466,
    longitude: 2.3622,
    description: "Une villa luxueuse avec vue sur la mer.",
  },
  {
    name: "Auberge Camélia",
    latitude: 48.8566,
    longitude: 2.3322,
    description: "Une auberge charmante et abordable.",
  },
  {
    name: "Chalet Montagne",
    latitude: 48.8666,
    longitude: 2.3422,
    description: "Un chalet cosy pour vos séjours à la montagne.",
  },
];

const MapHotelsSection = () => {
  useEffect(() => {
    // Initialisation de la carte
    const map = L.map("hotels-map").setView([48.8566, 2.3522], 13); // Coordonnées par défaut (Paris)

    // Ajouter une couche de tuiles (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Ajouter les hôtels comme marqueurs
    hotels.forEach((hotel) => {
      L.marker([hotel.latitude, hotel.longitude], { icon: hotelIcon })
        .addTo(map)
        .bindPopup(`
          <div>
            <h6>${hotel.name}</h6>
            <p>${hotel.description}</p>
          </div>
        `);
    });

    return () => {
      map.remove(); // Nettoyage
    };
  }, []);

  return (
    <section className="map-hotels-section py-1">
      <div className="container">
        <h2 className="montserrat-normal mb-4 fw-bold">
          Hôtels dans votre ville
        </h2>
        {/* Conteneur de la carte */}
        <div
          id="hotels-map"
          style={{
            height: "500px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        ></div>
      </div>
    </section>
  );
};

export default MapHotelsSection;
