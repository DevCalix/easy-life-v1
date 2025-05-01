import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import '../../../css/hotelReservation/PharmaLayout.css';

export default function PharmaLayout({ children, title }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const isActive = (routePattern) => {
        return route().current(routePattern);
    };

    const activeClass = "active bg-primary bg-opacity-10";

    return (
        <div className="pharma-layout">
            <Head title={title} />

            {/* Sidebar fixe */}
            <div className={`sidebar bg-dark text-white ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom border-dark">
                    {!sidebarCollapsed && <span className="fs-6 fw-bold">EasyLife Pro</span>}
                    <button
                        className="btn btn-link text-white p-0"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        title={sidebarCollapsed ? "Agrandir" : "Réduire"}
                    >
                        <i className={`bi bi-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
                    </button>
                </div>

                <ul className="nav flex-column px-2 pb-4 mt-3">
                    <li className="nav-item">
                        <Link
                            href={route('sts-admin.commandes.pharmacie')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('sts-admin.commandes.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-speedometer2 fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Tableau de bord</span>}
                        </Link>
                    </li>

                    <li className="nav-item mt-1">
                        {!sidebarCollapsed && (
                            <div className="text-warning small fw-bold px-3 mb-1 text-uppercase">
                                Gestion
                                <hr className="my-1 border-2 border-warning border-opacity-100" />
                            </div>
                        )}

                        <Link
                            href={route('sts-pharmacie.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('sts-pharmacie.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-box-seam fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Voir les Pharmacies</span>}
                        </Link>

                        <Link
                            href={route('sts-medoc-categorie.create')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('sts-medoc-categorie.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-tags fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Gérer les Catégories</span>}
                        </Link>

                        <Link
                            href={route('sts-medicaments.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('sts-medicaments.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-shop fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Voir les Médicaments</span>}
                        </Link>
                    </li>

                    {!sidebarCollapsed && <hr className="my-3 border-secondary" />}

                    <li className="nav-item">
                        <Link
                            href={route('accueil.pharmacie')}
                            className="nav-link text-white d-flex align-items-center py-3 rounded-3"
                        >
                            <i className="bi bi-house-door fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Retour au site</span>}
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Contenu principal avec défilement */}
            <div className="main-content">
                {/* Topbar fixe */}
                <nav className="navbar navbar-expand navbar-light bg-white shadow-sm sticky-top">
                    <div className="container-fluid">
                        <button
                            className="btn btn-link text-dark me-2"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            title="Menu"
                        >
                            <i className="bi bi-list fs-4"></i>
                        </button>

                        <div className="d-flex align-items-center ms-auto">
                            <span className="me-3 d-none d-sm-inline">Bienvenue, {user?.name}</span>
                            <div className="dropdown">
                                <button
                                    className="btn btn-link text-dark dropdown-toggle"
                                    id="userDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-circle fs-4"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <li><Link className="dropdown-item" href={route('profile.spUser')}>Profil</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" href={route('logout')} method="post">Déconnexion</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Contenu défilant */}
                <main className="main-content-container">
                    {children}
                </main>
            </div>
        </div>
    );
}