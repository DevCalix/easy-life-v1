import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestauLayout from '@/Layouts/Managers/RestauLayout';

const IndexCategorie = ({ categories }) => {
    const { flash } = usePage().props;

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
    }, [flash]);

    return (
        <RestauLayout title="Liste des Catégories">
            <Head title="Gestion des Catégories" />

            <div className="container-fluid px-2">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h1 className="h6 fw-bold text-dark mb-2">Gestion des Catégories</h1>
                        <p className="text-muted mb-0">Organisez vos catégories de plats</p>
                    </div>
                    <Link
                        href={route('mgs-categorie-repas.create')}
                        className="btn btn-primary btn-sm d-flex align-items-center"
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Nouvelle Catégorie
                    </Link>
                </div>

                <div className="row g-2">
                    {categories.length > 0 ? (
                        categories.map((categorie) => (
                            <div key={categorie.id} className="col-md-4 col-lg-3 auto-cols-max">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-img-top overflow-hidden" style={{ height: '180px' }}>
                                        <img
                                            src={categorie.image || '/images/default-category.jpg'}
                                            alt={categorie.nom}
                                            className="w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-dark">{categorie.nom}</h5>
                                        <p className="card-text text-muted">{categorie.description || 'Aucune description'}</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
                                        <Link
                                            href={route('mgs-categorie-repas.edit', categorie.id)}
                                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                                        >
                                            <i className="bi bi-pencil me-1"></i> Éditer
                                        </Link>
                                        <Link
                                            href={route('mgs-categorie-repas.destroy', categorie.id)}
                                            method="delete"
                                            as="button"
                                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                            onClick={(e) => {
                                                if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash me-1"></i> Supprimer
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <img
                                        src="/images/empty-categories.svg"
                                        alt="Aucune catégorie"
                                        className="img-fluid mb-4"
                                        style={{ maxWidth: '300px' }}
                                    />
                                    <h5 className="fw-bold text-muted mb-3">Aucune catégorie disponible</h5>
                                    <p className="text-muted mb-4">Commencez par créer votre première catégorie</p>
                                    <Link
                                        href={route('mgs-categorie-repas.create')}
                                        className="btn btn-primary px-4"
                                    >
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Créer une catégorie
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
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
        </RestauLayout>
    );
};

export default IndexCategorie;
