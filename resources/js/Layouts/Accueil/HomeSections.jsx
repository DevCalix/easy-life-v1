import React from 'react';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";

const HomeSections = ({ sections }) => {
    return (
        <div className="container-fluid my-2">
            {sections.map((section) => (
                <div key={section.key} className="mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="fw-bold mb-0 montserrat-normal">{section.name}</h2>

                    </div>

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={5}
                        slidesPerView={2}
                        autoplay={{ delay: 3000 }}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 }
                        }}
                    >
                        {section.items.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Link href={item.lien_redirection} className="text-decoration-none"
                                    onClick={(e) => {
                                        // Empêcher le comportement par défaut au cas où
                                        e.preventDefault();
                                        window.location.href = item.lien_redirection;
                                    }}
                                >
                                    <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                                        <div className="position-relative" style={{ height: '150px', overflow: 'hidden' }}>
                                            <img
                                                src={item.image}
                                                alt={item.nom_produit}
                                                className="img-fluid h-100 w-100 object-fit-cover"
                                            />
                                            {item.pourcentage_promotion && (
                                                <span className="badge bg-danger position-absolute top-0 end-0 m-2">
                                                    -{item.pourcentage_promotion}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-title text-dark">{item.nom_produit}</h6>
                                            <div className="d-flex align-items-center">
                                                {item.prix_promotion ? (
                                                    <>
                                                        <span
                                                            className="text-danger fw-bold"
                                                            style={{ fontSize: '0.8rem' }}
                                                        >
                                                            {item.prix_promotion} FCFA
                                                        </span>
                                                        <span
                                                            className="text-muted text-decoration-line-through ms-2"
                                                            style={{ fontSize: '0.8rem' }}
                                                        >
                                                            {item.prix} FCFA
                                                        </span>
                                                    </>

                                                ) : (
                                                    <span className="fw-bold text-dark" style={{ fontSize:'0.8rem'}}>{item.prix} FCFA</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </div>
    );
};

export default HomeSections;
