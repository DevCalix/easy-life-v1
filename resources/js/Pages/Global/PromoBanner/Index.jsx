import React from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";
import "../../../../css/global/adsBanner.css";

export default function Index({ banners = [] }) {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base

    // Fonction pour supprimer une bannière
    const handleDelete = (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette bannière ?")) {
            router.delete(`/adds/banners/${id}`);
        }
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Gestion des bannières" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Gestion des bannières</h1>
                    <Link
                        href="/adds/banners/create"
                        className="btn btn-primary montserrat-normal"
                    >
                        Ajouter une bannière
                    </Link>
                </div>

                <hr className="border border-warning border-3 opacity-75"/>

                {/* Grille des bannières */}
                <div className="row">
                    {banners.map((banner) => (
                        <div key={banner.id} className="col-md-6 col-12 mb-4">
                            <div className="card position-relative shadow-sm">
                                {/* Badge de statut */}
                                <div className="position-absolute top-0 end-0 m-2">
                                    {banner.statut ? (
                                        <span className="badge bg-success">Actif</span>
                                    ) : (
                                        <span className="badge bg-danger">Inactif</span>
                                    )}
                                </div>

                                {/* Image cliquable */}

                                <img
                                    src={banner.promo_banner ? `${appUrl}${banner.promo_banner}` : "/images/default-banner.jpg"}
                                    alt={`Bannière ${banner.id}`}
                                    className="card-img-top"

                                />

                                {/* Boutons d'actions */}
                                <div className="card-body d-flex justify-content-between align-items-center">
                                    <Link
                                        href={route('banners.edit', banner.id)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        <i className="bi bi-pencil"></i> Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(banner.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        <i className="bi bi-trash"></i> Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
