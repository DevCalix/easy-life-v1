import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import PiedDePageResto from '@/Layouts/Restaurant/global/PiedDePageResto';

const EditCategorie = ({ categorie }) => {
    // Formulaire pour les informations générales
    const { data: generalData, setData: setGeneralData, put: updateGeneral, processing: generalProcessing, errors: generalErrors } = useForm({
        nom: categorie.nom || '',
        description: categorie.description || '',
    });

    // Formulaire pour l'image
    const { data: imageData, setData: setImageData, post: updateImage, processing: imageProcessing, errors: imageErrors, reset: resetImageForm } = useForm({
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(categorie.image_url || null);

    // Soumission du formulaire des informations générales
    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        updateGeneral(route('categorie-repas.update', categorie.id), {
            onSuccess: () => {
                // Actions après la soumission (facultatif)
            },
        });
    };

    // Soumission du formulaire de l'image
    const handleImageSubmit = (e) => {
        e.preventDefault();
        updateImage(route('categorie-repas.updateImage', categorie.id), {
            onSuccess: () => {
                resetImageForm(); // Réinitialiser le formulaire de l'image
                setImagePreview(null); // Réinitialiser l'aperçu de l'image
            },
        });
    };

    // Gestion du changement de l'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Head title="Modifier une Catégorie" />
            <DashboardNavbar/>
            <div className="container py-5">
                <h1 className="mb-4">Modifier la Catégorie</h1>

                {/* Formulaire pour les informations générales */}
                <form onSubmit={handleGeneralSubmit} className="mb-5">
                    <div className="mb-3">
                        <InputLabel htmlFor="nom" value="Nom de la Catégorie" />
                        <TextInput
                            id="nom"
                            type="text"
                            name="nom"
                            value={generalData.nom}
                            onChange={(e) => setGeneralData('nom', e.target.value)}
                            required
                        />
                        <InputError message={generalErrors.nom} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <InputLabel htmlFor="description" value="Description" />
                        <Textarea
                            id="description"
                            name="description"
                            value={generalData.description}
                            onChange={(e) => setGeneralData('description', e.target.value)}
                            rows="3"
                        />
                        <InputError message={generalErrors.description} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <PrimaryButton disabled={generalProcessing}>
                            {generalProcessing ? 'En cours...' : 'Mettre à jour les Informations'}
                        </PrimaryButton>
                    </div>
                </form>

                {/* Formulaire pour l'image */}
                <form onSubmit={handleImageSubmit}>
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
                        <InputError message={imageErrors.image} className="mt-2" />
                    </div>

                    <div className="mb-3">
                        <PrimaryButton disabled={imageProcessing}>
                            {imageProcessing ? 'En cours...' : 'Mettre à jour l\'Image'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <PiedDePageResto/>
        </>
    );
};

export default EditCategorie;
