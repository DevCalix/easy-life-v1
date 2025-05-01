import React, { useState } from 'react';
import {Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import RestauLayout from '@/Layouts/Managers/RestauLayout';

const CreateCategorie = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        description: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mgs-categorie-repas.store'), {
            onSuccess: () => {
                reset(); // Réinitialiser le formulaire après la soumission
                setImagePreview(null); // Réinitialiser l'aperçu de l'image
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <RestauLayout title="Ajouter une Catégorie">
            
            <div className="container">
                <h1 className="mb-2 montserrat-normal fw-bold h6">Ajouter une Catégorie</h1>
                <hr className="border-2 border-warning opacity-75" />    
                <form onSubmit={handleSubmit}>
                    {/* Nom de la catégorie */}
                    <div className="mb-3">
                        <InputLabel htmlFor="nom" value="Nom de la Catégorie" />
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

                    {/* Description de la catégorie */}
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

                    {/* Image de la catégorie */}
                    <div className="mb-3">
                        <InputLabel htmlFor="image" value="Image de la Catégorie" />
                        <FileInput
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img src={imagePreview} alt="Aperçu de l'image" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                            </div>
                        )}
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    {/* Bouton de soumission */}
                    <div className="mb-3">
                        <PrimaryButton disabled={processing}>
                            {processing ? 'En cours...' : 'Ajouter la Catégorie'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </RestauLayout>
    );
};

export default CreateCategorie;
