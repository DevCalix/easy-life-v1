import React, { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
    const [contactNumber, setContactNumber] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/adds/contact-number')
            .then((response) => {
                setContactNumber(response.data.phone_number);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du numéro de contact :', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="hero-container bg-secondary py-2">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <p className="text-light fs-6 fw-medium montserrat-normal mb-2">
                            Commander par appel ou WhatsApp
                        </p>

                        {isLoading ? (
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-outline-primary disabled">
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Chargement...
                                </button>
                            </div>
                        ) : contactNumber ? (
                            <div className="d-flex justify-content-center gap-2">
                                <a
                                    href={`tel:${contactNumber}`}
                                    className="btn btn-primary btn-sm py-2 montserrat-normal"
                                >
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    {contactNumber}
                                </a>

                                <a
                                    href={`https://api.whatsapp.com/send?phone=${contactNumber}&text=Bonjour,%20je%20souhaite%20passer%20une%20commande.`}
                                    className="btn btn-success btn-sm py-2 montserrat-normal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="bi bi-whatsapp me-2"></i>
                                    WhatsApp
                                </a>
                            </div>
                        ) : (
                            <div className="alert alert-warning">
                                Numéro de contact indisponible
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
