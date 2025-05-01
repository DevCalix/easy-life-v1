import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import RestauLayout from '@/Layouts/Managers/RestauLayout';

export default function CommandesIndex() {
    const { commandes, filters, statutOptions } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [statut, setStatut] = useState(filters.statut || '');

    const handleFilter = () => {
        router.get(route('mgs-commandes-repas.index'), {
            search,
            statut,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setSearch('');
        setStatut('');
        router.get(route('mgs-commandes-repas.index'));
    };

    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'livree': return 'bg-success text-white';
            case 'annulee': return 'bg-danger text-white';
            case 'en_cours': return 'bg-warning text-dark';
            case 'en_attente': return 'bg-info text-white';
            default: return 'bg-secondary text-white';
        }
    };

    // Calcul des statistiques
    const stats = {
        totalVentes: commandes.data.reduce((sum, cmd) => sum + cmd.montant_total, 0),
        totalCommandes: commandes.total,
        commandesLivrees: commandes.data.filter(cmd => cmd.statut === 'livree').length,
        commandesEnCours: commandes.data.filter(cmd => cmd.statut === 'en_cours').length,
    };

    return (
        <RestauLayout title="Commandes">
            <Head title="Commandes" />

            <div className="container-fluid py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="mb-1 montserrat-normal fw-bold">Commandes</h1>
                        {commandes.data.length > 0 && (
                            <p className="text-muted mb-0">
                                Affichage de {commandes.from} à {commandes.to} sur {commandes.total} commandes
                            </p>
                        )}
                    </div>
                    <div className="d-flex gap-2">
                        <div className="bg-light p-2 rounded text-center">
                            <small className="text-muted d-block">Total ventes</small>
                            <strong>{stats.totalVentes.toLocaleString()} XAF</strong>
                        </div>
                        <div className="bg-light p-2 rounded text-center">
                            <small className="text-muted d-block">Commandes</small>
                            <strong>{stats.totalCommandes}</strong>
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Référence, client..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                            />
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleFilter}
                            >
                                <i className="bi bi-funnel"></i> Filtrer
                            </button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-select"
                            value={statut}
                            onChange={(e) => setStatut(e.target.value)}
                        >
                            <option value="">Tous les statuts</option>
                            {Object.entries(statutOptions).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button
                            className="btn btn-outline-danger w-100"
                            onClick={resetFilters}
                        >
                            <i className="bi bi-arrow-counterclockwise"></i> Réinitialiser
                        </button>
                    </div>
                </div>

                {/* Liste des commandes */}
                <div className="row">
                    <div className="col-12">
                        {commandes.data.length > 0 ? (
                            <>
                                {commandes.data.map(commande => (
                                    <div key={commande.id} className="card mb-4 shadow-sm">
                                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-0">Commande #{commande.reference}</h5>
                                                <small className="text-muted">
                                                    {commande.date} • {commande.client.nom} • {commande.client.telephone}
                                                </small>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <span className={`badge ${getStatusBadgeClass(commande.statut)}`}>
                                                    {statutOptions[commande.statut]}
                                                </span>
                                                <span className="badge bg-light text-dark">
                                                    {commande.montant_total.toLocaleString()} XAF
                                                </span>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-3 text-muted">Repas commandés</h6>
                                            <ul className="list-group list-group-flush">
                                                {commande.details.map((detail, index) => (
                                                    <li key={index} className="list-group-item border-0 px-0 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 me-3">
                                                                <img
                                                                    src={detail.image || '/images/default-food.png'}
                                                                    alt={detail.repas_nom}
                                                                    className="rounded-2"
                                                                    width="60"
                                                                    height="60"
                                                                />
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex justify-content-between">
                                                                    <h6 className="mb-1">{detail.repas_nom}</h6>
                                                                    <strong>{detail.prix_total.toLocaleString()} XAF</strong>
                                                                </div>
                                                                <small className="text-muted">
                                                                    {detail.variation_nom} • {detail.quantite} × {detail.prix_unitaire.toLocaleString()} XAF
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination */}
                                <nav aria-label="Pagination">
                                    <ul className="pagination justify-content-center">
                                        {commandes.links.map((link, index) => (
                                            <li
                                                key={index}
                                                className={`page-item ${link.active ? 'active' : ''} ${link.url ? '' : 'disabled'}`}
                                            >
                                                <button
                                                    className="page-link"
                                                    onClick={() => {
                                                        if (link.url) {
                                                            router.get(link.url, {
                                                                search,
                                                                statut,
                                                            }, {
                                                                preserveState: true,
                                                                replace: true,
                                                            });
                                                        }
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    disabled={!link.url}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </>
                        ) : (
                            <div className="text-center py-5">
                                <div className="py-5">
                                    <i className="bi bi-receipt text-muted" style={{ fontSize: '3rem' }}></i>
                                    <h5 className="mt-3">Aucune commande trouvée</h5>
                                    <p className="text-muted">Aucune commande ne correspond à vos critères</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </RestauLayout>
    );
}
