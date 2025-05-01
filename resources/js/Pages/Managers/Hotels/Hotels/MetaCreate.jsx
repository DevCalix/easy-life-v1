import React, { useRef, useState } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import HotelsLayout from '@/Layouts/Managers/HotelLayout';

const MetaCreate = ({ hotel }) => {
    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description: '',
    });

    const { flash } = usePage().props;
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mgs-hotels.informations-supplementaires.store', hotel.id), {
            onSuccess: () => {
                setSuccessMessage("L'information a été ajoutée avec succès !");
                setData({ titre: '', description: '' }); // Réinitialiser le formulaire
            },
        });
    };

    return (
        <HotelsLayout title="Gérer les informations supplémentaires">

            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Informations supplémentaires</h1>
                    <Link href={route('mgs-hotels.index')} className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>

                <hr className="border border-warning border-3 opacity-75" />

                {/* Bouton pour ouvrir le modale */}
                <button className="btn btn-success mb-4" data-bs-toggle="modal" data-bs-target="#metaModal">
                    Ajouter une information
                </button>

                {/* Modale Bootstrap */}
                <div className="modal fade" id="metaModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title montserrat-normal">Ajouter une information</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Affichage des messages d'erreur et de succès */}
                                {successMessage && (
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        {successMessage}
                                        <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)}></button>
                                    </div>
                                )}
                                {flash?.error && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {flash.error}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="titre" className="form-label fw-bold">Titre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="titre"
                                            value={data.titre}
                                            onChange={(e) => setData('titre', e.target.value)}
                                            required
                                        />
                                        {errors.titre && <div className="text-danger mt-2">{errors.titre}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label fw-bold">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            rows="3"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        ></textarea>
                                        {errors.description && <div className="text-danger mt-2">{errors.description}</div>}
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary" disabled={processing}>
                                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Liste des informations supplémentaires */}
                <h2 className="mb-4 fw-bold montserrat-normal">Informations supplémentaires existantes</h2>
                {hotel.metas.length > 0 ? (
                    <div className="card shadow p-4">
                        <ul className="list-group">
                            {hotel.metas.map((meta, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{meta.cle}:</strong> {meta.valeur}
                                    </div>
                                    <Link
                                        href={route('mgs-hotels.informations-supplementaires.destroy', [hotel.id, meta.id])}
                                        method="delete"
                                        as="button"
                                        className="btn btn-danger btn-sm"
                                    >
                                        Supprimer
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="alert alert-info">
                        Aucune information supplémentaire n'a été ajoutée pour cet hôtel.
                    </div>
                )}
            </div>
        </HotelsLayout>
    );
};

export default MetaCreate;
