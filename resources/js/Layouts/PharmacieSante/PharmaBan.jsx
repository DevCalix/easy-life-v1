import React, { useEffect } from "react";
import gsap from "gsap";
import Lottie from "lottie-web";
import "../../../css/PharmacieSante/PharmaBanniere.css";


const PharmaBan = () => {
    useEffect(() => {
        // Charger l'animation de l'oiseau
        const birdAnimation = Lottie.loadAnimation({
          container: document.getElementById("bird-container"), // Conteneur HTML
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "https://lottie.host/088366f3-b053-419b-b441-8b9f053da04e/Qfjd5dOJEP.json", // Chemin de l'animation
        });

        // Animation GSAP pour le mouvement du conteneur
        gsap.fromTo(
          "#bird-container",
          { x: window.innerWidth },
          {
            x: -400,
            duration: 5,
            ease: "linear",
            onUpdate: function () {
              const birdPosition = document
                .getElementById("bird-container")
                .getBoundingClientRect().left;
              if (birdPosition < window.innerWidth * 0.2 && birdPosition > -300) {
                gsap.to("#welcome-text", { opacity: 1, duration: 1 });
              }
            },
            onComplete: function () {
              gsap.to("#bird-container", { opacity: 0, duration: 1 });
            },
          }
        );

        // Nettoyage lors du démontage
        return () => {
          birdAnimation.destroy();
        };
      }, []);

  return (
    <div className="hero-container montserrat-normal">
      {/* Conteneur de l'animation de l'oiseau */}
      <div id="bird-container" className="bird-container"></div>

      {/* Texte de bienvenue */}
      <div id="welcome-text" className="welcome-text mx-2">
        <h1 className="welcome-title fw-bold">
          Prenez soin de votre santé avec{" "}
          <span className="highlight">Easy Life</span>.
        </h1>
        <p className="welcome-subtitle p-2">
          Commandez vos médicaments, produits de soin et accessoires en toute simplicité. Livraison rapide et sécurisée.
        </p>
        <hr/>
        {/* Section des boutons d'action */}
        <div className="action-buttons d-flex flex-column flex-md-row justify-content-center gap-3">
        {/* Bouton pour les urgences de santé */}
        {/* Urgence Santé */}
  <div className="mb-3 mb-md-0 text-center">
    <p className="mb-2">Contactez un hôpital proche</p>
    <a href="/pharmacie-sante/urgence-sante" className="cta-button fw-bold btn btn-primary btn-lg">
      Urgence Santé
    </a>
  </div>

  {/* Ligne verticale Bootstrap */}
  <div className="vr d-none d-md-block"></div>

  {/* RDV Médical */}
  <div className="text-center">
    <p className="mb-2">Prenez rendez-vous avec un spécialiste</p>
    <a href={route('specialiste.all')} className="cta-button fw-bold btn btn-success btn-lg">
      RDV Médical
    </a>
  </div>

        </div>
      </div>
    </div>
  );
};

export default PharmaBan;
