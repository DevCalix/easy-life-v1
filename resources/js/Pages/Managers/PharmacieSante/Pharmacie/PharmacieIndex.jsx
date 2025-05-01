import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PharmaLayout from '@/Layouts/Managers/PharmaLayout';

const PharmacieIndex = () => {
    const { pharmacies, flash } = usePage().props; // Récupérer les pharmacies depuis les props

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
        if (confirm("Voulez-vous vraiment supprimer cette pharmacie ?")) {
            Inertia.delete(route('sts-pharmacie.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <PharmaLayout title="Liste des Pharmacies">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Liste des Pharmacies</h1>
                    <Link href={route('sts-pharmacie.create')} className="btn btn-primary montserrat-normal">
                        Ajouter une Pharmacie
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
                                <th>Pharmacie de garde</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pharmacies.map((pharmacie, index) => (
                                <tr key={pharmacie.id}>
                                    <td>{index + 1}</td>
                                    <td>{pharmacie.nom}</td>
                                    <td>{pharmacie.adresse}</td>
                                    <td>{pharmacie.telephone}</td>
                                    <td>
                                        {pharmacie.pharmacie_de_garde ? (
                                            <span className="badge bg-success">Oui</span>
                                        ) : (
                                            <span className="badge bg-danger">Non</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            {/* Bouton Éditer */}
                                            <Link
                                                href={route('sts-pharmacie.edit', pharmacie.id)}
                                                className="btn btn-warning btn-sm"
                                            >
                                                Éditer
                                            </Link>

                                            {/* Gérer les images */}
                                            <Link
                                                href={`/managers/pharmacies/${pharmacie.id}/images`}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Images
                                            </Link>
                                            {/* Gérer les metas */}
                                            <Link

                                                href={`/managers/pharmacies/${pharmacie.id}/informations-supplementaires/create`}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Info Sup
                                            </Link>

                                            {/* Bouton Supprimer */}
                                            <button
                                                onClick={() => handleDelete(pharmacie.id)}
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
        </PharmaLayout>
    );
};

export default PharmacieIndex;
