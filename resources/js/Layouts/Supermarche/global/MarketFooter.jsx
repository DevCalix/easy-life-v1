import React from "react";
import "../../../../css/SuperMarche/marketFooter.css";

export default function MarketFooter() {
  return (
    <footer className="bg-dark text-white py-3 montserrat">
      <div className="container montserrat">
                <div className="row">
                    {/* Section "À propos" */}
                    <div className="col-md-4 mb-4">
                        <h6 className="text-uppercase fw-bold text-light">À propos</h6>
                        <p className="text-light">
                            Easy Life est votre partenaire de confiance pour commander des
                            repas, médicaments, et bien plus encore. Simplifiez votre vie, une
                            commande à la fois.
                        </p>
                    </div>

                    {/* Liens rapides */}
                    <div className="col-md-4 mb-4">
                        <h6 className="text-uppercase fw-bold text-light">Liens Rapides</h6>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    href={route('accueil.restaurant')}
                                    className="text-light text-decoration-none"
                                >
                                    Commande de Repas
                                </a>
                            </li>
                            <li>
                                <a
                                    href={route('accueil.pharmacie')}
                                    className="text-light text-decoration-none"
                                >
                                    Pharmacie
                                </a>
                            </li>
                            <li>
                                <a
                                    href={route('reservation-hotel.accueil')}
                                    className="text-light text-decoration-none"
                                >
                                    Réserver un logement
                                </a>
                            </li>
                            <li>
                                <a
                                    href={route('supermarche.accueil')}
                                    className="text-light text-decoration-none"
                                >
                                    Supermarché
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Réseaux sociaux */}
                    <div className="col-md-4">
                        <h6 className="text-uppercase fw-bold text-light">Contactez-nous</h6>

                        {/* Téléphone & WhatsApp */}
                        <p className="text-light mb-1">
                            <i className="bi bi-telephone-fill me-2"></i> Appel & WhatsApp : 686 81 11 58
                        </p>

                        {/* Email */}
                        <p className="text-light mb-3">
                            <i className="bi bi-envelope-fill me-2"></i> support@easylife5.com
                        </p>

                        {/* Réseaux Sociaux */}
                        <div className="d-flex gap-3">
                            <a
                                href="https://www.facebook.com/share/18GqxKeduM/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5"
                            >
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a
                                href="https://www.instagram.com/easylife__0?igsh=dmZzem1vb3d0anhr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5"
                            >
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/edit-kamel-djupsa-082a34333?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5"
                            >
                                <i className="bi bi-linkedin"></i>
                            </a>
                            <a
                                href="https://x.com/dRealEasyLife?t=pA38ugWkBQTDfElfhqOO-A&s=09"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5"
                            >
                                <i className="bi bi-twitter-x"></i>
                            </a>
                            <a
                                href="https://www.tiktok.com/@easylifemarket1?_t=ZN-8thAzbXcAYo&_r=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-light fs-5"
                            >
                                <i className="bi bi-tiktok"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bas de page */}
                <div className="text-center mt-4">
                    <p className="text-light mb-0">
                        © {new Date().getFullYear()} Easy Life. Tous droits réservés.
                    </p>
                </div>
            </div>
    </footer>
  );
}
