import React from "react";
import { Link, usePage } from "@inertiajs/react";
import "../../../../css/SuperMarche/nearbyMarkets.css";
import { Inertia } from "@inertiajs/inertia";

export default function NearbyMarketsCarousel({ stores = [],}) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    // Redirige vers la page du store
    const handleViewStore = (storeId) => {
        Inertia.visit(`/supermarche/info-stores/${storeId}`);
    };

    return (
        <section className="bg-light py-2 montserrat">
            <div className="container">

                    <h6 className="fw-bold mb-2">Magasins proches</h6>

                <div className="d-flex overflow-auto gap-2 custom-scroll align-items-center py-1">
                    {stores.length > 0 ? (
                        stores.map((store, index) => (
                            <div
                                key={index}
                                className="market-card flex-shrink-0 text-center shadow-sm bg-white rounded text-decoration-none"
                                style={{ minWidth: "200px", maxWidth: "220px" }}
                            >
                                <div className="p-2">
                                    {/* Image du store */}
                                    <img
                                        src={store.photo_store ? `${appUrl}${store.photo_store}` : "/images/default-store.jpg"}
                                        alt={store.nom}
                                        className="img-fluid mb-3"
                                        style={{
                                            width: "100%",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    {/* Nom du store */}
                                    <h6 className="text-dark fw-bold mb-1">{store.nom}</h6>
                                    {/* Adresse du store */}
                                    <p className="text-muted mb-2">{store.adresse}</p>
                                    {/* Horaires d'ouverture
                                    <p className="text-muted mb-2">
                                        <small>{store.horaires_ouverture}</small>
                                    </p> */}
                                    {/* Note (rating) */}
                                    <div className="d-flex justify-content-center align-items-center mb-2">
                                        <span className="badge bg-warning text-dark">
                                            {store.rating} ★
                                        </span>
                                        <button
                                            className="btn btn-sm ms-5"
                                            id="btnExplorer"
                                            onClick={() => handleViewStore(store.id)}
                                        >
                                            Explorer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">Aucun store disponible.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
