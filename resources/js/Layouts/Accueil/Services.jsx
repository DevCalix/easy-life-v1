import React from "react";
import "../../../css/accueilStyle/services.css";

const ServicesSection = () => {
  return (
    <section id="services" className="py-2 servicesSection">
      <div className="container">
        <h2 className="text-center mb-2 sectionTitle montserrat py-2">
          Découvrez Nos Services
        </h2>
        <div className="row g-1">
          {services.map((service, index) => (
            <div className="col-6 col-md-4" key={index}> {/* Trois colonnes par ligne */}
              <div className="card shadow-sm h-100 serviceCard">
                <div className="card-body text-center d-flex flex-column align-items-center">
                  <div className="mb-3 d-flex justify-content-center align-items-center rounded-circle iconContainer">
                    <i className={`${service.icon}`} />
                  </div>
                  <h5 className="serviceTitle">{service.title}</h5>
                  <a href={service.link} className="btn btn-success btnAction poppins-medium">
                    <span>{service.cta}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Données des services
const services = [
  {
    title: "Repas",
    icon: "fas fa-utensils",
    link: "/commande-repas",
    cta: "Commander",
  },
  {
    title: "SuperMarché",
    icon: "fas fa-shopping-cart",
    link: "/supermarche",
    cta: "Courses",
  },
  {
    title: "Médicaments",
    icon: "fas fa-pills",
    link: "/pharmacie-sante",
    cta: "Commander",
  },
  {
    title: "Hôtel",
    icon: "fas fa-bed",
    link: "/reservation-hotel",
    cta: "Réserver",
  },
  {
    title: "Chauffeur",
    icon: "fas fa-car",
    link: "/commande-vtc",
    cta: "Commander",
  },
  {
    title: "Ticket de Bus",
    icon: "fas fa-bus",
    link: "/reservation-bus",
    cta: "Réserver",
  },
];

export default ServicesSection;
