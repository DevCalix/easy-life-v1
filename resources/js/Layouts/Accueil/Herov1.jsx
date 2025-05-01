import React, { useEffect, useState } from "react";
import lottie from "lottie-web";
import { gsap } from "gsap";
import "../../../css/accueilStyle/hero.css";
import axios from "axios";

const Hero = () => {
    const [contactNumber, setContactNumber] = useState("");

    // Récupérer le numéro de contact depuis l'API
    useEffect(() => {
        axios.get('/adds/contact-number')
            .then((response) => {
                setContactNumber(response.data.phone_number);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du numéro de contact :', error);
            });
    }, []);

    // Charger l'animation de l'oiseau
    useEffect(() => {
        const birdAnimation = lottie.loadAnimation({
            container: document.getElementById("bird-container"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://lottie.host/088366f3-b053-419b-b441-8b9f053da04e/Qfjd5dOJEP.json",
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
            <div id="welcome-text" className="welcome-text">
                <h1 className="welcome-title montserrat">
                    Bienvenue sur <span className="highlight">Easy Life</span>
                </h1>
                <p className="welcome-subtitle montserrat">
                    La plateforme tout-en-un pour simplifier votre quotidien.
                </p>
                <p className="text-primary cmd montserrat-normal">Commander par appel ou WhatsApp</p>
                <div className="d-flex justify-content-center">
                    {/* Bouton pour commander par appel */}
                    {contactNumber && (
                        <>
                            <a href={`tel:${contactNumber}`} className="cta-button montserrat mx-2">
                            <i className="bi bi-telephone me-2"></i>
                                {contactNumber}
                            </a>

                            {/* Bouton pour commander par WhatsApp */}
                            <a
                                href={`https://api.whatsapp.com/send?phone=${contactNumber}&text=Bonjour,%20je%20souhaite%20passer%20une%20commande.`}
                                className="cta-button montserrat"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-whatsapp"></i>
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hero;
