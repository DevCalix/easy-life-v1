import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { props } = usePage();
    const { auth } = props;
    const user = auth.user;

    // Fonction pour déterminer si un lien est actif
    const isActive = (routePattern) => {
        return route().current(routePattern);
    };

    // Classe pour les liens actifs
    const activeClass = "active bg-primary bg-opacity-10";

    return (
        <div className="admin-layout d-flex">
            <Head title={title} />

            {/* Sidebar */}
            <div className={`sidebar bg-dark text-white ${sidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header d-flex justify-content-between align-items-center p-3 border-bottom border-dark">
                    {!sidebarCollapsed && (
                        <Link href="/supermarche" className="text-decoration-none">
                            <img
                                src="/images/logo/LOGO-ESAY-LIFE-VERT.png"
                                alt="Easy Life Logo"
                                style={{ width: '100px', objectFit: 'contain' }}
                            />
                        </Link>
                    )}
                    <button
                        className="btn btn-link text-white p-0"
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        title={sidebarCollapsed ? "Agrandir" : "Réduire"}
                    >
                        <i className={`bi bi-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
                    </button>
                </div>

                <ul className="nav flex-column px-2 pb-4 mt-3">
                    {/* Section Supermarché */}
                    <li className="nav-item mt-1">
                        {!sidebarCollapsed && (
                            <div className="text-warning small fw-bold px-3 mb-1 text-uppercase">
                                Supermarché
                                <hr className="my-1 border-2 border-warning border-opacity-100" />
                            </div>
                        )}

                        <Link
                            href="/supermarche/produits"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('supermarche.produits') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-box-seam fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Produits</span>}
                        </Link>

                        <Link
                            href="/supermarche/new-create/categories"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('supermarche.categories') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-tags fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Catégories</span>}
                        </Link>

                        <Link
                            href="/supermarche/stores"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('supermarche.stores') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-shop fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Stores</span>}
                        </Link>

                        <Link
                            href="/supermarche/commandes"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('supermarche.commandes') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-bag-check-fill fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Commandes</span>}
                        </Link>
                    </li>

                    {/* Section Restaurant */}
                    <li className="nav-item mt-1">
                        {!sidebarCollapsed && (
                            <div className="text-warning small fw-bold px-3 mb-1 text-uppercase">
                                Restaurant
                                <hr className="my-1 border-2 border-warning border-opacity-100" />
                            </div>
                        )}

                        <Link
                            href="/commande-repas/repas"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('commande-repas.repas') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-egg-fried fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Repas</span>}
                        </Link>

                        <Link
                            href="/commande-repas/categorie-repas"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('commande-repas.categorie-repas') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-list-task fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Catégories Repas</span>}
                        </Link>

                        <Link
                            href="/commande-repas/restaurant"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('commande-repas.restaurant') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-shop fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Restaurants</span>}
                        </Link>

                        <Link
                            href="/commande-repas/reservations-liste"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('commande-repas.reservations-liste') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-calendar-check fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Réservations</span>}
                        </Link>
                    </li>

                    {/* Section Hôtel */}
                    <li className="nav-item mt-1">
                        {!sidebarCollapsed && (
                            <div className="text-warning small fw-bold px-3 mb-1 text-uppercase">
                                Hôtel
                                <hr className="my-1 border-2 border-warning border-opacity-100" />
                            </div>
                        )}

                        <Link
                            href="/reservation-hotel/hotels"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('reservation-hotel.hotels') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-building fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Hôtels</span>}
                        </Link>

                        <Link
                            href="/reservation-hotel/chambres"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('reservation-hotel.chambres') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-door-open fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Chambres</span>}
                        </Link>

                        <Link
                            href="/reservation-hotel/promotions"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('reservation-hotel.promotions') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-percent fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Promotions</span>}
                        </Link>

                        <Link
                            href="/reservation-hotel/reservations"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('reservation-hotel.reservations') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-calendar-check fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Réservations</span>}
                        </Link>
                    </li>

                    {/* Section Pharmacie */}
                    <li className="nav-item mt-1">
                        {!sidebarCollapsed && (
                            <div className="text-warning small fw-bold px-3 mb-1 text-uppercase">
                                Pharmacie
                                <hr className="my-1 border-2 border-warning border-opacity-100" />
                            </div>
                        )}

                        <Link
                            href="/pharmacie-sante/pharmacie"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('pharmacie-sante.pharmacie') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-shop fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Pharmacies</span>}
                        </Link>

                        <Link
                            href="/pharmacie-sante/medoc-categorie/create"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('pharmacie-sante.medoc-categorie') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-tags fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Catégories Médicaments</span>}
                        </Link>

                        <Link
                            href="/pharmacie-sante/medicaments"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('pharmacie-sante.medicaments') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-capsule fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Médicaments</span>}
                        </Link>

                        <Link
                            href="/pharmacie-sante/hopitaux"
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('pharmacie-sante.hopitaux') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-hospital fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Hôpitaux</span>}
                        </Link>

                        <Link
                            href={route('admin.commandes.pharmacie')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('admin.commandes.pharmacie') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-bag-check fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Commandes</span>}
                        </Link>
                    </li>

                    {/* Section Globale */}
                    <li className="nav-item mt-1">
                        {!sidebarCollapsed && (
                            <div className="text-warning small fw-bold px-3 mb-1 text-uppercase">
                                Configuration
                                <hr className="my-1 border-2 border-warning border-opacity-100" />
                            </div>
                        )}

                        <Link
                            href={route('section.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('section.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-image fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Section Accueil</span>}
                        </Link>
                        <Link
                            href={route('top-vendeur.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('top-vendeur.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-trophy fs-5"></i>

                            {!sidebarCollapsed && <span className="ms-3">Top Vendeur</span>}
                        </Link>
                        <Link
                            href={route('banniere.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('banniere.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-image fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Bannières</span>}
                        </Link>

                        <Link
                            href={route('popups.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('popups.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-window fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Popups</span>}
                        </Link>

                        <Link
                            href={route('admin.contact-number.edit')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('admin.contact-number.edit') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-whatsapp fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">WhatsApp</span>}
                        </Link>
                        <Link
                            href={route('sous-menu.index')}
                            className={`nav-link text-white d-flex align-items-center py-3 rounded-3 ${
                                isActive('sous-menu.*') ? activeClass : ''
                            }`}
                        >
                            <i className="bi bi-layout-text-sidebar fs-5"></i>
                            {!sidebarCollapsed && <span className="ms-3">Sous menu</span>}
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Contenu principal */}
            <div className="main-content flex-grow-1">
                {/* Topbar */}
                <nav className="navbar bg-white shadow-sm sticky-top">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between w-100">
                            {/* Bouton pour réduire/agrandir la sidebar */}
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-link text-dark me-2"
                                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                    title="Menu"
                                >
                                    <i className="bi bi-list fs-4"></i>
                                </button>
                            </div>

                            {/* Compte utilisateur */}
                            <div className="d-flex align-items-center">
                                {user ? (
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-link text-dark dropdown-toggle d-flex align-items-center"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-person-circle fs-4 me-2"></i>
                                            <span className="d-none d-lg-inline montserrat">{user.name}</span>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                            <li><Link className="dropdown-item" href="/profile">Profil</Link></li>
                                            <li><Link className="dropdown-item" href="#">Paramètres</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link className="dropdown-item" href={route('logout')} method="post">Déconnexion</Link></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="d-flex align-items-center text-decoration-none text-dark"
                                    >
                                        <i className="bi bi-person fs-4 me-2"></i>
                                        <span className="d-none d-lg-inline montserrat">Connexion</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Contenu */}
                <main className="container-fluid py-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
