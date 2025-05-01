import React, { useEffect } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import "../../../../css/SuperMarche/MarketBanniere.css";

const MarketBan = () => {
    useEffect(() => {
        // Charger l'animation de l'oiseau
        const birdAnimation = lottie.loadAnimation({
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
    <div className="hero-container">
        {/* Conteneur de l'animation de l'oiseau */}
        <div id="bird-container" className="bird-container"></div>

        {/* Texte de bienvenue */}
        <div id="welcome-text" className="welcome-text mx-2">
            <h1 className="welcome-title montserrat">
                Faites de vos courses <span className="highlight">un moment de plaisir</span>.
            </h1>
        </div>

    </div>
  );
};

export default MarketBan;
