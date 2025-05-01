import { Link } from "@inertiajs/react";

export default function DevenirVendeur() {
    return(
        <section className="py-2 bg-warning">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center py-2">
                            <h2 className="fw-bold montserrat-normal">Devenir vendeur sur EasyLife Market</h2>
                            <p className="montserrat-normal">
                                Proposez vos services à des milliers de clients et augmentez votre visibilité
                            </p>
                            
                            
                            {/* <div className="row g-2">
                                {[
                                    { name: "Super marché", icon: "🛒" },
                                    { name: "Restaurant", icon: "🍽️" },
                                    { name: "Hôtel", icon: "🏨" },
                                    { name: "Pharmacie", icon: "💊" }
                                ].map((service, index) => (
                                    <div key={index} className="col-md-3 col-6">
                                        <div className="p-3 bg-white rounded shadow-sm text-center h-100">
                                            <div className="display-4 mb-3">{service.icon}</div>
                                            <h3 className="h5">{service.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div> */}

                            <Link 
                                href={route('vendeur.index')}
                                className="btn btn-primary px-4"
                            >
                                Commencer l'inscription <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
    )
}