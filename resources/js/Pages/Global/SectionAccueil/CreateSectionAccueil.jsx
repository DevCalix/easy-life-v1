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

const CreateSectionAccueil = ({ sectionsDisponibles, appUrl }) => {
    const { data, setData, post, processing, errors } = useForm({
        section: '',
        nom_produit: '',
        prix: 0,
        prix_promotion: 0,
        pourcentage_promotion: 0,
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

    const handlePromoPriceChange = (value) => {
        const prix = parseFloat(data.prix) || 0;
        const promoPrice = parseFloat(value) || 0;
        setData('prix_promotion', promoPrice);

        if (prix > 0) {
            const reduction = ((prix - promoPrice) / prix) * 100;
            setData('pourcentage_promotion', reduction.toFixed(2));
        }
    };

    const handlePromoPercentageChange = (value) => {
        const prix = parseFloat(data.prix) || 0;
        const percentage = parseFloat(value) || 0;
        setData('pourcentage_promotion', percentage);

        if (prix > 0) {
            const promoPrice = prix - (prix * percentage / 100);
            setData('prix_promotion', promoPrice.toFixed(2));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/adds/section', {
            onSuccess: () => router.visit('/adds/section'),
            onError: (errors) => console.error('Erreur lors de la soumission :', errors),
        });
    };

    return (
        <AdminLayout>
            <Head title="Ajouter une Section Accueil" />
            {/* <DashboardNavbar /> */}
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
                                    <InputLabel htmlFor="nom_produit" value="Nom du Produit" />
                                    <TextInput
                                        id="nom_produit"
                                        type="text"
                                        name="nom_produit"
                                        value={data.nom_produit}
                                        onChange={(e) => setData('nom_produit', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nom_produit} className="mt-2" />
                                </div>

                                {/* Prix normal */}
                                <div className="col-md-4">
                                    <InputLabel htmlFor="prix" value="Prix Normal (FCFA)" />
                                    <TextInput
                                        id="prix"
                                        type="number"
                                        name="prix"
                                        value={data.prix}
                                        onChange={(e) => setData('prix', Math.max(0, e.target.value))}
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <InputError message={errors.prix} className="mt-2" />
                                </div>

                                {/* Prix promotion */}
                                <div className="col-md-4">
                                    <InputLabel htmlFor="prix_promotion" value="Prix Promotion (FCFA)" />
                                    <TextInput
                                        id="prix_promotion"
                                        type="number"
                                        name="prix_promotion"
                                        value={data.prix_promotion}
                                        onChange={(e) => handlePromoPriceChange(e.target.value)}
                                        min="0"
                                        step="0.01"
                                    />
                                    <InputError message={errors.prix_promotion} className="mt-2" />
                                </div>

                                {/* Pourcentage de promotion */}
                                <div className="col-md-4">
                                    <InputLabel htmlFor="pourcentage_promotion" value="% Réduction" />
                                    <TextInput
                                        id="pourcentage_promotion"
                                        type="number"
                                        name="pourcentage_promotion"
                                        value={data.pourcentage_promotion}
                                        onChange={(e) => handlePromoPercentageChange(e.target.value)}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                    />
                                    <InputError message={errors.pourcentage_promotion} className="mt-2" />
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

export default CreateSectionAccueil;
