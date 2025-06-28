import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import '../../../css/accueilStyle/navBar.css';

export default function Navbar({ submenus = [] }) {
  const carouselRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const { props } = usePage();
  const user = props.auth.user;

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollWidth, clientWidth } = carouselRef.current;
      setShowArrows(scrollWidth > clientWidth);
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <>
      {/* NAVBAR PRINCIPALE */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand poppins-bold" href="/">
            <img
              src="/images/logo/LOGO-ESAY-LIFE-VERT.png"
              alt="Easy Life Logo"
              style={{ width: "100px", objectFit: "contain" }}
              className="me-2"
            />
          </Link>

          {/* Section droite visible sur mobile */}
          <div className="d-lg-none d-flex align-items-center ms-auto">
            <a
              href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome"
              className="btn btn-sm text-white me-2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#04C04A" }}
            >
              Télécharger
            </a>
            {user ? (
              <Link
                href="/supermarche/profile"
                className="text-decoration-none text-dark d-flex align-items-center"
              >
                <i className="bi bi-person-circle fs-4 me-1"></i>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-decoration-none text-dark d-flex align-items-center"
              >
                <i className="bi bi-person fs-4 me-1"></i>
              </Link>
            )}
          </div>

          <button
            className="navbar-toggler ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex justify-content-center mx-auto mb-2 mb-lg-0 poppins-medium">
              <li className="nav-item montserrat-normal">
                <Link className="nav-link active" href="/">Accueil</Link>
              </li>
              <li className="nav-item montserrat-normal dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href={route('accueil.restaurant')}>Livraison de repas</Link></li>
                  <li><Link className="dropdown-item" href={route('accueil.pharmacie')}>Livraison de médicaments</Link></li>
                  <li><Link className="dropdown-item" href={route('supermarche.accueil')}>Courses au supermarché</Link></li>
                  <li><Link className="dropdown-item" href={route('reservation-hotel.accueil')}>Réservation d'hôtels</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                </ul>
              </li>
              <li className="nav-item montserrat-normal">
                <Link className="nav-link" href="/offres">Offres Spéciales</Link>
              </li>
              <li className="nav-item montserrat-normal">
                <Link className="nav-link" href="/aide">Aide & Support</Link>
              </li>
              <li className="nav-item montserrat-normal">
                <Link className="nav-link" href="/contact">Contact</Link>
              </li>
            </ul>

            {/* Section droite visible sur desktop */}
            <div className="d-none d-lg-flex align-items-center ms-auto">
              <a
                href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome"
                className="btn btn-sm text-white me-3"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "#04C04A" }}
              >
                Télécharger
              </a>
              {user ? (
                <Link
                  href={route('user-profile.index')}
                  className="d-flex align-items-center text-decoration-none text-dark"
                >
                  <i className="bi bi-person-circle fs-4 me-2"></i>
                  <span className="montserrat">{user.name}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="d-flex align-items-center text-decoration-none text-dark"
                >
                  <i className="bi bi-person fs-4 me-2"></i>
                  <span className="montserrat">Connexion</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* BARRE DE SOUS-MENUS */}
      {submenus.length > 0 && (
        <div className="bg-primary py-2 position-relative submenu-container">
          <div className="container-fluid px-0 mx-2 position-relative">
            {showArrows && (
              <>
                <button
                  className="position-absolute start-0 top-50 translate-middle-y bg-white border-0 text-primary rounded-circle shadow-sm z-3 d-none d-md-flex align-items-center justify-content-center arrow-btn"
                  onClick={() => scroll('left')}
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button
                  className="position-absolute end-0 top-50 translate-middle-y bg-white border-0 text-primary rounded-circle shadow-sm z-3 d-none d-md-flex align-items-center justify-content-center arrow-btn"
                  onClick={() => scroll('right')}
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </>
            )}
            <div ref={carouselRef} className="d-flex overflow-auto scroll-snap submenu-scroller">
              <div className="d-flex flex-nowrap px-3 py-1">
                {submenus.filter(menu => menu.is_active).map((submenu) => {
                  const isExternal = submenu.url.startsWith('http') && !submenu.url.includes(window.location.origin);
                  return isExternal ? (
                    <a key={submenu.id} href={submenu.url} className="text-white text-decoration-none submenu-item" target="_blank" rel="noopener noreferrer">
                      {submenu.title}
                    </a>
                  ) : (
                    <Link key={submenu.id} href={submenu.url} className="text-white text-decoration-none submenu-item">
                      {submenu.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
