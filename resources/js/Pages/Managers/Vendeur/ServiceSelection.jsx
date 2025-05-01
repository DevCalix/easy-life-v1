import React from "react";
import { Head, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Layouts/Accueil/Navbar";
import Footer from "@/Layouts/Accueil/Footer";

export default function ServiceSelection({ auth, userServices = [] }) {
    const services = [
        {
            id: 'supermarche',
            name: 'Super marché',
            icon: '🛒',
            color: 'primary',
            url: '/vendeur/market-store-form',
            route: 'market.dashboard'
        },
        {
            id: 'restaurant',
            name: 'Restaurant',
            icon: '🍽️',
            color: 'danger',
            url: '/vendeur/restau-store-form',
            route: 'mgs-commandes-repas.index'
        },
        {
            id: 'hotel',
            name: 'Hôtel',
            icon: '🏨',
            color: 'warning',
            url: '/vendeur/hotel-store-form',
            route: 'htm-reservations.index'
        },
        {
            id: 'pharmacie',
            name: 'Pharmacie',
            icon: '💊',
            color: 'info',
            url: '/vendeur/pharmacie-store-form',
            route: 'sts-admin.commandes.pharmacie'
        }
    ];

    const handleCardClick = (url) => {
        router.visit(url);
    };

    // Grouper les services par type
    const groupedServices = {};
    userServices.forEach(service => {
        const serviceType = mapServiceType(service.service_type);
        if (!groupedServices[serviceType]) {
            groupedServices[serviceType] = {
                count: 0,
                config: services.find(s => s.id === serviceType)
            };
        }
        groupedServices[serviceType].count++;
    });

    // Fonction de mapping des types de service
    function mapServiceType(dbType) {
        const mapping = {
            'App\\Models\\Supermarche\\Store': 'supermarche',
            'App\\Models\\Restaurant\\Restaurant': 'restaurant',
            'App\\Models\\PharmacieSante\\StPharmacie': 'pharmacie',
            'App\\Models\\HotelReservation\\HtHotel': 'hotel'
        };
        return mapping[dbType] || dbType;
    }

    return (
        <>
            <Navbar />
            <Head title="Choisissez votre service" />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="text-center mb-5">
                            <h1 className="fw-bold text-dark mb-3 montserrat-normal">Devenir vendeur</h1>
                            <hr className="w-50 mx-auto mb-4 border-primary border-2 opacity-75" />
                            <p className="lead text-muted montserrat-normal">
                                Sélectionnez le type de service que vous proposez
                            </p>
                        </div>

                        <div className="row g-4">
                            {services.map((service) => (
                                <div key={service.id} className="col-6 col-xs-6">
                                    <div
                                        className={`card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center hover-zoom`}
                                        onClick={() => handleCardClick(service.url)}
                                        style={{ cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'none';
                                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        <div className={`card-body bg-${service.color}-subtle py-5 d-flex flex-column justify-content-center`}>
                                            <div className="display-2 mb-3">{service.icon}</div>
                                            <h6 className="fw-bold text-dark montserrat-normal">{service.name}</h6>
                                        </div>
                                        <div className="card-footer bg-transparent border-0 py-3">
                                            <span className={`text-${service.color} fw-semibold montsterrat-normal`}>
                                                Choisir <i className="bi bi-chevron-right ms-1"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-5 pt-4">
                            {auth.user ? (
                                <div>
                                    {Object.keys(groupedServices).length > 0 ? (
                                        <div className="mb-3">
                                            <p className="text-muted mb-3">Accéder à vos dashboards :</p>
                                            <div className="d-flex justify-content-center flex-wrap gap-3">
                                                {Object.entries(groupedServices).map(([serviceType, data]) => {
                                                    const serviceConfig = data.config;
                                                    const count = data.count;
                                                    
                                                    return (
                                                        <Link
                                                            key={serviceType}
                                                            href={route(serviceConfig.route)}
                                                            className="btn btn-outline-primary rounded-pill px-4 py-2 d-flex align-items-center"
                                                            preserveScroll
                                                        >
                                                            <span className="me-2">
                                                                {serviceConfig?.name || 'Service'} 
                                                                
                                                            </span>
                                                            <i className="bi bi-box-arrow-in-right"></i>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                            
                                        </div>
                                    ) : (
                                        <p className="text-muted">
                                            Vous êtes connecté. 
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted">
                                    Vous avez déjà un compte ?{' '}
                                    <Link
                                        href="/login"
                                        className="text-decoration-none fw-semibold text-primary"
                                        preserveScroll
                                    >
                                        Connectez-vous
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}