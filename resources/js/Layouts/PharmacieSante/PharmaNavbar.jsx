import React, { useState, useEffect } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import '../../../css/PharmacieSante/pharmaNavbar.css';
import { usePharmaPanier } from "@/Pages/PharmacieSante/Context/PharmaPanierContext"; // Assurez-vous que le chemin est correct

export default function PharmaNavbar() {
  const { props } = usePage();
  const { auth } = props; // Récupérer les informations d'authentification
  const user = auth.user; // Récupérer l'utilisateur connecté
  const { panier = [], supprimerDuPanier, totalPanier } = usePharmaPanier(); // Utiliser le bon contexte

  const [position, setPosition] = useState("...");
  const { data, setData } = useForm({ q: '' });
  const [suggestions, setSuggestions] = useState([]); // État pour stocker les suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // État pour afficher/cacher les suggestions

  // Fonction pour récupérer la position
  const obtenirPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBFRuFVMaepEf5S5-sEkF9moPBlKlmzZus`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "OK" && data.results.length > 0) {
                const components = data.results[0].address_components || [];
                let quartier = "...";
                let ville = "...";

                components.forEach((component) => {
                  if (
                    component.types.includes("neighborhood") ||
                    component.types.includes("sublocality") ||
                    component.types.includes("administrative_area_level_3")
                  ) {
                    quartier = component.long_name; // Quartier
                  }
                  if (component.types.includes("locality")) {
                    ville = component.long_name; // Ville
                  }
                });

                const positionTexte = `${quartier},${ville}`;
                setPosition(positionTexte);
              } else {
                setPosition("Adresse introuvable");
              }
            })
            .catch((error) => {
              setPosition("Erreur de géolocalisation");
            });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setPosition("Autorisation refusée");
              break;
            case error.POSITION_UNAVAILABLE:
              setPosition("Position ...");
              break;
            case error.TIMEOUT:
              setPosition("Temps d'attente dépassé");
              break;
            default:
              setPosition("Erreur inconnue");
              break;
          }
        }
      );
    } else {
      setPosition("Géolocalisation non supportée");
    }
  };

  useEffect(() => {
    obtenirPosition();
  }, []);

  const totalItemsInCart = panier.reduce((acc, item) => {
    const key = `${item.medicament.id}-${item.variation ? item.variation.id : 'none'}`;
    if (!acc.includes(key)) {
        acc.push(key);
    }
    return acc;
  }, []).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (data.q.trim() === '') return;
    setShowSuggestions(false);
    Inertia.visit(route('pharmacie.recherche', { q: data.q }));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (data.q.length > 2) {
        fetchSuggestions(data.q);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [data.q]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`/pharmacie-sante/recherche-suggestions?q=${query}`);
      const results = await response.json();
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setData('q', suggestion.nom);
    setShowSuggestions(false);
    Inertia.visit(route('pharmacie.recherche', { q: suggestion.nom }));
  };

  const handleVoirPanier = () => {
    Inertia.visit("/pharmacie-sante/mon-panier");
  };

  return (
    <nav className="navbar bg-white shadow-sm">
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
            <Link className="navbar-brand poppins-bold" href="/pharmacie-sante">
              <img
                src="/images/logo/LOGO-ESAY-LIFE-VERT.png"
                alt="Restaurant Logo"
                style={{ width: "100px", objectFit: "contain" }}
                className="me-2"
              />
            </Link>
          </div>

          {/* Centre : Delivery, Address et Search */}
          <div className="d-none d-lg-flex align-items-center flex-grow-1 justify-content-center montserrat">
            {/* Adresse */}
            <div className="d-flex align-items-center me-4">
              <i className="bi bi-geo-alt-fill text-primary fs-5 me-2"></i>
              <div>
                <span className="fw-bold" style={{ fontSize: "0.8rem" }}>{position}</span>
                <br />
                <span className="text-muted">Maintenant</span>
              </div>
            </div>

            {/* Barre de recherche */}
            <form className="d-flex search-container" role="search" onSubmit={handleSearch}>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="search"
                  className="form-control border-start-0"
                  placeholder="Recherchez des médicaments ..."
                  aria-label="Search"
                  value={data.q}
                  onChange={(e) => setData('q', e.target.value)}
                />
              </div>

              {/* Suggestions de recherche */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="search-results">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.nom}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Droite : Panier et Connexion */}
          <div className="d-flex align-items-center">
            {/* Bouton Télécharger */}
            <a
                href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome"
                className="btn btn-sm ms-auto mx-3"
                target="_blank"
                rel="noopener noreferrer"
                style={{backgroundColor:"#04C04A"}}
                >
                Télécharger
            </a>
            {/* Panier */}
            <div className="me-4 position-relative">
              <button
                className="btn btn-link p-0"
                data-bs-toggle="modal"
                data-bs-target="#panierModal"
              >
                <i className="bi bi-cart3 fs-4"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItemsInCart}
                </span>
              </button>
            </div>
            {/* Compte */}
            {user ? (
              <Link
                href={route('profile.stUser')}
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

        {/* Ligne secondaire pour mobile */}
        <div className="d-flex d-lg-none align-items-center justify-content-between mt-3 gap-2">
          {/* Adresse */}
          <div className="d-flex align-items-center">
            <i className="bi bi-geo-alt-fill text-primary fs-5 me-2"></i>
            <div>
              <span className="fw-bold" style={{ fontSize: "1rem" }}>{position}</span>
              <br />
            </div>
          </div>

          {/* Barre de recherche */}
          <form className="d-flex flex-grow-1 position-relative" role="search" onSubmit={handleSearch}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control border-start-0"
                placeholder="Recherchez des médicaments ..."
                aria-label="Search"
                value={data.q}
                onChange={(e) => setData('q', e.target.value)}
              />
            </div>

            {/* Suggestions de recherche pour mobile */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-results-mobile">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.nom}
                  </div>
                ))}
              </div>
            )}
          </form>
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
              Menu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              {/* Accueil */}
              <li className="nav-item">
                <Link className="nav-link" href="/pharmacie-sante">
                  Accueil
                </Link>
              </li>

              {/* Médicaments urgents */}
              <li className="nav-item">
                <Link className="nav-link" href="/pharmacie-sante/medicaments-urgents">
                  Médicaments urgents
                </Link>
              </li>

              {/* Catégories */}
              <li className="nav-item">
                <Link className="nav-link" href={route('specialiste.all')}>
                  Prendre rendez-vous avec un medecin
                </Link>
              </li>

              {/* Pharmacies de garde */}
              <li className="nav-item">
                <Link className="nav-link" href="/pharmacie-sante/pharmacies-de-garde">
                  Pharmacies de garde
                </Link>
              </li>

              {/* Panier */}
              <li className="nav-item">
                <Link className="nav-link" href="/pharmacie-sante/panier">
                  Panier
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modale du panier */}
      <div className="modal fade" id="panierModal" tabIndex="-1" aria-labelledby="panierModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* En-tête du modal */}
            <div className="modal-header">
              <h5 className="modal-title" id="panierModalLabel">Votre Panier</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* Corps du modal */}
            <div className="modal-body">
              {panier.length > 0 ? (
                panier.map((item) => {
                  if (!item?.medicament) {
                    return null;
                  }

                  const nomVariation = item?.variation
                    ? `${item.variation.type_variation} : ${item.variation.valeur_variation}`
                    : null;
                  const nom = item.medicament.nom + (nomVariation ? ` (${nomVariation})` : "") || "Médicament sans nom";
                  const prix = item?.variation ? parseFloat(item.variation.prix) : parseFloat(item.medicament.prix);
                  const quantite = item.quantite || 0;
                  const prixTotal = prix * quantite;

                  return (
                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h6 className="fw-bold mb-0">{nom}</h6>
                        <p className="text-muted mb-0">
                          {quantite} x {prix.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div>
                        <p className="fw-bold mb-0">{prixTotal.toLocaleString()} FCFA</p>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => supprimerDuPanier(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted">Votre panier est vide.</p>
              )}
            </div>

            {/* Pied de page du modal */}
            <div className="modal-footer">
              <p className="fw-bold me-auto">
                Total : {totalPanier.toLocaleString()} FCFA
              </p>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Fermer
              </button>
              <button className="btn btn-primary btn-sm" onClick={handleVoirPanier}>
                <i className="bi bi-cart-check me-2"></i> Voir le panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
