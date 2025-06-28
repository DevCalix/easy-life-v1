import React from "react";
import { Link } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function PrendreRendezVous({ medecins }) {
    
    return (
        <section className="py-2 bg-light">
            <div className="container">
                <h2 className="text-center mb-4 fw-bold text-primary">Besoin d'un Rendez-vous Médical ?</h2>
                <p className="text-center mb-5 text-muted">
                    Consultez un médecin spécialiste en quelques clics.
                </p>

                {/* Carousel Swiper */}
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    breakpoints={{
                        0: { slidesPerView: 2 }, // Mobile
                        992: { slidesPerView: 5 }, // Grand écran
                    }}
                >
                    {medecins.map((medecin) => (
                        <SwiperSlide key={medecin.id}>
                            <div className="card shadow-lg border-0 rounded-4 p-3 text-center h-100 d-flex flex-column align-items-center justify-content-between">
                                <img
                                    src={medecin.image_principale || '/default-avatar.png'}
                                    alt={`Photo de profil de ${medecin.nom}`}
                                    className="img-fluid rounded-circle mb-2"
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        objectFit: 'cover',
                                        border: '4px solid #fff',
                                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                                <h6 className="fw-bold text-dark mb-1">{medecin.nom}</h6>
                                <p className="text-muted small mb-2">{medecin.specialite}</p>
                                <p className="text-muted small mb-2 montserrat-regulier">
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    {medecin.adresse}
                                </p>
                                <Link
                                    href={`/pharmacie-sante/prendre-rendez-vous/${medecin.id}`}
                                    className="btn btn-primary btn-sm px-3 rounded-pill"
                                >
                                    Rendez-vous
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="text-center mt-3">
                    <Link href={route('specialiste.all')} className="btn btn-outline-primary px-4 py-2 rounded-pill">
                        Voir plus de Médecins
                    </Link>
                </div>
            </div>
        </section>
    );
}
