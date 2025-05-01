import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';

const AddVariationForm = ({ produitId, variations }) => {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    const { data, setData, post, processing, errors } = useForm({
        type_variation: '',
        valeur_variation: '',
        prix_additionnel: '',
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [variationToDelete, setVariationToDelete] = useState(null);
    const { flash } = usePage().props;

    // Gestion du changement d'images
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setData('images', files);

            const previews = [];
            files.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    previews.push(reader.result);
                    if (previews.length === files.length) {
                        setImagePreviews(previews);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/supermarche/produits/${produitId}/variations`, {
            onSuccess: () => {
                setData({
                    type_variation: '',
                    valeur_variation: '',
                    prix_additionnel: '',
                    images: [],
                });
                setImagePreviews([]);
            },
        });
    };

    // Gestion de la suppression d'une variation
    const handleDelete = (id) => {
        setVariationToDelete(id);
    };

    // Confirmation de la suppression
    const confirmDelete = () => {
        if (variationToDelete) {
            Inertia.delete(route('produits.variations.destroy', variationToDelete), {
                preserveScroll: true,
                onSuccess: () => {
                    setVariationToDelete(null);
                },
            });
        }
    };

    return (
        <>
            <DashboardNavbar/>
            <div className="container my-4">
                <div className="row">
                    {/* Formulaire d'ajout de variation */}
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white text-center">
                                Ajouter une variation
                            </div>
                            <div className="card-body">
                                {flash.success && (
                                    <div className="alert alert-success">{flash.success}</div>
                                )}
                                {/* Affichage des erreurs globales */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="alert alert-danger mb-3">
                                        <ul className="mb-0">
                                            {Object.entries(errors).map(([key, message]) => (
                                                <li key={key}>{message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    {/* Type de variation */}
                                    <div className="mb-3">
                                        <label htmlFor="type_variation" className="form-label">
                                            Type de variation
                                        </label>
                                        <input
                                            type="text"
                                            id="type_variation"
                                            className="form-control"
                                            value={data.type_variation}
                                            onChange={(e) =>
                                                setData('type_variation', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.type_variation}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Valeur de la variation */}
                                    <div className="mb-3">
                                        <label htmlFor="valeur_variation" className="form-label">
                                            Valeur de la variation
                                        </label>
                                        <input
                                            type="text"
                                            id="valeur_variation"
                                            className="form-control"
                                            value={data.valeur_variation}
                                            onChange={(e) =>
                                                setData('valeur_variation', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.valeur_variation}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Prix additionnel */}
                                    <div className="mb-3">
                                        <label htmlFor="prix_additionnel" className="form-label">
                                            Prix additionnel
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            id="prix_additionnel"
                                            className="form-control"
                                            value={data.prix_additionnel}
                                            onChange={(e) =>
                                                setData('prix_additionnel', e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.prix_additionnel}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Images */}
                                    <div className="mb-3">
                                        <label htmlFor="images" className="form-label">
                                            Images
                                        </label>
                                        <input
                                            type="file"
                                            id="images"
                                            className="form-control"
                                            multiple
                                            onChange={handleImageChange}
                                        />
                                        {imagePreviews.length > 0 && (
                                            <div className="mt-3 d-flex flex-wrap">
                                                {imagePreviews.map((preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview}
                                                        alt={`Preview ${index}`}
                                                        className="img-thumbnail me-2 mb-2"
                                                        style={{ maxHeight: '100px' }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        {/* Afficher les erreurs liées aux images */}
                                        {errors.images && (
                                            <InputError
                                                message={errors.images}
                                                className="mt-2"
                                            />
                                        )}
                                        {errors['images.*'] && (
                                            <InputError
                                                message={errors['images.*']}
                                                className="mt-2"
                                            />
                                        )}
                                    </div>

                                    {/* Bouton de soumission */}
                                    <div className="text-center">
                                        <PrimaryButton disabled={processing}>
                                            {processing ? 'En cours...' : 'Ajouter la variation'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Liste des variations associées */}
                    <div className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header bg-primary text-white text-center">
                                Variations associées
                            </div>
                            <div className="card-body">
                                {variations.length > 0 ? (
                                    <ul className="list-group">
                                        {variations.map((variation) => (
                                            <li
                                                key={variation.id}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <strong>{variation.type_variation} :</strong>{' '}
                                                    {variation.valeur_variation} (+
                                                    {variation.prix_additionnel}€)
                                                    {variation.images && (
                                                        <div className="mt-2 d-flex">
                                                            {variation.images.map((img) => (
                                                                <img
                                                                    key={img.id}
                                                                    src={`${appUrl}${img.url}`}
                                                                    alt="Variation"
                                                                    className="img-thumbnail me-2"
                                                                    style={{
                                                                        maxWidth: '50px',
                                                                        maxHeight: '50px',
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#deleteModal"
                                                    onClick={() => handleDelete(variation.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center">Aucune variation associée.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modale Bootstrap pour la confirmation de suppression */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Confirmer la suppression</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Êtes-vous sûr de vouloir supprimer cette variation ?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                    data-bs-dismiss="modal"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddVariationForm;
