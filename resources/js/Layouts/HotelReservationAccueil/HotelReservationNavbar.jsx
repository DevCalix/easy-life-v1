import React from "react";
import "../../../css/hotelReservation/hotelReservationNavbar.css";
import { Link, usePage } from "@inertiajs/react";

const HotelReservationNavbar = () => {
  const { props } = usePage();
  const { auth } = props; // Récupérer les informations d'authentification
  const user = auth.user; // Récupérer l'utilisateur connecté

  // Fonction pour forcer un rechargement
  const handleReload = (url) => {
    window.location.href = url; // Forcer un rechargement
  };

  return (
    <>
      <header className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo et bouton Menu */}
          <div className="d-flex align-items-center">
            {/* Bouton toggle (toujours visible) */}
            <button
              className="btn btn-outline-primary d-flex align-items-center me-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
                menu
              </span>
            </button>

            {/* Logo */}
            <a className="navbar-brand d-flex align-items-center" href="/reservation-hotel">
              <img
                src="/images/logo/LOGO-ESAY-LIFE-VIOLET.png"
                alt="Logo"
                style={{ width: "100px" }}
              />
            </a>
          </div>

          {/* Icônes (toujours sur la même ligne) */}
          <div className="d-flex align-items-center montserrat-normal">
            {/* Bouton Télécharger */}
            <a
                href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome"
                className="btn btn-sm ms-auto mx-3 text-white tel"
                target="_blank"
                rel="noopener noreferrer"
                style={{backgroundColor:"#5F2698"}}
                >
                Télécharger
            </a>
            {/* Compte */}
            {user ? (
              <Link
                href={ route('hotel.profile') }
                className="d-flex align-items-center text-decoration-none text-dark"
              >
                <i className="bi bi-person-circle fs-4 me-2"></i>
                <span className="d-none d-lg-inline montserrat">{user.name}</span>
              </Link>
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
      </header>

      {/* Offcanvas Menu */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasMenuLabel" className="text-white bg-primary p-2">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled poppins-light">
            {/* Liens utiles pour la navigation */}
            <li>
              <Link
                href="/reservation-hotel"
                className="text-decoration-none text-dark"
                onClick={(e) => {
                  e.preventDefault(); // Empêcher le comportement par défaut de Link
                  handleReload('/reservation-hotel'); // Forcer un rechargement
                }}
              >
                Accueil
              </Link>
              <hr className="border border-primary border-1" />
            </li>

            <li>
              <Link
                href="/reservation-hotel/statut-reservations"
                className="text-decoration-none text-dark"
                onClick={(e) => {
                  e.preventDefault(); // Empêcher le comportement par défaut de Link
                  handleReload('/reservation-hotel/statut-reservations'); // Forcer un rechargement
                }}
              >
                Statut de réservation
              </Link>
            </li>
            <li>
              <Link
                href={route('aide-et-assistance')}
                className="text-decoration-none text-dark"
              >
                Aide & Assistance
              </Link>
            </li>


          </ul>
        </div>
      </div>
    </>
  );
};

export default HotelReservationNavbar;
