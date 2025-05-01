import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import TextInput from '@/Components/TextInput';

const IndexPromoBan = ({ promoBans, filters }) => {
    const [search, setSearch] = useState(filters.search || '');
    const [currentPage, setCurrentPage] = useState(promoBans.current_page);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/adds/banniere', { search }, {
            preserveState: true,
            replace: true
        });
    };

    const toggleStatus = (promoBan) => {
        router.put(`/adds/banniere/${promoBan.id}/toggle`, {
            statut: !promoBan.statut
        });
    };

    const emplacementLabels = {
        ligne_1: 'Ligne 1',
        ligne_2: 'Ligne 2',
        ligne_3: 'Ligne 3',
        gauche: 'Colonne Gauche',
        droite: 'Colonne Droite'
    };

    return (
        <>
            <Head title="Gestion des Bannières Promotionnelles" />
            <DashboardNavbar />
            <div className="container-fluid py-4">
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Bannières Promotionnelles</h5>
                                <div className="d-flex">
                                    <form onSubmit={handleSearch} className="me-3">
                                        <div className="input-group">
                                            <TextInput
                                                type="text"
                                                className="form-control"
                                                placeholder="Rechercher..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            <button className="btn btn-outline-primary" type="submit">
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </form>
                                    <Link href="/adds/banniere/create" className="btn btn-primary">
                                        <i className="bi bi-plus-lg me-1"></i> Nouvelle Bannière
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {promoBans.data.length > 0 ? (
                        promoBans.data.map((promoBan) => (
                            <div key={promoBan.id} className="col-md-4 col-lg-3 mb-4">
                                <div className="card h-100">
                                    <div className="position-relative">
                                        <img
                                            src={promoBan.image}
                                            className="card-img-top"
                                            alt={emplacementLabels[promoBan.emplacement]}
                                            style={{ height: '180px', objectFit: 'cover' }}
                                        />
                                        <div className="position-absolute top-0 end-0 p-2">
                                            <span className={`badge bg-${promoBan.statut ? "success" : "secondary"} text-white`}>
                                                {promoBan.statut ? "Actif" : "Inactif"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {emplacementLabels[promoBan.emplacement]}
                                        </h5>
                                        {promoBan.lien && (
                                            <p className="card-text">
                                                <small className="text-muted">
                                                    Lien: <a href={promoBan.lien} target="_blank" rel="noopener noreferrer">{promoBan.lien}</a>
                                                </small>
                                            </p>
                                        )}
                                    </div>
                                    <div className="card-footer bg-transparent border-top-0">
                                        <div className="d-flex justify-content-between">
                                            <button
                                                onClick={() => toggleStatus(promoBan)}
                                                className="btn btn-sm btn-outline-secondary"
                                                title={promoBan.statut ? 'Désactiver' : 'Activer'}
                                            >
                                                <i className={`bi bi-toggle-${promoBan.statut ? "on" : "off"} text-${promoBan.statut ? "success" : "secondary"}`}></i>
                                            </button>
                                            <div>

                                                <button
                                                    onClick={() => {
                                                        if (confirm('Êtes-vous sûr de vouloir supprimer cette bannière ?')) {
                                                            router.delete(`/adds/banniere/${promoBan.id}`);
                                                        }
                                                    }}
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Supprimer"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-info text-center">
                                Aucune bannière promotionnelle trouvée
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </>
    );
};

export default IndexPromoBan;
