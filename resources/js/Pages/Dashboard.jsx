import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="h4 fw-bold mb-0">Tableau de bord</h2>
            }
        >
            <Head title="Tableau de bord" />

            <div className="container-fluid py-4">
                <div className="row g-4">
                    {/* Section Historique des commandes */}

                    

                    {/* Section Paramètres du compte */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-header" style={{ backgroundColor: '#03C04A', color: '#fff' }}>
                                <h3 className="h5 mb-0">
                                    <i className="bi bi-gear me-2"></i> Paramètres du compte
                                </h3>
                            </div>
                            <div className="card-body">
                                <p className="text-muted">Gérez vos préférences et vos informations personnelles.</p>
                                <a href="#" className="btn btn-outline-primary">
                                    Modifier les paramètres
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Section Déconnexion */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0">
                            <div className="card-header" style={{ backgroundColor: '#03C04A', color: '#fff' }}>
                                <h3 className="h5 mb-0">
                                    <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
                                </h3>
                            </div>
                            <div className="card-body">
                                <p className="text-muted">Vous souhaitez vous déconnecter ?</p>
                                <form action="#" method="POST">
                                    <button type="submit" className="btn btn-outline-danger">
                                        Se déconnecter
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
