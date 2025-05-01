import React from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";
import "../../../../css/global/adsBanner.css";

export default function IndexPopup({ popups = [] }) {
    const { props } = usePage();
    const appUrl = props.appUrl;

    // Fonction pour supprimer un popup
    const handleDelete = (id) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce popup ?")) {
            router.delete(`/adds/popups/${id}`);
        }
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Gestion des Popups" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Gestion des Popups</h1>
                    <Link
                        href="/adds/popups/create"
                        className="btn btn-primary montserrat-normal"
                    >
                        Ajouter un Popup
                    </Link>
                </div>

                <hr className="border border-warning border-3 opacity-75" />

                {/* Grille des popups */}
                <div className="row">
                    {popups.map((popup) => (
                        <div key={popup.id} className="col-md-6 col-lg-4 col-12 mb-4">
                            <div className="card position-relative shadow-sm">
                                {/* Badge de statut */}
                                <div className="position-absolute top-0 end-0 m-2">
                                    {popup.is_active ? (
                                        <span className="badge bg-success">Actif</span>
                                    ) : (
                                        <span className="badge bg-danger">Inactif</span>
                                    )}
                                </div>

                                {/* Image du popup */}
                                <img
                                    src={`${appUrl}${popup.cover_popup}`}
                                    alt="Média du popup"
                                    className="card-img-top"
                                    style={{ objectFit: "cover", height: "200px" }}
                                />

                                {/* Contenu du popup */}
                                <div className="card-body">
                                    <h5 className="card-title">{popup.title}</h5>
                                    <p className="card-text">{popup.message}</p>

                                    {/* Délai d'affichage */}
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Délai : {popup.delay} ms
                                        </small>
                                    </p>
                                </div>

                                {/* Boutons d'actions */}
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <button
                                        onClick={() => handleDelete(popup.id)}
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
