import React from "react";
import "../../../css/accueilStyle/testimonials.css";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2 className="text-center section-title montserrat-normal fw-bold">
          Ce que nos clients disent
        </h2>
        <hr/>
        <div className="row gx-1">
          {testimonials.map((testimonial, index) => (
            <div className="col-6 col-md-4" key={index}>
              <div className="card testimonial-card">
                <div className="card-body text-center">
                  <div className="testimonial-img-wrapper">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="testimonial-img"
                    />
                  </div>
                  <h5 className="testimonial-name montserrat-normal">{testimonial.name}</h5>
                  <p className="testimonial-location montserrat-regulier">{testimonial.location}</p>
                  <div className="stars">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="testimonial-text montserrat-regulier">{testimonial.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Données des témoignages
const testimonials = [
  {
    name: "Maria Cowen",
    location: "Paris, France",
    rating: 5,
    image: "images/avisClients/Profils.webp",
    text: "Easy Life a simplifié ma vie quotidienne. Je commande mes repas et mes médicaments en un clic. Un service fiable et rapide!",
  },
  {
    name: "Rachida Mana",
    location: "Lagos, Nigeria",
    rating: 4,
    image: "images/avisClients/Profils1.webp",
    text: "La plateforme est intuitive et très pratique. J'ai pu réserver un hôtel et commander des courses sans aucun souci. Très satisfait!",
  },
  {
    name: "BOUKARI Kébé",
    location: "Dakar, Sénégal",
    rating: 5,
    image: "images/avisClients/Profils3.webp",
    text: "Une expérience fluide et agréable. Je recommande Easy Life pour tout le monde en Afrique. Le suivi des commandes est impeccable!",
  },
];

export default TestimonialsSection;
