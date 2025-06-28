import React from 'react';
import { Head, Link, router } from '@inertiajs/react'; // Importez router depuis Inertia
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const ListeReservations = ({ reservations }) => {
    // Fonction pour valider une réservation
    const handleValider = (id) => {
        if (confirm('Êtes-vous sûr de vouloir valider cette réservation ?')) {
            router.post(`/commande-repas/reservations/${id}/valider`, {}, {
                onSuccess: () => {
                    toast.success('Réservation validée avec succès !', {
                        position: 'bottom-right',
                        autoClose: 3000,
                    });
                },
                onError: (errors) => {
                    toast.error('Erreur lors de la validation de la réservation.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                    });
                },
            });
        }
    };

    // Fonction pour supprimer une réservation
    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
            router.delete(`/commande-repas/reservations/${id}`, {
                onSuccess: () => {
                    toast.success('Réservation supprimée avec succès !', {
                        position: 'bottom-right',
                        autoClose: 3000,
                    });
                },
                onError: (errors) => {
                    toast.error('Erreur lors de la suppression de la réservation.', {
                        position: 'bottom-right',
                        autoClose: 3000,
                    });
                },
            });
        }
    };

    return (
        <AdminLayout title="Liste des Réservations">
            <ToastContainer />
            <div className="container py-1">
                <h1 className="text-center mb-4 fw-bold montserrat-normal">Liste des Réservations</h1>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nom du Client</th>
                                    <th scope="col">Téléphone</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Heure</th>
                                    <th scope="col">Nombre de Personnes</th>
                                    <th scope="col">Restaurant</th>
                                    <th scope="col">Statut</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                    <tr key={reservation.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{reservation.nom_client}</td>
                                        <td>{reservation.numero_telephone}</td>
                                        <td>{new Date(reservation.date_reservation).toLocaleDateString()}</td>
                                        <td>{reservation.heure_reservation}</td>
                                        <td>{reservation.nombre_personnes}</td>
                                        <td>{reservation.restaurant?.nom}</td>
                                        <td>{reservation.statut}</td>
                                        <td>
                                            {reservation.statut !== 'validée' && (
                                                <button
                                                    className="btn btn-sm btn-success me-2"
                                                    onClick={() => handleValider(reservation.id)}
                                                >
                                                    Valider
                                                </button>
                                            )}
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(reservation.id)}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ListeReservations;
