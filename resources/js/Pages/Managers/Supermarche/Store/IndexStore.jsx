import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SupermarketLayout from '@/Layouts/Managers/SupermarketLayout';

const StoreIndex = () => {
    const { stores, flash } = usePage().props;

    // Afficher les notifications flash si elles existent
    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        if (flash.error) {
            toast.error(flash.error, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [flash]);

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer ce store ?")) {
            Inertia.delete(route('stores-managers.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Store supprimé avec succès !', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                },
                onError: () => {
                    toast.error('Erreur lors de la suppression du store.', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                },
            });
        }
    };

    return (
        <SupermarketLayout title={"Liste des Stores"}>
            <div className="container py-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h6 fw-bold">Liste des Stores</h1>
                    <Link href={route('stores-managers.create')} className="btn btn-primary">
                        Ajouter un Store
                    </Link>

                </div>
                <hr className="border-2 border-warning opacity-75"/>

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
                            {stores.map((store, index) => (
                                <tr key={store.id}>
                                    <td>{index + 1}</td>
                                    <td>{store.nom}</td>
                                    <td>{store.adresse}</td>
                                    <td>{store.numero_telephone}</td>
                                    <td>
                                        <Link
                                            href={route('stores-managers.edit', store.id)}
                                            className="btn btn-warning btn-sm me-2 my-1"
                                        >
                                            Éditer
                                        </Link>
                                        <Link
                                            href={route('stores-managers.informations-supplementaires.create', store.id)}
                                            className="btn btn-success btn-sm me-2 my-1"
                                        >
                                            Info-Sup
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(store.id)}
                                            className="btn btn-danger btn-sm my-1"
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

            {/* ToastContainer pour afficher les notifications */}
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
        </SupermarketLayout>
    );
};

export default StoreIndex;
