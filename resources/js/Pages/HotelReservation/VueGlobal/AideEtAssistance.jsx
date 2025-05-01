import React from "react";
import { Head, Link } from "@inertiajs/react";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";

export default function AideEtAssistance() {
    return (
        <>
            <HotelReservationNavbar />
            <Head title="Aide et Assistance" />

            <div className="aide-et-assistance-page">
                <div className="container my-5">
                    <h1 className="mb-4 montserrat-normal fw-bold">Aide et Assistance</h1>
                    <hr />

                    {/* Section : Questions fréquentes */}
                    <section className="mb-5">
                        <h2 className="mb-3 montserrat-normal fw-bold">Questions fréquentes</h2>
                        <div className="accordion" id="faqAccordion">
                            {/* Question 1 */}
                            <div className="accordion-item">
                                <h3 className="accordion-header" id="faqHeading1">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#faqCollapse1"
                                        aria-expanded="true"
                                        aria-controls="faqCollapse1"
                                    >
                                        Comment réserver une chambre ?
                                    </button>
                                </h3>
                                <div
                                    id="faqCollapse1"
                                    className="accordion-collapse collapse show"
                                    aria-labelledby="faqHeading1"
                                    data-bs-parent="#faqAccordion"
                                >
                                    <div className="accordion-body">
                                        Pour réserver une chambre, suivez ces étapes :
                                        <ol>
                                            <li>Recherchez un hôtel sur notre plateforme.</li>
                                            <li>Sélectionnez les dates de séjour et le nombre de personnes.</li>
                                            <li>Choisissez une chambre disponible.</li>
                                            <li>Remplissez le formulaire de réservation et validez.</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            {/* Question 3 */}
                            <div className="accordion-item">
                                <h3 className="accordion-header" id="faqHeading3">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#faqCollapse3"
                                        aria-expanded="false"
                                        aria-controls="faqCollapse3"
                                    >
                                        Comment contacter l'hôtel ?
                                    </button>
                                </h3>
                                <div
                                    id="faqCollapse3"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="faqHeading3"
                                    data-bs-parent="#faqAccordion"
                                >
                                    <div className="accordion-body">
                                        Vous pouvez contacter l'hôtel directement via :
                                        <ul>
                                            <li>Le numéro de téléphone fourni sur la page de l'hôtel.</li>
                                            <li>L'adresse e-mail de l'hôtel.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section : Contactez-nous */}
                    <section className="mb-5">
                        <h2 className="mb-3 montserrat-normal fw-bold">Contactez-nous</h2>
                        <p>
                            Si vous avez besoin d'aide supplémentaire, n'hésitez pas à nous contacter :
                        </p>
                        <ul>
                            <li>
                                <strong>Email :</strong>{" "}
                                <a href="mailto:support@easylife5.com">support@easylife5.com</a>
                            </li>
                            <li>
                                <strong>Téléphone :</strong> +237 686 81 11 58
                            </li>

                        </ul>
                    </section>

                </div>
            </div>

            <HotelFooter />
        </>
    );
}
