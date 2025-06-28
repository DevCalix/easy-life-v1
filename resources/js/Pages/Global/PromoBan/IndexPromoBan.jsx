import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

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
    ligne_1: 'Carousel ligne 1',
    ligne_2: 'Carousel ligne 2',
    ligne_3: 'Carousel ligne 3',
    gauche: 'Gauche',
    droite: 'Droite',
    sp_ligne_1: 'Market Carousel ligne 1',
    sp_ligne_2: 'Market Carousel ligne 2',
    sp_ligne_3: 'Market Carousel ligne 3',
    sp_gauche: 'Market Gauche',
    sp_droite: 'Market Droite',
    resto_ligne_1: 'Resto Carousel ligne 1',
    resto_ligne_2: 'Resto Carousel ligne 2',
    resto_ligne_3: 'Resto Carousel ligne 3',
    resto_gauche: 'Resto Gauche',
    resto_droite: 'Resto Droite',
    st_ligne_1: 'Pharmacie Carousel ligne 1',
    st_ligne_2: 'Pharmacie Carousel ligne 2',
    st_ligne_3: 'Pharmacie Carousel ligne 3',
    st_gauche: 'Pharmacie Gauche',
    st_droite: 'Pharmacie Droite',
    ht_ligne_1: 'Hotel Carousel ligne 1',
    ht_ligne_2: 'Hotel Carousel ligne 2',
    ht_ligne_3: 'Hotel Carousel ligne 3',
    ht_gauche: 'Hotel Gauche',
    ht_droite: 'Hotel Droite'
};

    return (
        <AdminLayout title="Gestion des Bannières Promotionnelles">

            <div className="container-fluid py-2">
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
        </AdminLayout>
    );
};

export default IndexPromoBan;
