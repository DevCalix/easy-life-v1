import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

const EditRestaurant = ({ restaurant }) => {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    // Formulaire pour les informations générales
    const { data: generalData, setData: setGeneralData, put: updateGeneral, processing: generalProcessing, errors: generalErrors } = useForm({
        nom: restaurant.nom || '',
        adresse: restaurant.adresse || '',
        coordonnees_map: restaurant.coordonnees_map || '',
        numero_telephone: restaurant.numero_telephone || '',
        horaires_ouverture: restaurant.horaires_ouverture || '',
        rating: restaurant.rating ? parseInt(restaurant.rating).toString() : '1',
    });

    // Formulaire pour l'image
    const { data: imageData, setData: setImageData, post: updateImage, processing: imageProcessing, errors: imageErrors } = useForm({
        photo_restaurant: null,
    });

    const [imagePreview, setImagePreview] = useState(

        restaurant.photo_restaurant ? `${restaurant.photo_restaurant}` : null
    );

    // Soumission du formulaire des informations générales
    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        updateGeneral(route('restaurant.update', restaurant.id), {
            onError: (error) => console.error('Erreur:', error),
        });
    };

    // Soumission du formulaire de l'image
    const handleImageSubmit = (e) => {
        e.preventDefault();
        updateImage(route('restaurant.updateImage', restaurant.id), {
            onSuccess: () => {
                setImagePreview(null); // Réinitialiser l'aperçu de l'image
            },
        });
    };

    // Gestion du changement de l'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageData('photo_restaurant', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const renderInputField = (id, label, value, setValue, type = 'text', required = false) => (
        <div className="mb-3">
            <InputLabel htmlFor={id} value={label} />
            <TextInput
                id={id}
                type={type}
                name={id}
                value={value}
                onChange={(e) => setValue(id, e.target.value)}
                required={required}
            />
            <InputError message={generalErrors[id]} className="mt-2" />
        </div>
    );
    console.log(restaurant.rating); // Vérifiez ce qui est transmis dans `props`

    return (
        <>
            <Head title="Modifier un Restaurant" />
            <div className="container py-5">
                <h1 className="mb-4 montserrat-normal fw-bold">Modifier le Restaurant</h1>
                <hr/>
                {/* Formulaire pour les informations générales */}
                <form onSubmit={handleGeneralSubmit} className="mb-5">
                    {renderInputField('nom', 'Nom du Restaurant', generalData.nom, setGeneralData, 'text', true)}
                    {renderInputField('adresse', 'Adresse', generalData.adresse, setGeneralData, 'text', true)}
                    {renderInputField('coordonnees_map', 'Coordonnées de la carte', generalData.coordonnees_map, setGeneralData)}
                    {renderInputField('numero_telephone', 'Numéro de téléphone', generalData.numero_telephone, setGeneralData, 'text', true)}
                    <div className="mb-3">
                        <InputLabel htmlFor="horaires_ouverture" value="Horaires d'ouverture" />
                        <Textarea
                            id="horaires_ouverture"
                            name="horaires_ouverture"
                            value={generalData.horaires_ouverture}
                            onChange={(e) => setGeneralData('horaires_ouverture', e.target.value)}
                            rows="3"
                        />
                        <InputError message={generalErrors.horaires_ouverture} className="mt-2" />
                    </div>
                    <div className="mb-3">
                        <InputLabel htmlFor="rating" value="Rating" />
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
                            value={generalData.rating}
                            onChange={(e) => setGeneralData('rating', e.target.value)}
                        />
                        <InputError message={generalErrors.rating} className="mt-2" />
                    </div>
                    <div className="mb-3">
                        <PrimaryButton disabled={generalProcessing}>
                            {generalProcessing ? 'En cours...' : 'Mettre à jour les Informations'}
                        </PrimaryButton>
                    </div>
                </form>

                {/* Formulaire pour l'image */}
                <form onSubmit={handleImageSubmit}>
                    <h2 className="mb-3">Photo du Restaurant</h2>
                    <div className="mb-3">
                        <InputLabel htmlFor="photo_restaurant" value="Photo du Restaurant" />
                        <FileInput
                            id="photo_restaurant"
                            name="photo_restaurant"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Aperçu de l'image"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>
                        )}
                        <InputError message={imageErrors.photo_restaurant} className="mt-2" />
                    </div>
                    <div className="mb-3">
                        <PrimaryButton disabled={imageProcessing}>
                            {imageProcessing ? 'En cours...' : 'Mettre à jour la Photo'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditRestaurant;
