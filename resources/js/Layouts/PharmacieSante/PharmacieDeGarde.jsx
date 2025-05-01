import React from "react";

const PharmacieDeGarde = ({ pharmacieDeGarde = [] }) => {

  // Fonction pour faire défiler le carousel
  const handleScroll = (direction) => {
    const carousel = document.querySelector(".pharmacies-carousel");
    const scrollAmount = direction === "left" ? -300 : 300;

    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="container my-2 position-relative montserrat" id="pharmacie-proche">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-bold mb-4">Pharmacies de Garde</h6>
        <a href="/pharmacie-sante/pharmacies-de-garde" className="btn btn-outline-success btn-sm fs-6">
          Voir tout
        </a>
      </div>
      <hr/>

      {/* Carousel des pharmacies */}
      <div
        className="d-flex overflow-auto pharmacies-carousel gap-4 px-3"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {pharmacieDeGarde.map((pharmacie, index) => (
          <div
            className="card flex-shrink-0 position-relative"
            key={index}
            style={{
              width: "300px",
              scrollSnapAlign: "start",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={pharmacie.image_principale}
              alt={pharmacie.image_principale}
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h6 className="card-title fw-bold">{pharmacie.nom}</h6>
              <p className="card-text">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                {pharmacie.adresse}
              </p>
              {/* <p className="card-text">
                <i className="bi bi-telephone-fill text-success me-2"></i>
                {pharmacie.telephone}
              </p> */}
              {/* Heures d'ouverture et rating sur la même ligne */}
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  <i className="bi bi-clock-fill text-warning me-2"></i>
                  {pharmacie.heures_ouverture}
                </span>
                <span className="badge bg-primary" style={{ fontSize: "14px", padding: "5px 10px" }}>
                  <i className="bi bi-star-fill text-warning me-1"></i>
                  {pharmacie.note}
                </span>
              </div>
              <div className="mt-2">
                <a
                    href={`/pharmacie-sante/info-pharmacies/${pharmacie.id}`}
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary w-100"
                    >
                    Découvrir
                </a>
              </div>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacieDeGarde;
