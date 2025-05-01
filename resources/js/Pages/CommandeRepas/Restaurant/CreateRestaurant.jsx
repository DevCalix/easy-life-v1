import React, { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import { Head, useForm } from '@inertiajs/react';

const CreateRestaurant = () => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        adresse: '',
        coordonnees_map: '',
        numero_telephone: '',
        horaires_ouverture: '',
        rating: '',
        photo_restaurant: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('restaurant.store'));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo_restaurant', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Ajouter un Restaurant" />
            <div className="container py-5">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">Ajouter un Restaurant</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Nom du restaurant */}
                            <div className="mb-4">
                                <InputLabel htmlFor="nom" value="Nom du Restaurant" />
                                <TextInput
                                    id="nom"
                                    type="text"
                                    name="nom"
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="form-control"
                                    placeholder="Entrez le nom du restaurant"
                                    required
                                />
                                <InputError message={errors.nom} />
                            </div>

                            {/* Adresse */}
                            <div className="mb-4">
                                <InputLabel htmlFor="adresse" value="Adresse" />
                                <Textarea
                                    id="adresse"
                                    name="adresse"
                                    value={data.adresse}
                                    onChange={(e) => setData('adresse', e.target.value)}
                                    className="form-control"
                                    placeholder="Entrez l'adresse"
                                    rows="3"
                                    required
                                />
                                <InputError message={errors.adresse} />
                            </div>

                            {/* Coordonnées de la carte */}
                            <div className="mb-4">
                                <InputLabel htmlFor="coordonnees_map" value="Coordonnées de la carte" />
                                <TextInput
                                    id="coordonnees_map"
                                    type="text"
                                    name="coordonnees_map"
                                    value={data.coordonnees_map}
                                    onChange={(e) => setData('coordonnees_map', e.target.value)}
                                    className="form-control"
                                    placeholder="Entrez les coordonnées Google Maps"
                                />
                                <InputError message={errors.coordonnees_map} />
                            </div>

                            {/* Numéro de téléphone */}
                            <div className="mb-4">
                                <InputLabel htmlFor="numero_telephone" value="Numéro de Téléphone" />
                                <TextInput
                                    id="numero_telephone"
                                    type="text"
                                    name="numero_telephone"
                                    value={data.numero_telephone}
                                    onChange={(e) => setData('numero_telephone', e.target.value)}
                                    className="form-control"
                                    placeholder="Entrez le numéro de téléphone"
                                    required
                                />
                                <InputError message={errors.numero_telephone} />
                            </div>

                            {/* Horaires d'ouverture */}
                            <div className="mb-4">
                                <InputLabel htmlFor="horaires_ouverture" value="Horaires d'ouverture" />
                                <Textarea
                                    id="horaires_ouverture"
                                    name="horaires_ouverture"
                                    value={data.horaires_ouverture}
                                    onChange={(e) => setData('horaires_ouverture', e.target.value)}
                                    className="form-control"
                                    placeholder="Exemple : 8h00 - 22h00"
                                    rows="2"
                                />
                                <InputError message={errors.horaires_ouverture} />
                            </div>

                            {/* Note (Rating) */}
                            <div className="mb-4">
                                <InputLabel htmlFor="rating" value="Note (sur 5)" />
                                <SelectInput
                                    id="rating"
                                    name="rating"
                                    options={[
                                        { value: '1', label: '1 étoile' },
                                        { value: '2', label: '2 étoiles' },
                                        { value: '3', label: '3 étoiles' },
                                        { value: '4', label: '4 étoiles' },
                                        { value: '5', label: '5 étoiles' },
                                    ]}
                                    value={data.rating}
                                    onChange={(e) => setData('rating', e.target.value)}
                                    className="form-select"
                                />
                                <InputError message={errors.rating} />
                            </div>

                            {/* Photo du restaurant */}
                            <div className="mb-4">
                                <InputLabel htmlFor="photo_restaurant" value="Photo du Restaurant" />
                                <FileInput
                                    id="photo_restaurant"
                                    name="photo_restaurant"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={imagePreview}
                                            alt="Aperçu"
                                            className="img-thumbnail"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                                <InputError message={errors.photo_restaurant} />
                            </div>

                            {/* Bouton de soumission */}
                            <div className="d-flex justify-content-end">
                                <PrimaryButton disabled={processing} className="btn btn-primary">
                                    {processing ? 'En cours...' : 'Ajouter le Restaurant'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateRestaurant;
