import RestauLayout from '@/Layouts/Managers/RestauLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RestaurantIndex = ({ restaurants }) => {
    const { flash } = usePage().props; // Accéder aux messages flash

        // Afficher les messages de succès ou d'erreur
        useEffect(() => {
            if (flash.success) {
                toast.success(flash.success, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
            if (flash.error) {
                toast.error(flash.error, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        }, [flash.success, flash.error]);
    // Fonction pour gérer la suppression d'un restaurant
    const handleDelete = (restaurantId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
            // Envoyer une requête de suppression
            Inertia.delete(route('mgs-restaurant.destroy', restaurantId));
        }
    };

    return (
        <RestauLayout title="Liste des Restaurants">
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h6 fw-bold">Liste des Restaurants</h1>
                    <Link href={route('mgs-restaurant.create')} className="btn btn-primary">
                        Ajouter un Restaurant
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Adresse</th>
                                <th>Téléphone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurants.map((restaurant, index) => (
                                <tr key={restaurant.id}>
                                    <td>{index + 1}</td>
                                    <td>{restaurant.nom}</td>
                                    <td>{restaurant.adresse}</td>
                                    <td>{restaurant.numero_telephone}</td>
                                    <td>
                                        <Link
                                            href={`/managers/mgs-restaurant/${restaurant.random_id}/edit`}
                                            className="btn btn-warning btn-sm m-1"
                                        >
                                            Éditer
                                        </Link>
                                        <Link

                                            href={`/managers/restaurants/${restaurant.random_id}/informations-supplementaires/create`}
                                            className="btn btn-secondary btn-sm m-1"
                                        >
                                            Info Sup
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(restaurant.id)}
                                            className="btn btn-danger btn-sm m-1"
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
            {/* Ajoutez ToastContainer ici */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </RestauLayout>
    );
};

export default RestaurantIndex;
