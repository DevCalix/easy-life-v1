import { Link } from "@inertiajs/react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
      <Link className="navbar-brand  poppins-bold" href="/">
            <img
                src="/images/logo/LOGO-ESAY-LIFE-VERT.png"
                alt="Easy Life Logo"
                style={{ width: "100px", objectFit: "contain" }}
                className="me-2"
              />
        </Link>
        <a
            href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome"
            className="btn btn-sm ms-auto mx-3 text-white"
            target="_blank"
            rel="noopener noreferrer"
            style={{backgroundColor:"#04C04A"}}
            >
            Télécharger
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="material-symbols-outlined">
                menu
            </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex justify-content-center mx-auto mb-2 mb-lg-0 poppins-medium">
            <li className="nav-item montserrat-normal">
              <a className="nav-link active" aria-current="page" href="#">Accueil</a>
            </li>
            <li className="nav-item montserrat-normal dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu">
              <li><a className="dropdown-item" href={route('accueil.restaurant')}>Livraison de repas</a></li>
                <li><a className="dropdown-item" href={route('accueil.pharmacie')}>Livraison de médicaments</a></li>
                <li><a className="dropdown-item" href={route('supermarche.accueil')}>Courses au supermarché</a></li>
                <li><a className="dropdown-item" href={route('reservation-hotel.accueil')}>Réservation d’hôtels</a></li>
                <li><hr className="dropdown-divider" /></li>
                
              </ul>
            </li>

            <li className="nav-item montserrat-normal">
              <a className="nav-link" href="#">Offres Spéciales</a>
            </li>
            <li className="nav-item montserrat-normal">
              <a className="nav-link" href="#">Aide & Support </a>
            </li>
            <li className="nav-item montserrat-normal">
              <a className="nav-link">Contact</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}
