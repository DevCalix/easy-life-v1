import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const IndexTopVendeur = ({ sections, appUrl }) => {
    return (
        <AdminLayout>
            <Head title="Gestion des Sections d'Accueil" />

            <div className="container py-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0 fw-bold montserrat-normal">Sections d'Accueil</h1>
                    <Link href={route('top-vendeur.create')} className="btn btn-primary">
                        + Ajouter un élément
                    </Link>
                </div>

                <div className="sections-container">
                    {sections.map((section) => (
                        <div key={section.key} className="section-group mb-2">
                            {/* Titre de section avec ligne de séparation */}
                            <div className="d-flex align-items-center mb-3">
                                <h2 className="fw-bold mb-0 me-3 montserrat-normal">{section.name}</h2>
                                <div className="flex-grow-1 border-top"></div>
                                <Link
                                    href={route('top-vendeur.create', { section: section.key })}
                                    className="btn btn-sm btn-outline-primary ms-3"
                                >
                                    + Ajouter
                                </Link>
                            </div>

                            {/* Carousel Swiper */}
                            <Swiper
                                modules={[Autoplay, Navigation]}
                                spaceBetween={15}
                                slidesPerView={2}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                breakpoints={{
                                    640: { slidesPerView: 3 },
                                    768: { slidesPerView: 4 },
                                    1024: { slidesPerView: 6 }
                                }}
                            >
                                {section.items.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="card h-100">
                                            <div className="card-img-top-container">
                                                <img
                                                    src={item.image?.startsWith('http') ? item.image : `${appUrl}${item.image}`}
                                                    alt={item.nom}
                                                    className="card-img-top"
                                                />
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title">{item.nom}</h6>
                                                {item.description && (
                                                    <p className="card-text small text-muted mb-2">
                                                        {item.description}
                                                    </p>
                                                )}
                                                <div className="d-flex justify-content-between">
                                                    <Link
                                                        href={route('top-vendeur.edit', item.id)}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                    <Link
                                                        as="button"
                                                        method="delete"
                                                        href={route('top-vendeur.destroy', item.id)}
                                                        className="btn btn-sm btn-outline-danger"
                                                        preserveScroll
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .card-img-top-container {
                    position: relative;
                    height: 150px;
                    overflow: hidden;
                }
                .card-img-top {
                    height: 100%;
                    object-fit: cover;
                }
                .section-group {
                    padding-bottom: 20px;
                }
            `}</style>
        </AdminLayout>
    );
};

export default IndexTopVendeur;
