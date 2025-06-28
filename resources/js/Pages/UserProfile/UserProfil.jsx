import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "@/Layouts/Accueil/Navbar";
import Footer from "@/Layouts/Accueil/Footer";

export default function StProfile() {
    const { auth } = usePage().props;
    const user = auth.user;
    const profile = user.profile;

    const [activeTab, setActiveTab] = useState("profil");

    const handleEditerProfil = () => {
        Inertia.visit(`/user-profile/create`);
    };

    const handleCompleterProfil = () => {
        Inertia.visit(`/user-profile/create`);
    };

    const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            router.post(route('logout'));
        }
    };

    return (
        <>
            <Navbar />
            <Head title="Mon Profil" />

            <div className="container py-2">
                {/* Header Section */}
                <div className="row mb-2">
                    <div className="col-12 text-center">
                        <h1 className="fw-bold display-6 mb-3 " style={{ color: '#2c3e50' }}>Mon Profil</h1>
                        <div className="d-flex justify-content-center">
                            <div style={{ width: '100px', height: '4px', backgroundColor: '#3498db' }}></div>
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                            {/* Card Header */}
                            <div className="card-header bg-primary text-white py-4">
                                <div className="d-flex justify-content-between align-items-center montserrat-regulier">
                                    <h2 className="h6 mb-0">Informations du compte</h2>
                                    <div className="d-flex gap-2" >
                                        {profile ? (
                                            <button
                                                onClick={handleEditerProfil}
                                                className="btn btn-light btn-sm rounded-pill px-2"
                                            >
                                                <i className="bi bi-pencil me-2"></i>Modifier
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleCompleterProfil}
                                                className="btn btn-warning btn-sm rounded-pill px-2"
                                            >
                                                <i className="bi bi-plus-circle me-2"></i>Compléter
                                            </button>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-outline-light btn-sm rounded-pill px-3"
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="card-body p-3 montserrat-normal">
                                <div className="row">
                                    {/* Profile Picture Column */}
                                    {profile?.photo_profil && (
                                        <div className="col-md-3 text-center mb-4 mb-md-0">
                                            <div className="position-relative d-inline-block">
                                                <img
                                                    src={profile.photo_profil}
                                                    alt="Profile"
                                                    className="rounded-circle shadow"
                                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                                />
                                                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-2 border border-2 border-white">
                                                    <i className="bi bi-check text-white"></i>
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Profile Info Column */}
                                    <div className={profile?.photo_profil ? "col-md-9" : "col-12"}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <div className="p-3 bg-light rounded-3">
                                                    <small className="text-muted d-block">Nom complet</small>
                                                    <span className="fw-semibold">{user.name}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-3 bg-light rounded-3">
                                                    <small className="text-muted d-block">Email</small>
                                                    <span className="fw-semibold">{user.email}</span>
                                                </div>
                                            </div>

                                            {profile ? (
                                                <>
                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3">
                                                            <small className="text-muted d-block">Téléphone</small>
                                                            <span className="fw-semibold">{profile.numero || '-'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3">
                                                            <small className="text-muted d-block">Date de naissance</small>
                                                            <span className="fw-semibold">{profile.date_naissance || '-'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3">
                                                            <small className="text-muted d-block">Genre</small>
                                                            <span className="fw-semibold">{profile.genre || '-'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="p-3 bg-light rounded-3">
                                                            <small className="text-muted d-block">Pays</small>
                                                            <span className="fw-semibold">{profile.pays || '-'}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="p-3 bg-light rounded-3">
                                                            <small className="text-muted d-block">Adresse</small>
                                                            <span className="fw-semibold">{profile.adresse || '-'}, {profile.ville || '-'}</span>
                                                        </div>
                                                    </div>
                                                    {profile.bio && (
                                                        <div className="col-12">
                                                            <div className="p-3 bg-light rounded-3">
                                                                <small className="text-muted d-block">À propos de moi</small>
                                                                <p className="mb-0">{profile.bio}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="col-12">
                                                    <div className="alert alert-warning rounded-3">
                                                        <div className="d-flex align-items-center">
                                                            <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                                                            <div>
                                                                <h5 className="alert-heading mb-2">Profil incomplet</h5>
                                                                <p className="mb-0">Complétez votre profil pour une meilleure expérience.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="card-footer bg-light py-3">
                                <div className="d-flex justify-content-end">
                                    <small className="text-muted">
                                        Membre depuis {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
