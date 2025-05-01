import React, { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';

export default function Edit({ banner }) {
    const { props } = usePage();
    const appUrl = props.appUrl;
    const { flash } = props;

    // Formulaire pour l'image de la bannière
    const {
        data: imageData,
        setData: setImageData,
        post: updateImage,
        processing: imageProcessing,
        errors: imageErrors,
        reset: resetImageForm,
    } = useForm({
        promo_banner: null,
    });

    // Formulaire pour l'URL de redirection et le statut
    const {
        data: bannerData,
        setData: setBannerData,
        put: updateBanner,
        processing: bannerProcessing,
        errors: bannerErrors,
    } = useForm({
        redirect_url: banner.redirect_url,
        statut: banner.statut,
    });

    const [imagePreview, setImagePreview] = useState(
        banner.promo_banner ? `${appUrl}${banner.promo_banner}` : null
    );

    // Gestion du changement d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageData('promo_banner', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Soumission du formulaire de l'image
    const handleImageSubmit = (e) => {
        e.preventDefault();
        updateImage(route('banners.update-image', banner.id), {
            preserveScroll: true,
            onSuccess: () => {
                resetImageForm(); // Réinitialiser le formulaire après succès
                setImagePreview(null); // Réinitialiser l'aperçu de l'image
            },
        });
    };

    // Soumission du formulaire de l'URL et du statut
    const handleBannerSubmit = (e) => {
        e.preventDefault();
        updateBanner(route('banners.update', banner.id));
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Modifier la bannière" />
            <div className="container py-5">
                <div className="card shadow p-4">
                    <h1 className="mb-4 text-center montserrat-normal fw-bold">Modifier la bannière</h1>
                    {flash.success && (
                        <div className="alert alert-success">
                            {flash.success}
                        </div>
                    )}

                    {/* Formulaire pour l'image de la bannière */}
                    <div className="mb-5">
                        <h3 className="mb-3">Mettre à jour l'image de la bannière</h3>
                        <form onSubmit={handleImageSubmit}>
                            <div className="mb-3">
                                <InputLabel htmlFor="promo_banner" value="Nouvelle image de la bannière" />
                                <FileInput
                                    id="promo_banner"
                                    name="promo_banner"
                                    onChange={handleImageChange}
                                    className="form-control"
                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                />
                                {imagePreview && (
                                    <div className="mt-3 text-center">
                                        <img
                                            src={imagePreview}
                                            alt="Aperçu"
                                            className="img-thumbnail"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                                {!imagePreview && banner.promo_banner && (
                                    <div className="mt-3 text-center">
                                        <img
                                            src={`${appUrl}${banner.promo_banner}`}
                                            alt="Image actuelle"
                                            className="img-thumbnail"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                                <InputError message={imageErrors.promo_banner} className="mt-2" />
                            </div>
                            <div className="d-flex justify-content-center">
                                <PrimaryButton disabled={imageProcessing}>
                                    {imageProcessing ? 'En cours...' : 'Mettre à jour l\'image'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Formulaire pour l'URL de redirection et le statut */}
                    <div>
                        <h3 className="mb-3">Mettre à jour l'URL et le statut</h3>
                        <form onSubmit={handleBannerSubmit}>
                            {/* URL de redirection */}
                            <div className="mb-3">
                                <InputLabel htmlFor="redirect_url" value="URL de redirection" />
                                <TextInput
                                    id="redirect_url"
                                    type="text"
                                    name="redirect_url"
                                    value={bannerData.redirect_url}
                                    onChange={(e) => setBannerData('redirect_url', e.target.value)}
                                    className="form-control"
                                />
                                <InputError message={bannerErrors.redirect_url} className="mt-2" />
                            </div>

                            {/* Statut de la bannière */}
                            <div className="mb-3">
                                <InputLabel htmlFor="statut" value="Statut" />
                                <select
                                    id="statut"
                                    name="statut"
                                    value={bannerData.statut}
                                    onChange={(e) => setBannerData('statut', e.target.value === 'true')}
                                    className="form-select"
                                >
                                    <option value={true}>Actif</option>
                                    <option value={false}>Inactif</option>
                                </select>
                                <InputError message={bannerErrors.statut} className="mt-2" />
                            </div>

                            {/* Bouton de soumission */}
                            <div className="d-flex justify-content-center">
                                <PrimaryButton disabled={bannerProcessing}>
                                    {bannerProcessing ? 'En cours...' : 'Enregistrer les modifications'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
