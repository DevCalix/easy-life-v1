import React, { useEffect, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { usePanier } from "@/Pages/Supermarche/Context/PanierContext";
import { Inertia } from "@inertiajs/inertia";

export default function MarketNavbar() {
    const { props } = usePage();
    const { auth } = props; // Récupérer les informations d'authentification
    const user = auth.user; // Récupérer l'utilisateur connecté
    const { panier, supprimerDuPanier } = usePanier();
    const [position, setPosition] = useState("...");
    const { data, setData, get } = useForm({ q: '' }); // Utilisation de useForm pour gérer la recherche

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
                                        quartier = component.long_name;
                                    }
                                    if (component.types.includes("locality")) {
                                        ville = component.long_name;
                                    }
                                });
                                const positionTexte = `${quartier},${ville}`;
                                setPosition(positionTexte);
                            } else {
                                setPosition("");
                            }
                        })
                        .catch((error) => {
                            console.error("Erreur lors de l'appel à l'API:", error);
                            setPosition("Erreur de géolocalisation");
                        });
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                    setPosition("Erreur de géolocalisation");
                }
            );
        } else {
            setPosition("Géolocalisation non supportée");
        }
    };

    // Utiliser useEffect pour exécuter la géolocalisation lors du rendu
    useEffect(() => {
        obtenirPosition();
    }, []);

    // Calcul du total du panier avec vérification des propriétés
    const totalPanier = panier.reduce((total, item) => {
        const prix = item.prix_unitaire || 0;
        const quantite = item.quantite || 0;
        return total + prix * quantite;
    }, 0);

    // Gestion de la soumission du formulaire de recherche
    const handleSearch = (e) => {
        e.preventDefault();
        get(route('supermarche.recherche', { q: data.q }));
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

                        <Link className="navbar-brand poppins-bold" href="/supermarche">
                            <img
                                src="/images/logo/LOGO-ESAY-LIFE-VERT.png"
                                alt="Easy Life Logo"
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

                        {/* Search */}
                        <form className="d-flex" role="search" style={{ maxWidth: "500px", width: "100%" }} onSubmit={handleSearch}>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="search"
                                    className="form-control border-start-0"
                                    placeholder="Quels produits recherchez-vous ...?"
                                    aria-label="Search"
                                    value={data.q}
                                    onChange={(e) => setData('q', e.target.value)}
                                />
                            </div>
                        </form>
                    </div>

                    {/* Droite : Panier et Connexion */}
                    <div className="d-flex align-items-center">
                        {/* Bouton Télécharger */}
                        <a
                            href="https://play.google.com/store/apps/details?id=com.appservices.easylifehome"
                            className="btn btn-sm ms-auto mx-3 text-white"
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
                                    {panier.length}
                                </span>
                            </button>
                        </div>

                        {/* Compte */}
                        {user ? (
                            <Link
                                href="/supermarche/profile"
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
                        </div>
                    </div>

                    {/* Barre de recherche */}
                    <form className="d-flex flex-grow-1" role="search" onSubmit={handleSearch}>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="search"
                                className="form-control border-start-0"
                                placeholder="Recherchez des produits..."
                                aria-label="Search"
                                value={data.q}
                                onChange={(e) => setData('q', e.target.value)}
                            />
                        </div>
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
                            <li className="nav-item">
                                <Link className="nav-link" href="/supermarche">
                                    Supermarché
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/supermarche#special-offers">
                                    Offres Spéciales
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/supermarche#popular-products">
                                    Produits Populaires
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/supermarche#new-products">
                                    Nouveaux Produits
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={route('panier')}>
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
                        <div className="modal-header">
                            <h5 className="modal-title" id="panierModalLabel">Votre Panier</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                        {panier.length > 0 ? (
                            panier.map((item) => {
                                // Vérifiez que `item.produit` existe
                                if (!item.produit) {
                                    console.error("Produit non trouvé pour l'élément du panier :", item);
                                    return null; // Ignorer cet élément
                                }

                                // Nom du produit ou de la variation
                                const nom = item.variation
                                    ? `${item.produit.nom} - ${item.variation.valeur_variation}`
                                    : item.produit.nom;

                                // Prix unitaire
                                const prixUnitaire = item.prix_unitaire || 0;

                                // Quantité
                                const quantite = item.quantite || 0;

                                // Prix total pour cet élément
                                const prixTotal = prixUnitaire * quantite;

                                return (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-3">
                                        <div>
                                            <h6 className="fw-bold mb-0">{nom}</h6>
                                            <p className="text-muted mb-0">{quantite} x {prixUnitaire.toLocaleString()} FCFA</p>
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

                        <div className="modal-footer">
                            <p className="fw-bold me-auto">Total : {totalPanier.toLocaleString()} FCFA</p>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Fermer
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => Inertia.visit(route('panier'))}
                            >
                                Voir le panier
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}
