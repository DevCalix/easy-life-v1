import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const IndexChambre = () => {
    const { chambres, flash } = usePage().props;
    const [search, setSearch] = useState('');
    const [filteredChambres, setFilteredChambres] = useState(chambres);

    // Afficher les messages de succès ou d'erreur
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, { position: "bottom-right", autoClose: 3000 });
        }
        if (flash.error) {
            toast.error(flash.error, { position: "bottom-right", autoClose: 3000 });
        }
    }, [flash.success, flash.error]);

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cette chambre ?")) {
            Inertia.delete(route('chambres.destroy', id), { preserveScroll: true });
        }
    };

    // Fonction de filtrage
    useEffect(() => {
        setFilteredChambres(
            chambres.filter(chambre =>
                chambre.hotel.nom.toLowerCase().includes(search.toLowerCase()) ||
                chambre.numero_chambre.toLowerCase().includes(search.toLowerCase()) ||
                chambre.type.toLowerCase().includes(search.toLowerCase()) ||
                chambre.prix_par_nuit.toString().includes(search) ||
                chambre.capacite.toString().includes(search) ||
                (chambre.est_disponible ? 'disponible' : 'non disponible').includes(search.toLowerCase())
            )
        );
    }, [search, chambres]);

    return (
        <AdminLayout title="Liste des Chambres">

            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Liste des Chambres</h1>
                    <Link href={route('chambres.create')} className="btn btn-primary montserrat-normal">
                        Ajouter une Chambre
                    </Link>
                </div>
                <hr className="border border-warning border-3 opacity-75" />

                {/* Barre de recherche */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher une chambre..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Hôtel</th>
                                <th>Numéro</th>
                                <th>Type</th>
                                <th>Prix par Nuit</th>
                                <th>Capacité</th>
                                <th>Disponibilité</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredChambres.length > 0 ? (
                                filteredChambres.map((chambre, index) => (
                                    <tr key={chambre.id}>
                                        <td>{index + 1}</td>
                                        <td>{chambre.hotel.nom}</td>
                                        <td>{chambre.numero_chambre}</td>
                                        <td>{chambre.type}</td>
                                        <td>{chambre.prix_par_nuit} FCFA</td>
                                        <td>{chambre.capacite}</td>
                                        <td>{chambre.est_disponible ? 'Disponible' : 'Non disponible'}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                {/* Bouton Éditer */}
                                                <Link
                                                    href={route('chambres.edit', chambre.id)}
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    Éditer
                                                </Link>

                                                {/* Gérer les images */}
                                                <Link
                                                    href={`/reservation-hotel/chambres/${chambre.id}/images`}
                                                    className="btn btn-secondary btn-sm"
                                                >
                                                    Images
                                                </Link>

                                                {/* Bouton Supprimer */}
                                                <button
                                                    onClick={() => handleDelete(chambre.id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">Aucune chambre trouvée.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
        </AdminLayout>
    );
};

export default IndexChambre;
