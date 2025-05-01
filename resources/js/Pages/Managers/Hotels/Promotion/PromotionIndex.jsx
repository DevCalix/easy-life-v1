import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import HotelsLayout from '@/Layouts/Managers/HotelLayout';

const PromotionIndex = () => {
    const { promotions, filters } = usePage().props;

    return (
        <HotelsLayout title = {"Liste des Promotions"}>

            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">Liste des Promotions</h1>
                    <Link href={route('mgs-promotions.create')} className="btn btn-primary montserrat-normal">
                        Faire une promotion
                    </Link>
                </div>

                <hr className="border border-primary border-3 opacity-75 mb-5" />

                {/* Barre de recherche et de tri */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        defaultValue={filters.search}
                        onChange={(e) => {
                            window.location.href = `/hotel/managers/mgs-promotions?search=${e.target.value}`;
                        }}
                        className="form-control"
                    />
                </div>

                {/* Tableau des promotions */}
                <div className="card shadow-lg">
                    <div className="card-body">
                        <table className="table table-striped montserrat-normal">
                            <thead>
                                <tr className="montserrat-normal">
                                    <th>
                                        <Link
                                            href={`/hotel/managers/mgs-promotions?sort_by=date_debut&sort_order=${filters.sort_order === 'asc' ? 'desc' : 'asc'}`}
                                        >
                                            Date de Début
                                        </Link>
                                    </th>
                                    <th>
                                        <Link
                                            href={`/hotel/managers/mgs-promotions?sort_by=date_fin&sort_order=${filters.sort_order === 'asc' ? 'desc' : 'asc'}`}
                                        >
                                            Date de Fin
                                        </Link>
                                    </th>
                                    <th>Pourcentage de Réduction</th>
                                    <th>Hôtel</th>
                                    <th>Chambre</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promotions.data.map((promotion) => (
                                    <tr key={promotion.id}>
                                        <td>{promotion.date_debut}</td>
                                        <td>{promotion.date_fin}</td>
                                        <td>{promotion.pourcentage_reduction}%</td>
                                        <td>{promotion.hotel.nom}</td>
                                        <td>Chambre {promotion.chambre.numero_chambre}</td>
                                        <td>{promotion.description}</td>
                                        <td>
                                            <Link
                                                href={`/hotel/managers/mgs-promotions/${promotion.id}/edit`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Modifier
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Êtes-vous sûr de vouloir supprimer cette promotion ?')) {
                                                        router.delete(`/hotel/managers/mgs-promotions/${promotion.id}`);
                                                    }
                                                }}
                                                className="btn btn-danger btn-sm ms-2"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="card-footer">
                        <nav>
                            <ul className="pagination">
                                {/* Bouton "Précédent" */}
                                <li className={`page-item ${promotions.prev_page_url ? '' : 'disabled'}`}>
                                    <Link
                                        href={promotions.prev_page_url || '#'}
                                        className="page-link"
                                    >
                                        &laquo; Précédent
                                    </Link>
                                </li>

                                {/* Numéros de page */}
                                {Array.from({ length: promotions.last_page }, (_, i) => i + 1).map((page) => (
                                    <li key={page} className={`page-item ${promotions.current_page === page ? 'active' : ''}`}>
                                        <Link
                                            href={`/reservation-hotel/promotions?page=${page}`}
                                            className="page-link"
                                        >
                                            {page}
                                        </Link>
                                    </li>
                                ))}

                                {/* Bouton "Suivant" */}
                                <li className={`page-item ${promotions.next_page_url ? '' : 'disabled'}`}>
                                    <Link
                                        href={promotions.next_page_url || '#'}
                                        className="page-link"
                                    >
                                        Suivant &raquo;
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </HotelsLayout>
    );
};

export default PromotionIndex;
