import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HopitalIndex = () => {
    const { hopitaux, flash } = usePage().props; // Récupérer les hopitaux depuis les props

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

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cet hopital ?")) {
            Inertia.delete(route('hopitaux.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <DashboardNavbar />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Liste des hôpitaux</h1>
                    <Link href={route('hopitaux.create')} className="btn btn-primary montserrat-normal">
                        Ajouter un hôpital
                    </Link>
                </div>
                <hr className="border border-warning border-3 opacity-75"/>

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
                            {hopitaux.map((hopital, index) => (
                                <tr key={hopital.id}>
                                    <td>{index + 1}</td>
                                    <td>{hopital.nom}</td>
                                    <td>{hopital.adresse}</td>
                                    <td>{hopital.telephone}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            {/* Bouton Éditer */}
                                            <Link
                                                href={route('hopitaux.edit', hopital.id)}
                                                className="btn btn-warning btn-sm"
                                            >
                                                Éditer
                                            </Link>

                                            {/* Gérer les images */}
                                            <Link
                                                href={`/pharmacie-sante/hopitaux/${hopital.id}/images`}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Images
                                            </Link>

                                            {/* Bouton Supprimer */}
                                            <button
                                                onClick={() => handleDelete(hopital.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
        </>
    );
};

export default HopitalIndex;
