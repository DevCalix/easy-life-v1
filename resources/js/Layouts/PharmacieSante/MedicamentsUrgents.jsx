import { Link } from "@inertiajs/react";
import React from "react";

const MedicamentsUrgents = ({medicamentsUrgents = []}) => {

  // Fonction pour faire défiler le carousel
  const handleScroll = (direction) => {
    const carousel = document.querySelector(".medicaments-carousel");
    const scrollAmount = direction === "left" ? -300 : 300;

    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="container my-2 position-relative montserrat-normal" id="medicaments-urgents">
      {/* Titre avec le bouton "Voir tout" */}
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="fw-bold">Médicaments Urgents</h6>
        <a href="/pharmacie-sante/medicaments-urgents" className="btn btn-outline-primary btn-sm mb-3">Voir tout</a>
      </div>

      {/* Carousel des médicaments */}
      <div
        className="d-flex overflow-auto medicaments-carousel gap-2 px-3"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {medicamentsUrgents.map((medicament, index) => (
        <Link href={route('medicaments.details', medicament.slug)}>
        <div
            className="card flex-shrink-0 position-relative"
            key={index}
            style={{
              width: "300px",
              scrollSnapAlign: "start",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Badge pour les médicaments nécessitant une ordonnance */}
            {medicament.ordonnance_requise == true && (
              <span
                className="badge bg-danger position-absolute"
                style={{ top: "10px", left: "10px", fontSize: "12px" }}
              >
                O
              </span>
            )}
            <img
              src={medicament.image_principale}
              alt={medicament.nom}
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h6 className="card-title fw-bold">{medicament.nom}</h6>
              {/* <p className="card-text text-muted">{medicament.description}</p> */}
              <div className="d-flex justify-content-between align-items-center mt-1">
                <span className="text-primary fw-bold">{medicament.prix}</span>
                <button className="btn btn-success btn-sm">
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
        </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default MedicamentsUrgents;
