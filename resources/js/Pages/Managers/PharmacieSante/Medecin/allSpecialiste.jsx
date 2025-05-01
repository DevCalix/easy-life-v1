import React from "react";
import { Head, Link } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

export default function allSpecialiste({ medecins }) {
    return (
        <>
            <PharmaNavbar />
            <Head title="Liste des Médecins" />

            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-4 fw-bold text-primary montserrat-normal">Liste des Médecins</h2>
                    <p className="text-center mb-5 text-muted">
                        Consultez la liste complète de nos médecins spécialistes.
                    </p>
                    <hr className="border border-success border-2 opacity-75"/>

                    <div className="row justify-content-center">
                        {medecins.map((medecin) => (
                            <div className="col-md-4 mb-4" key={medecin.id}>
                                <div className="card shadow-lg border-0 rounded-4 p-4 text-center h-100 d-flex flex-column align-items-center justify-content-between">
                                    {/* Photo de profil */}
                                    <img
                                        src={medecin.image_principale ? medecin.image_principale : '/default-avatar.png'}
                                        alt={`Photo de profil de ${medecin.nom}`}
                                        className="img-fluid rounded-circle mb-4"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            border: '5px solid #fff',
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                    <h5 className="fw-bold text-dark mb-2">{medecin.nom}</h5>
                                    <p className="text-muted mb-3">{medecin.specialite}</p>

                                    <Link
                                        href={`/pharmacie-sante/prendre-rendez-vous/${medecin.id}`}
                                        className="btn btn-primary px-4 py-2 rounded-pill"
                                    >
                                        Prendre un Rendez-vous
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PharmacieFooter />
        </>
    );
}
