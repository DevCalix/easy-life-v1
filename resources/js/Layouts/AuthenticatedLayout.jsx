import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const services = [
        { name: 'Supermarché', icon: 'bi-cart', url: '/supermarche' },
        { name: 'Commander un repas', icon: 'bi-egg-fried', url: '#' },
        { name: 'Médicaments', icon: 'bi-capsule', url: '#' },
        { name: 'Trouver un chauffeur', icon: 'bi-car-front', url: '#' },
        { name: 'Hôtel', icon: 'bi-building', url: '#' },
        { name: 'VTC', icon: 'bi-taxi-front', url: '#' },
    ];

    return (
        <div className="min-h-screen bg-light">
            {/* Barre de navigation */}
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    {/* Logo */}
                    <Link href="/" className="navbar-brand d-flex align-items-center">
                        <ApplicationLogo className="me-2" style={{ height: '40px' }} />
                    </Link>

                    {/* Bouton offcanvas */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar"
                        aria-controls="offcanvasDarkNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Offcanvas */}
                    <div
                        className="offcanvas offcanvas-end text-bg-dark"
                        tabIndex="-1"
                        id="offcanvasDarkNavbar"
                        aria-labelledby="offcanvasDarkNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                                Menu
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            {/* Navigation principale */}
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {/* Services */}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Services
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        {services.map((service, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={service.url}
                                                    className="dropdown-item d-flex align-items-center"
                                                >
                                                    <i className={`bi ${service.icon} me-2`}></i>
                                                    {service.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                {/* Tableau de bord */}
                                <li className="nav-item">
                                    <Link
                                        href={route('dashboard')}
                                        className={`nav-link ${
                                            route().current('dashboard') ? 'active' : ''
                                        }`}
                                    >
                                        <i className="bi bi-speedometer2 me-2"></i>
                                        Tableau de bord
                                    </Link>
                                </li>
                            </ul>

                            {/* Menu utilisateur */}
                            <ul className="navbar-nav mt-3">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="bi bi-person-circle me-2"></i>
                                        {user.name}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li>
                                            <Link
                                                href={route('profile.edit')}
                                                className="dropdown-item"
                                            >
                                                <i className="bi bi-person me-2"></i> Profil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="dropdown-item"
                                            >
                                                <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/* En-tête */}
            {header && (
                <header className="bg-white shadow">
                    <div className="container-fluid py-4">
                        <h1 className="h4 mb-0 text-primary">{header}</h1>
                    </div>
                </header>
            )}

            {/* Contenu principal */}
            <main className="py-4">
                <div className="container-fluid">{children}</div>
            </main>
        </div>
    );
}
