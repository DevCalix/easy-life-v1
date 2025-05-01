import React from "react";
import "../../../css/WhyChooseUs.css";
const WhyChooseUs = () => {
  return (

    <section className="section bg-light py-2">
      <hr/>
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Texte principal à gauche */}
          <div className="col-lg-5">
            <div className="">
              <h1 className="mb-4 text-dark poppins-bold">
                Pourquoi Easy Life est-il <br /> votre meilleur choix ?
              </h1>
              <p className="text-muted mb-4 poppins-light">
                Easy Life combine innovation et simplicité pour transformer vos
                tâches quotidiennes en solutions rapides et sans effort. Profitez d'une
                interface intuitive et d'une variété de services conçus pour
                vous offrir un confort inégalé.
              </p>
              <a href="#services" className="btn btn-primary px-4 py-2 poppins-medium">
                Explorez Nos Services
              </a>
            </div>
          </div>

          {/* Cartes des services à droite */}
          <div className="col-lg-6">
            <div className="row g-4">
              {services.map((service, index) => (
                <div
                  className="col-md-6"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="difference-card p-4 rounded bg-white shadow-sm text-center d-flex flex-column align-items-center">
                    <div className="icon mb-3 text-primary ">
                      <i
                        className={service.icon}
                        style={{ fontSize: "40px" }}
                      ></i>
                    </div>
                    <h5 className="fw-bold text-dark poppins-bold">{service.title}</h5>
                    <p className="text-muted small poppins-light">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const services = [
    {
      title: "Commande de Repas",
      description:
        "Découvrez une variété de plats et faites-vous livrer en toute simplicité.",
      icon: "fas fa-utensils",
    },
    {
      title: "Commande de Médicaments",
      description:
        "Obtenez vos médicaments avec une livraison rapide et fiable.",
      icon: "fas fa-pills",
    },
    {
      title: "Courses en Ligne",
      description:
        "Faites vos courses facilement et choisissez entre livraison ou retrait.",
      icon: "fas fa-shopping-cart",
    },
    {
      title: "Réservation d'Hôtel",
      description: "Réservez les meilleurs hôtels avec des offres exclusives.",
      icon: "fas fa-bed",
    },
    {
      title: "Service de VTC",
      description:
        "Réservez votre trajet en toute simplicité et suivez votre chauffeur.",
      icon: "fas fa-car",
    },
    {
      title: "Tickets de Bus",
      description:
        "Achetez vos tickets en ligne et partez sans stress.",
      icon: "fas fa-bus",
    },
  ];
export default WhyChooseUs;
