import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import SelectInputTom from '@/Components/SelectInputTom';
import Checkbox from '@/Components/Checkbox';
import AdminLayout from '@/Layouts/Admin/AdminLayout';


const EditRepas = ({ repas, categories, restaurants, tags: initialTags }) => {
    // Gestion du formulaire pour les données du repas
    const { data, setData, put, processing, errors } = useForm({
        restaurant_id: repas.restaurant_id,
        categorie_repas_id: repas.categorie_repas_id,
        nom: repas.nom,
        description: repas.description,
        prix: repas.prix,
        reduction: repas.reduction,
        prix_reduit: repas.prix_reduit,
        rating: repas.rating,
        est_populaire: repas.est_populaire,
        tags: repas.tags.map(tag => tag.id), // IDs des tags sélectionnés
    });

    // Gestion du formulaire pour l'image
    const { data: imageData, setData: setImageData, post: updateImage, processing: imageProcessing, errors: imageErrors, reset: resetImageForm } = useForm({
        photo: null,
    });

    // États pour la gestion des tags
    const [tags, setTags] = useState(initialTags);
    const [isAddingNewTag, setIsAddingNewTag] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [loadingTag, setLoadingTag] = useState(false);
    const [tagError, setTagError] = useState('');

    // Aperçu de l'image
    const [imagePreview, setImagePreview] = useState(repas.photo ? `/storage/${repas.photo}` : null);

    // Calcul du prix réduit en fonction de la réduction
    useEffect(() => {
        const prixReduit = calculatePrixReduit(data.prix, data.reduction);
        setData('prix_reduit', prixReduit);
    }, [data.prix, data.reduction]);

    // Fonction pour calculer le prix réduit
    const calculatePrixReduit = (prix, reduction) => {
        if (reduction && prix) {
            return prix - (prix * reduction) / 100;
        }
        return '';
    };

    // Gestion de la soumission du formulaire des données du repas
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/commande-repas/repas/${repas.id}`, {
            onSuccess: () => {
                router.visit('/commande-repas/repas');
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour du repas :', errors);
            },
        });
    };

    // Gestion du changement de l'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageData('photo', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Mettre à jour l'image séparément
    const handleUpdateImage = (e) => {
        e.preventDefault();
        updateImage(route('repas.updateImage', repas.id), {
            onSuccess: () => {
                resetImageForm(); // Réinitialiser le formulaire de l'image
                setImagePreview(null); // Réinitialiser l'aperçu de l'image
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour de l\'image :', errors);
            },
        });
    };

    // Ajouter un nouveau tag
    const handleAddNewTag = async () => {
        if (newTag.trim() === '' || loadingTag) return;

        setLoadingTag(true);
        setTagError('');

        try {
            const response = await axios.post('/commande-repas/repas/tagrepas', {
                nom: newTag,
            });

            if (response.data && response.data.id) {
                setTags([...tags, response.data]);
                setData('tags', [...data.tags, response.data.id]);
                setNewTag('');
                setIsAddingNewTag(false);
            } else {
                setTagError('Réponse inattendue du serveur.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout du tag :', error);
            if (error.response && error.response.status === 422) {
                setTagError('Ce tag existe déjà.');
            } else {
                setTagError('Une erreur est survenue lors de l\'ajout du tag.');
            }
        } finally {
            setLoadingTag(false);
        }
    };

    return (
        <AdminLayout title="Modifier un Repas">
            <div className="container py-2">
                <h1 className="mb-4 montserrat-normal fw-bold">Modifier un Repas</h1>

                {/* Section 1 : Formulaire pour les données du repas */}
                <div className="card mb-4">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Sélection du restaurant */}
                            <div className="mb-3">
                                <InputLabel htmlFor="restaurant_id" value="Restaurant" />
                                <SelectInput
                                    id="restaurant_id"
                                    name="restaurant_id"
                                    options={restaurants.map((restaurant) => ({
                                        value: restaurant.id,
                                        label: restaurant.nom,
                                    }))}
                                    value={data.restaurant_id}
                                    onChange={(e) => setData('restaurant_id', e.target.value)}
                                    required
                                />
                                <InputError message={errors.restaurant_id} className="mt-2" />
                            </div>

                            {/* Sélection de la catégorie de repas */}
                            <div className="mb-3">
                                <InputLabel htmlFor="categorie_repas_id" value="Catégorie de Repas" />
                                <SelectInput
                                    id="categorie_repas_id"
                                    name="categorie_repas_id"
                                    options={categories.map((categorie) => ({
                                        value: categorie.id,
                                        label: categorie.nom,
                                    }))}
                                    value={data.categorie_repas_id}
                                    onChange={(e) => setData('categorie_repas_id', e.target.value)}
                                    required
                                />
                                <InputError message={errors.categorie_repas_id} className="mt-2" />
                            </div>

                            {/* Nom du repas */}
                            <div className="mb-3">
                                <InputLabel htmlFor="nom" value="Nom du Repas" />
                                <TextInput
                                    id="nom"
                                    type="text"
                                    name="nom"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    required
                                />
                                <InputError message={errors.nom} className="mt-2" />
                            </div>

                            {/* Description du repas */}
                            <div className="mb-3">
                                <InputLabel htmlFor="description" value="Description" />
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Prix et réduction */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <InputLabel htmlFor="prix" value="Prix" />
                                    <TextInput
                                        id="prix"
                                        type="number"
                                        name="prix"
                                        value={data.prix}
                                        onChange={(e) => setData('prix', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.prix} className="mt-2" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <InputLabel htmlFor="reduction" value="Réduction (%)" />
                                    <TextInput
                                        id="reduction"
                                        type="number"
                                        name="reduction"
                                        value={data.reduction}
                                        onChange={(e) => setData('reduction', e.target.value)}
                                    />
                                    <InputError message={errors.reduction} className="mt-2" />
                                </div>
                            </div>

                            {/* Prix réduit (calculé automatiquement) */}
                            <div className="mb-3">
                                <InputLabel htmlFor="prix_reduit" value="Prix Réduit" />
                                <TextInput
                                    id="prix_reduit"
                                    type="number"
                                    name="prix_reduit"
                                    value={data.prix_reduit}
                                    disabled
                                />
                            </div>

                            {/* Note du repas */}
                            <div className="mb-3">
                                <InputLabel htmlFor="rating" value="Note" />
                                <TextInput
                                    id="rating"
                                    type="number"
                                    name="rating"
                                    value={data.rating}
                                    onChange={(e) => setData('rating', e.target.value)}
                                    min="0"
                                    max="5"
                                />
                                <InputError message={errors.rating} className="mt-2" />
                            </div>

                            {/* Case à cocher pour indiquer si le repas est populaire */}
                            <div className="mb-3">
                                <Checkbox
                                    id="est_populaire"
                                    name="est_populaire"
                                    checked={data.est_populaire}
                                    onChange={(e) => setData('est_populaire', e.target.checked)}
                                />
                                <InputLabel htmlFor="est_populaire" value="Repas Populaire" />
                                <InputError message={errors.est_populaire} className="mt-2" />
                            </div>

                            {/* Sélection des tags */}
                            <div className="mb-3">
                                <InputLabel htmlFor="tags" value="Tags" />
                                <SelectInputTom
                                    id="tags"
                                    name="tags"
                                    options={tags.map((tag) => ({ value: tag.id, label: tag.nom }))}
                                    value={data.tags}
                                    onChange={(selectedTags) => setData('tags', selectedTags)}
                                />
                                {/* Ajouter un nouveau tag */}
                                <div className="form-check mt-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={isAddingNewTag}
                                        onChange={() => setIsAddingNewTag(!isAddingNewTag)}
                                        id="newTagCheckbox"
                                    />
                                    <label className="form-check-label" htmlFor="newTagCheckbox">
                                        Ajouter un nouveau tag
                                    </label>
                                </div>
                                {isAddingNewTag && (
                                    <>
                                        <div className="mt-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nom du nouveau tag"
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-3"
                                            onClick={handleAddNewTag}
                                            disabled={loadingTag}
                                        >
                                            {loadingTag ? 'Ajout en cours...' : 'Ajouter le tag'}
                                        </button>
                                    </>
                                )}
                                {tagError && <div className="text-danger mt-2">{tagError}</div>}
                                <InputError message={errors.tags} className="mt-2" />
                            </div>

                            {/* Bouton de soumission */}
                            <div className="mb-3">
                                <PrimaryButton disabled={processing}>
                                    Mettre à jour les informations
                                </PrimaryButton>
                            </div>
                            {/* Section 3 : Boutons pour ajouter des images secondaires et des variations */}

                        </form>
                    </div>
                </div>

                {/* Section 2 : Formulaire pour la mise à jour de l'image */}
                <div className="card">
                    <div className="card-header">
                        <h2>Mise à jour de l'image</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleUpdateImage}>
                            <div className="mb-3">
                                <InputLabel htmlFor="photo" value="Photo du Repas" />
                                <FileInput
                                    id="photo"
                                    name="photo"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img src={imagePreview} alt="Aperçu de l'image" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                    </div>
                                )}
                                <InputError message={imageErrors.photo} className="mt-2" />
                                <PrimaryButton disabled={imageProcessing}>
                                    Mettre à jour l'image
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default EditRepas;
