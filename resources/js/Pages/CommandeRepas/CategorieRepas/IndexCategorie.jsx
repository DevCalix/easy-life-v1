import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react'; // Importez usePage depuis @inertiajs/react
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const IndexCategorie = ({ categories }) => {
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

    return (
        <AdminLayout title="Liste des Catégories" >
            
            <div className="container py-1">
                <h1 className="mb-4 montserrat-normal fw-bold">Liste des Catégories</h1>
                <hr className="border-2 border-warning opacity-75" />
                <Link href={route('categorie-repas.create')} className="btn btn-primary mb-3">
                    Ajouter une Catégorie
                </Link>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((categorie) => (
                                <tr key={categorie.id}>
                                    <td>{categorie.nom}</td>
                                    <td>{categorie.description}</td>
                                    <td>
                                        <Link href={route('categorie-repas.edit', categorie.id)} className="btn btn-warning btn-sm me-2">
                                            Éditer
                                        </Link>
                                        <Link
                                            href={route('categorie-repas.destroy', categorie.id)}
                                            method="delete"
                                            as="button"
                                            className="btn btn-danger btn-sm"
                                        >
                                            Supprimer
                                        </Link>
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
        </AdminLayout>
    );
};

export default IndexCategorie;
