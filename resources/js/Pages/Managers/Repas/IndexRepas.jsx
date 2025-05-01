import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RestauLayout from '@/Layouts/Managers/RestauLayout';

const IndexRepas = () => {
    const { repas, flash } = usePage().props; // Récupérer les repas depuis les props

    // États pour les filtres
    const [filtreNom, setFiltreNom] = useState('');
    const [filtreRestaurant, setFiltreRestaurant] = useState('');
    const [filtreCategorie, setFiltreCategorie] = useState('');
    const [repasFiltres, setRepasFiltres] = useState(repas); // Liste filtrée des repas

    // Filtrer les repas en fonction des filtres
    useEffect(() => {
        let resultatsFiltres = repas;

        // Filtre par nom du repas
        if (filtreNom) {
            resultatsFiltres = resultatsFiltres.filter(repas =>
                repas.nom.toLowerCase().includes(filtreNom.toLowerCase())
            );
        }

        // Filtre par restaurant
        if (filtreRestaurant) {
            resultatsFiltres = resultatsFiltres.filter(repas =>
                repas.restaurant.nom.toLowerCase().includes(filtreRestaurant.toLowerCase())
            );
        }

        // Filtre par catégorie
        if (filtreCategorie) {
            resultatsFiltres = resultatsFiltres.filter(repas =>
                repas.categorie && repas.categorie.nom.toLowerCase().includes(filtreCategorie.toLowerCase())
            );
        }

        setRepasFiltres(resultatsFiltres);
    }, [filtreNom, filtreRestaurant, filtreCategorie, repas]);

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
        if (confirm("Voulez-vous vraiment supprimer ce repas ?")) {
            Inertia.delete(route('mgs-repas.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <RestauLayout title="Liste des Repas">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h6 fw-bold">Liste des Repas</h1>
                    <Link href={route('mgs-repas.create')} className="btn btn-primary">
                        Ajouter un Repas
                    </Link>
                </div>

                {/* Formulaire de filtrage */}
                <div className="mb-4">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                id="filtreNom"
                                className="form-control"
                                value={filtreNom}
                                onChange={(e) => setFiltreNom(e.target.value)}
                                placeholder="Rechercher par nom"
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                id="filtreRestaurant"
                                className="form-control"
                                value={filtreRestaurant}
                                onChange={(e) => setFiltreRestaurant(e.target.value)}
                                placeholder="Rechercher par restaurant"
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                id="filtreCategorie"
                                className="form-control"
                                value={filtreCategorie}
                                onChange={(e) => setFiltreCategorie(e.target.value)}
                                placeholder="Rechercher par catégorie"
                            />
                        </div>
                    </div>
                </div>

                {/* Tableau des repas filtrés */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Restaurant</th>
                                <th>Catégorie</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repasFiltres.map((repas, index) => (
                                <tr key={repas.id}>
                                    <td>{index + 1}</td>
                                    <td>{repas.nom}</td>
                                    <td>{repas.prix} FCFA</td>
                                    <td>{repas.restaurant.nom}</td>
                                    <td>{repas.categorie ? repas.categorie.nom : 'N/A'}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link
                                                href={`/managers/mgs-repas/${repas.repasId}/edit`}
                                                className="btn btn-warning btn-sm"
                                            >
                                                Éditer
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(repas.repasId)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Supprimer
                                            </button>
                                            <Link
                                                href={`/managers/repas/${repas.repasId}/images-secondaires/create`}
                                                className="btn btn-info btn-sm"
                                            >
                                                Images
                                            </Link>
                                            <Link
                                                href={`/managers/repas/${repas.repasId}/variations/create`}
                                                className="btn btn-success btn-sm"
                                            >
                                                Variations
                                            </Link>
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
        </RestauLayout>
    );
};

export default IndexRepas;
