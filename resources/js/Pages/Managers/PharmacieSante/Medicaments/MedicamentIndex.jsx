import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import PharmaLayout from '@/Layouts/Managers/PharmaLayout';


const MedicamentIndex = () => {
    const { medicaments, pharmacies, flash } = usePage().props;

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

    // États pour les filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPharmacie, setSelectedPharmacie] = useState('');
    const [filteredMedicaments, setFilteredMedicaments] = useState(medicaments);


    useEffect(() => {
        let results = medicaments;

        // Appliquer le filtre de recherche
        if (searchTerm) {
            results = results.filter(medicament =>
                medicament.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicament.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Appliquer le filtre par pharmacie
        if (selectedPharmacie) {
            results = results.filter(medicament =>
                medicament.pharmacie?.id === parseInt(selectedPharmacie)
            );
        }

        setFilteredMedicaments(results);
    }, [searchTerm, selectedPharmacie, medicaments]);

    const handleDelete = (slug) => {
            if (confirm("Voulez-vous vraiment supprimer cette pharmacie ?")) {
                Inertia.delete(route('sts-medicaments.destroy', slug), {
                    preserveScroll: true,
                });
            }
        };

    return (
        <PharmaLayout title="Liste des Médicaments">
            
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Liste des Médicaments</h1>
                    <Link href={route('sts-medicaments.create')} className="btn btn-primary montserrat-normal">
                        Ajouter un Médicament
                    </Link>
                </div>
                <hr className="border border-warning border-3 opacity-75" />

                {/* Filtres */}
                <div className="row mb-4">
                    {/* Filtre par recherche */}
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder="Rechercher un médicament..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control"
                        />
                    </div>

                    {/* Filtre par pharmacie */}
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={selectedPharmacie}
                            onChange={(e) => setSelectedPharmacie(e.target.value)}
                        >
                            <option value="">Toutes les pharmacies</option>
                            {pharmacies.map((pharmacie) => (
                                <option key={pharmacie.id} value={pharmacie.id}>
                                    {pharmacie.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tableau des médicaments */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Pharmacie</th>
                                <th>Catégories</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMedicaments.map((medicament, index) => (
                                <tr key={medicament.id}>
                                    <td>{index + 1}</td>
                                    <td>{medicament.nom}</td>
                                    <td>{medicament.prix} FCFA</td>
                                    <td>{medicament.pharmacie?.nom}</td>
                                    <td>
                                        {medicament.categories.map((categorie) => (
                                            <span key={categorie.id} className="badge bg-secondary me-1">
                                                {categorie.nom}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link href={route('sts-medicaments.edit', medicament.slug)} className="btn btn-warning btn-sm">
                                                Éditer
                                            </Link>
                                            <Link href={route('sts-medicaments.show-variations', medicament.slug)} className="btn btn-info btn-sm">
                                                Variations
                                            </Link>
                                            {/* Gérer les images */}
                                            <Link
                                                href={route('sts-medicaments.show-images', medicament.slug)}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Images
                                            </Link>
                                            {/* Bouton Supprimer */}
                                            <button
                                                onClick={() => handleDelete(medicament.slug)}
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

export default MedicamentIndex;
