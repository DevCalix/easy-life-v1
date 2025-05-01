import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';

const CreatePromoBan = () => {
    const { data, setData, post, processing, errors } = useForm({
        image: null,
        lien: '',
        emplacement: '',
        statut: false,
    });

    const emplacements = [
        { label: 'Carousel ligne 1', value: 'ligne_1' },
        { label: 'Carousel ligne 2', value: 'ligne_2' },
        { label: 'Carousel ligne 3', value: 'ligne_3' },
        { label: 'Gauche', value: 'gauche' },
        { label: 'Droite', value: 'droite' },
    ];

    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/adds/banniere', {
            onSuccess: () => {
                router.visit('/adds/banniere');
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Head title="Ajouter une Bannière Promotionnelle" />
            <DashboardNavbar />
            <div className="container">
                <h1 className="mb-4 h6 fw-bold">Ajouter une Bannière Promotionnelle</h1>
                <hr className="border-warning border-3 opacity-75" />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Champ pour l'image */}
                    <div className="mb-3">
                        <InputLabel htmlFor="image" value="Image de la Bannière" />
                        <FileInput
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            required
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Aperçu de la bannière"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>
                        )}
                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    {/* Champ pour le lien */}
                    <div className="mb-3">
                        <InputLabel htmlFor="lien" value="Lien (URL)" />
                        <TextInput
                            id="lien"
                            type="url"
                            name="lien"
                            value={data.lien}
                            onChange={(e) => setData('lien', e.target.value)}
                            placeholder="https://example.com"
                        />
                        <InputError message={errors.lien} className="mt-2" />
                    </div>

                    {/* Champ pour l'emplacement */}
                    <div className="mb-3">
                        <InputLabel htmlFor="emplacement" value="Emplacement" />
                        <select
                            id="emplacement"
                            name="emplacement"
                            value={data.emplacement}
                            onChange={(e) => setData('emplacement', e.target.value)}
                            className="form-select"
                            required
                        >
                            <option value="">Sélectionnez un emplacement</option>
                            {emplacements.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.emplacement} className="mt-2" />
                    </div>

                    {/* Case à cocher pour le statut */}
                    <div className="mb-3">
                        <Checkbox
                            id="statut"
                            name="statut"
                            checked={data.statut}
                            onChange={(e) => setData('statut', e.target.checked)}
                        />
                        <InputLabel htmlFor="statut" value="Activer la bannière" />
                        <InputError message={errors.statut} className="mt-2" />
                    </div>

                    {/* Bouton de soumission */}
                    <div className="mb-3">
                        <PrimaryButton disabled={processing}>
                            {processing ? 'En cours...' : 'Ajouter la Bannière'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreatePromoBan;
