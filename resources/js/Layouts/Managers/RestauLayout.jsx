import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import "../../../css/Restaurant/RestauLayout.css";
export default function RestauLayout({ children, title }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const isActive = (routePattern) => {
        return route().current(routePattern);
    };

    const activeClass = "active bg-primary bg-opacity-10";

    return (
        <div className="restau-layout">
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
                            href={route('mgs-commandes-repas.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('mgs-commandes-repas.*') ? activeClass : ''
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
                            href={route('mgs-repas.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('mgs-repas.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-box-seam fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Voir les Repas</span>}
                        </Link>

                        <Link
                            href={route('mgs-categorie-repas.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('mgs-categorie-repas.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-tags fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Catégories</span>}
                        </Link>

                        <Link
                            href={route('mgs-restaurant.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('mgs-restaurant.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-shop fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Restaurants</span>}
                        </Link>
                    </li>

                    <li className="nav-item mt-1">
                        <Link
                            href={route('mgs-reservations-table.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('mgs-reservations-table.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-bag-check fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Réservations</span>}
                        </Link>
                    </li>

                    {!sidebarCollapsed && <hr className="my-3 border-secondary" />}

                    <li className="nav-item">
                        <Link
                            href={route('accueil.restaurant')}
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