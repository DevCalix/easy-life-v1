import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        image_url: null,
        redirect_url: '',
        statut: true,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image_url', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/supermarche/banners');
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Ajouter une bannière" />
            <div className="container py-5">
                <div className="card shadow p-4">
                    <h1 className="mb-4 text-center montserrat-normal fw-bold">Ajouter une bannière</h1>
                    <form onSubmit={handleSubmit}>
                        {/* URL de redirection */}
                        <div className="mb-3">
                            <InputLabel htmlFor="redirect_url" value="URL de redirection" />
                            <TextInput
                                id="redirect_url"
                                type="text"
                                name="redirect_url"
                                value={data.redirect_url}
                                onChange={(e) => setData('redirect_url', e.target.value)}
                            />
                            <InputError message={errors.redirect_url} className="mt-2" />
                        </div>

                        {/* Image de la bannière */}
                        <div className="mb-3">
                            <InputLabel htmlFor="image_url" value="Image de la bannière" />
                            <FileInput
                                id="image_url"
                                name="image_url"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-3 text-center">
                                    <img src={imagePreview} alt="Aperçu" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                </div>
                            )}
                            <InputError message={errors.image_url} className="mt-2" />
                        </div>

                        {/* Statut de la bannière */}
                        <div className="mb-3">
                            <InputLabel htmlFor="statut" value="Statut" />
                            <select
                                id="statut"
                                name="statut"
                                value={data.statut}
                                onChange={(e) => setData('statut', e.target.value === 'true')}
                                className="form-select"
                            >
                                <option value={true}>Actif</option>
                                <option value={false}>Inactif</option>
                            </select>
                            <InputError message={errors.statut} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="d-flex justify-content-center">
                            <PrimaryButton disabled={processing}>
                                Ajouter la bannière
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Create;
