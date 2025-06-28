import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const CreateTopVendeur = ({ sectionsDisponibles, appUrl }) => {
    const { data, setData, post, processing, errors } = useForm({
        section: 'Top_Vendeur',
        nom: '', // Changé de 'nom_produit' à 'nom'
        description: '', // Ajouté pour correspondre au modèle
        image: null,
        lien_redirection: '',
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/adds/top-vendeur', {
            onSuccess: () => router.visit('/adds/top-vendeur'),
            onError: (errors) => console.error('Erreur lors de la soumission :', errors),
        });
    };

    return (
        <AdminLayout>
            <Head title="Ajouter une Section Accueil" />
            <div className="container-fluid py-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">Ajouter une Section Accueil</h1>
                    <Link href={route('section.index')} className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>

                <hr className="border border-primary border-3 opacity-75 mb-5" />

                <form onSubmit={handleSubmit}>
                    <div className="card shadow-lg p-2">
                        <div className="card-body">
                            <div className="row gy-4">
                                {/* Sélection de la section */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="section" value="Section" />
                                    <SelectInput
                                        id="section"
                                        name="section"
                                        options={[
                                            { value: '', label: 'Sélectionnez une section' },
                                            ...Object.entries(sectionsDisponibles).map(([value, label]) => ({
                                                value,
                                                label
                                            }))
                                        ]}
                                        value={data.section}
                                        onChange={(e) => setData('section', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.section} className="mt-2" />
                                </div>

                                {/* Nom du produit */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="nom" value="Nom du Produit" />
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

                                {/* Description */}
                                <div className="col-md-12">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                {/* Lien de redirection */}
                                <div className="col-md-12">
                                    <InputLabel htmlFor="lien_redirection" value="Lien de Redirection" />
                                    <TextInput
                                        id="lien_redirection"
                                        type="text"
                                        name="lien_redirection"
                                        value={data.lien_redirection}
                                        onChange={(e) => setData('lien_redirection', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.lien_redirection} className="mt-2" />
                                </div>

                                {/* Image du produit */}
                                <div className="col-md-12">
                                    <InputLabel htmlFor="image" value="Image du Produit" />
                                    <FileInput
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                    {imagePreview && (
                                        <div className="mt-3">
                                            <img
                                                src={imagePreview}
                                                alt="Aperçu de l'image"
                                                className="img-thumbnail shadow-sm"
                                                style={{ maxHeight: '150px' }}
                                            />
                                        </div>
                                    )}
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-light text-center mt-3">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer la Section'}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CreateTopVendeur;
