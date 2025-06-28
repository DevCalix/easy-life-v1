import React from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Layouts/Accueil/Navbar";
import Footer from "@/Layouts/Accueil/Footer";

export default function AvantagesVendeur({ auth }) {
    return (
        <>
            <Navbar />
            <Head title="Avantages pour les vendeurs" />

            <div className="bg-light">
                <div className="container py-2 py-md-4 montserrat">
                    {/* Hero Section */}
                    <div className="text-center py-3 py-md-2 mb-2">
                        <h1 className="fw-bold text-dark mb-3 mb-md-4 display-5 montserrat-normal">
                            Devenir Partenaire
                        </h1>
                        <div className="d-flex justify-content-center mb-2">
                            <div className="border-top border-primary border-2" style={{ width: '100px' }}></div>
                        </div>
                        <p className="lead text-muted mb-4 px-2 px-md-0" style={{ fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>
                            Rejoignez notre plateforme et bénéficiez d'une visibilité exceptionnelle pour développer votre activité
                        </p>
                    </div>

                    {/* Avantages Section */}
                    <div className="row justify-content-center g-3 g-md-4 mb-2">
                        <div className="col-12 col-lg-10">
                            <div className="card border-0 shadow-sm shadow-md-lg rounded-3 overflow-hidden mb-4">
                                <div className="card-header text-white py-3 py-md-4" style={{ background: 'linear-gradient(135deg, #04C04A 0%, #04D04A 100%)' }}>
                                    <h2 className="h6 h5-md mb-0 text-center fw-normal montserrat-normal">
                                        <i className="bi bi-stars me-2"></i> Vos avantages exclusifs
                                    </h2>
                                </div>
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        {[
                                            {
                                                icon: 'bi-currency-dollar',
                                                title: 'Paiement sur commission',
                                                text: 'Vous ne payez que lorsque vous vendez, avec des taux compétitifs'
                                            },
                                            {
                                                icon: 'bi-megaphone',
                                                title: 'Marketing intégré',
                                                text: 'Bénéficiez de nos campagnes publicitaires et de notre notoriété'
                                            },
                                            {
                                                icon: 'bi-truck',
                                                title: 'Logistique gérée',
                                                text: 'Notre réseau de livraison prend en charge l\'expédition'
                                            },
                                            {
                                                icon: 'bi-headset',
                                                title: 'Support 24/7',
                                                text: 'Une équipe dédiée toujours disponible pour vous aider'
                                            },
                                            {
                                                icon: 'bi-people',
                                                title: 'Audience massive',
                                                text: 'Accès à des millions de clients potentiels'
                                            },
                                            {
                                                icon: 'bi-graph-up',
                                                title: 'Analytics avancés',
                                                text: 'Outils pour suivre et optimiser vos performances'
                                            }
                                        ].map((item, index) => (
                                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                                <div className="p-3 p-md-4 h-100 d-flex flex-column"
                                                    style={{
                                                        borderRight: index % 3 !== 2 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                                                        borderBottom: index < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none'
                                                    }}>
                                                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 p-md-3 mb-2 mb-md-3 mx-auto mx-md-0" style={{ width: '50px', height: '50px' }}>
                                                        <i className={`bi ${item.icon} fs-5`}></i>
                                                    </div>
                                                    <h3 className="h6 fw-bold mb-1 mb-md-2 montserrat-normal text-center text-md-start">{item.title}</h3>
                                                    <p className="text-muted mb-0 text-center text-md-start">{item.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rôle Section */}
                    <div className="row justify-content-center mb-2">
                        <div className="col-12 col-lg-8">
                            <div className="text-center mb-4 mb-md-5">
                                <h2 className="text-dark mb-2 mb-md-3 montserrat-normal fw-bold h5 h4-md">
                                    Votre engagement
                                </h2>
                                <p className="text-muted px-2 px-md-0">Nous travaillons ensemble pour offrir la meilleure expérience client</p>
                            </div>

                            <div className="row g-3 g-md-2">
                                {[
                                    {
                                        icon: 'bi-box-seam',
                                        title: 'Gestion des produits',
                                        text: 'Mettez à jour régulièrement votre catalogue'
                                    },
                                    {
                                        icon: 'bi-clipboard-check',
                                        title: 'Suivi des stocks',
                                        text: 'Maintenez des niveaux de stock appropriés'
                                    },
                                    {
                                        icon: 'bi-check-circle',
                                        title: 'Validation des commandes',
                                        text: 'Traitez rapidement les commandes reçues'
                                    },
                                    {
                                        icon: 'bi-chat-dots',
                                        title: 'Service client',
                                        text: 'Répondez aux questions dans les 24h'
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="col-12 col-md-6">
                                        <div className="card border-0 shadow-sm h-100 rounded-3">
                                            <div className="card-body p-3 p-md-4 text-center">
                                                <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle p-2 p-md-3 mb-2 mb-md-3 mx-auto" style={{ width: '50px', height: '50px' }}>
                                                    <i className={`bi ${item.icon} fs-5`}></i>
                                                </div>
                                                <h3 className="h6 h5-md mb-1 mb-md-2 fw-bold">{item.title}</h3>
                                                <p className="text-muted mb-0 small">{item.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center py-2 py-md-2">
                        <h2 className="fw-bold mb-2 mb-md-3 montserrat-normal h5 h4-md">
                            Prêt à rejoindre notre communauté ?
                        </h2>
                        <Link
                            href={route('vendeur.index')}
                            className="btn px-4 px-md-5 py-2 py-md-3 rounded-pill fw-bold shadow-sm"
                            style={{
                                background: 'linear-gradient(135deg, #04C04A 0%, #04C04A 100%)',
                                color: '#fff',
                                border: 'none',
                                fontSize: '0.95rem'
                            }}
                        >
                            Commencer l'inscription <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx global>{`
                @media (max-width: 767.98px) {
                    /* Mobile specific styles */
                    .card-body > .row > div {
                        border-right: none !important;
                        border-bottom: 1px solid rgba(0,0,0,0.05) !important;
                    }

                    .card-body > .row > div:last-child {
                        border-bottom: none !important;
                    }

                    .card {
                        box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075) !important;
                    }

                    .card:hover {
                        transform: none !important;
                    }
                }
            `}</style>
        </>
    );
}
