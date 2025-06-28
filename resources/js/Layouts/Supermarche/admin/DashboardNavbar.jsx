import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function DashboardNavbar() {
        const { props } = usePage();
        const { auth } = props; // Récupérer les informations d'authentification
        const user = auth.user; // Récupérer l'utilisateur connecté
    return (
        <nav className="navbar bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                {/* Ligne principale */}
                <div className="d-flex align-items-center justify-content-between w-100">
                    {/* Gauche : Logo et Menu Toggler */}
                    <div className="d-flex align-items-center">
                        <button
                            className="navbar-toggler btn-sm me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                        >
                            <img
                                src="/images/icons/menu_24dp_2FB9EA_FILL0_wght400_GRAD0_opsz24.png"
                                alt="Logo"
                                style={{ height: "1rem" }}
                            />
                        </button>
                        <a className="navbar-brand poppins-bold" href="/supermarche">
                            <img
                                src="/images/logo/LOGO-ESAY.png"
                                alt="Easy Life Logo"
                                style={{ width: "100px", objectFit: "contain" }}
                                className="me-2"
                            />
                        </a>
                    </div>

                    {/* Droite : Compte */}
                    <div className="d-flex align-items-center">
                        {/* Compte */}
                        {user ? (
                            // Si l'utilisateur est connecté, afficher un lien vers le profil
                            <Link
                                href="/profile"
                                className="d-flex align-items-center text-decoration-none text-dark"
                            >
                                <i className="bi bi-person-circle fs-4 me-2"></i>
                                <span className="d-none d-lg-inline montserrat">{user.name}</span>
                            </Link>
                        ) : (
                            // Si l'utilisateur n'est pas connecté, afficher un lien vers la connexion
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

                {/* Menu Offcanvas */}
                <div
                    className="offcanvas offcanvas-start montserrat"
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            Menu Admin
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        {/* Section Supermarché */}
                        <h6 className="text-muted mb-3">Supermarché</h6>
                        <ul className="navbar-nav">
                            {/* Liens pour les produits */}
                            <li className="nav-item">
                                <a className="nav-link" href="/supermarche/produits">
                                    <i className="bi bi-box-seam me-2"></i> Voir les Produits
                                </a>
                            </li>

                            {/* Liens pour les catégories */}
                            <li className="nav-item">
                                <a className="nav-link" href="/supermarche/new-create/categories">
                                    <i className="bi bi-tags me-2"></i> Gérer les Catégories
                                </a>
                            </li>

                            {/* Liens pour les stores */}
                            <li className="nav-item">
                                <a className="nav-link" href="/supermarche/stores">
                                    <i className="bi bi-shop me-2"></i> Voir les Stores
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/supermarche/commandes">
                                    <i className="bi bi-bag-check-fill me-2"></i> Liste des commandes
                                </a>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-3" />

                        {/* Section Restaurant */}
                        <h6 className="text-muted mb-3">Restaurant</h6>
                        <ul className="navbar-nav">
                            {/* Liens pour les repas */}
                            <li className="nav-item">
                                <a className="nav-link" href="/commande-repas/repas">
                                    <i className="bi bi-egg-fried me-2"></i> Voir les Repas
                                </a>
                            </li>

                            {/* Liens pour les catégories de repas */}
                            <li className="nav-item">
                                <a className="nav-link" href="/commande-repas/categorie-repas">
                                    <i className="bi bi-list-task me-2"></i> Gérer les Catégories
                                </a>
                            </li>

                            {/* Liens pour les restaurants */}
                            <li className="nav-item">
                                <a className="nav-link" href="/commande-repas/restaurant">
                                    <i className="bi bi-shop me-2"></i> Voir les Restaurants
                                </a>
                            </li>

                            {/* Liens pour les réservations */}
                            <li className="nav-item">
                                <a className="nav-link" href="/commande-repas/reservations-liste">
                                    <i className="bi bi-calendar-check me-2"></i> Liste des Réservations
                                </a>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-3" />

                        {/* Section Réservation Hôtel (regroupement) */}
                        <h6 className="text-muted mb-3">Réservation Hôtel</h6>
                        <ul className="navbar-nav">
                            {/* Sous-section Hôtels */}
                            <li className="nav-item">
                                <a className="nav-link" href="/reservation-hotel/hotels">
                                    <i className="bi bi-building me-2"></i> Voir les Hôtels
                                </a>
                            </li>

                            {/* Sous-section Chambres */}
                            <li className="nav-item">
                                <a className="nav-link" href="/reservation-hotel/chambres">
                                    <i className="bi bi-door-open me-2"></i> Voir les Chambres
                                </a>
                            </li>

                            {/* Sous-section Promotions */}
                            <li className="nav-item">
                                <a className="nav-link" href="/reservation-hotel/promotions">
                                    <i className="bi bi-percent me-2"></i> Voir les Promotions
                                </a>
                            </li>
                            {/* Liste des reservation */}
                            <li className="nav-item">
                                <a className="nav-link" href="/reservation-hotel/reservations">
                                    <i className="bi bi-calendar-check me-2"></i> Voir les Réservations
                                </a>
                            </li>
                        </ul>

                        {/* Divider */}
                        <hr className="my-3" />

                        {/* Section Pharmacie */}
                        <h6 className="text-muted mb-3">Pharmacie</h6>
                        <ul className="navbar-nav">
                            {/* Liens pour les pharmacies */}
                            <li className="nav-item">
                                <a className="nav-link" href="/pharmacie-sante/pharmacie">
                                    <i className="bi bi-shop me-2"></i> Voir les Pharmacies
                                </a>
                            </li>

                            {/* Liens pour les catégories de médicaments */}
                            <li className="nav-item">
                                <a className="nav-link" href="/pharmacie-sante/medoc-categorie/create">
                                    <i className="bi bi-tags me-2"></i> Gérer les Catégories
                                </a>
                            </li>

                            {/* Liens pour les médicaments */}
                            <li className="nav-item">
                                <a className="nav-link" href="/pharmacie-sante/medicaments">
                                    <i className="bi bi-capsule me-2"></i> Voir les Médicaments
                                </a>
                            </li>

                            {/* Liens pour les hôpitaux */}
                            <li className="nav-item">
                                <a className="nav-link" href="/pharmacie-sante/hopitaux">
                                    <i className="bi bi-hospital me-2"></i> Voir les Hôpitaux
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={route('admin.commandes.pharmacie')}>
                                    <i className="bi bi-bag-check me-2"></i> Voir les Commandes
                                </a>
                            </li>


                        </ul>
                        {/* Divider */}
                        <hr className="my-3" />
                        {/* Section Pharmacie */}
                        <h6 className="text-muted mb-3">Global</h6>
                        <ul className="navbar-nav">
                            {/* Liens pour les pharmacies */}
                            {/* <li className="nav-item">
                                <a className="nav-link" href={route('banners.index')}>
                                    <i className="bi bi-image me-2"></i> Bannierre
                                </a>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href={route('banniere.index')}>
                                    <i className="bi bi-image me-2"></i> Bannierre 2
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={route('popups.index')}>
                                    <i className="bi bi-window me-2"></i> Popup
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={route('admin.contact-number.edit')}>
                                    <i className="bi bi-whatsapp me-2"></i> Numero Whatsapp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
