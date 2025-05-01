import React from "react";
import { Head } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

const PharmaciesProches = ({ pharmacies = [] }) => {
    return (
        <>
            <Head title="Pharmacies de Garde" />
            <PharmaNavbar />
            <div className="container my-4 montserrat-normal">
                <h1 className="fw-bold mb-3 montserrat-normal">Pharmacies Proches</h1>
                <hr />

                {/* Liste des pharmacies de garde */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {pharmacies.map((pharmacie, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={pharmacie.image_principale || "/images/default-pharmacie.jpg"}
                                    alt={pharmacie.nom}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title fw-bold montserrat-normal">{pharmacie.nom}</h5>
                                    <p className="card-text montserrat-normal">
                                        <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                        {pharmacie.adresse}
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center montserrat-normal">
                                        <span>
                                            <i className="bi bi-clock-fill text-warning me-2"></i>
                                            {pharmacie.heures_ouverture}
                                        </span>
                                        <span className="badge bg-primary" style={{ fontSize: "14px", padding: "5px 10px" }}>
                                            <i className="bi bi-star-fill text-warning me-1"></i>
                                            {pharmacie.note}
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <a
                                            href={pharmacie.lien_carte}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-primary w-100"
                                        >
                                            Voir sur la carte
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <PharmacieFooter />
        </>
    );
};

export default PharmaciesProches;
