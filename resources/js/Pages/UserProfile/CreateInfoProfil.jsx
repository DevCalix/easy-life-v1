import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Navbar from '@/Layouts/Accueil/Navbar';
import { router } from '@inertiajs/react';
import { Modal } from 'bootstrap';

const CreateInfoProfil = () => {
    const { auth, flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);


    const { data, setData, post, put, processing, errors, reset } = useForm({
        numero: auth.user.profile?.numero || '',
        adresse: auth.user.profile?.adresse || '',
        ville: auth.user.profile?.ville || '',
        pays: auth.user.profile?.pays || '',
        date_naissance: auth.user.profile?.date_naissance || '',
        genre: auth.user.profile?.genre || '',
        bio: auth.user.profile?.bio || '',
        photo_profil: null, // Champ pour l'upload de la photo de profil
    });

    const [imagePreview, setImagePreview] = useState(auth.user.profile?.photo_profil || null);
    const [imageFile, setImageFile] = useState(null);
    const isEditMode = !!auth.user.profile;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            put(route('user-profile.update', auth.user.profile.id), {
                preserveScroll: true,
            });
        } else {
            post(route('user-profile.store'), {
                preserveScroll: true,
            });
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);

        // Prévisualisation
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        // Envoi immédiat de l'image
        const formData = new FormData();
        formData.append('photo_profil', file);
        formData.append('_method', 'patch');

        try {
            await router.post(route('user-profile.update-photo', auth.user.profile?.id), formData, {
                preserveScroll: true,
                onSuccess: () => {
                    // Rafraîchir les données si nécessaire
                },
            });
        } catch (error) {
            console.error('Erreur lors de l\'upload de l\'image:', error);
        }
    };

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        }
    }, [flash]);




    return (
        <>
            <Navbar/>
            <Head title="Compléter mon profil" />
            <div className="container py-2 montserrat-regulier">
                <h1 className="mb-2 montserrat-normal fw-bold">
                    {isEditMode ? 'Modifier mon profil' : 'Compléter mon profil'}
                </h1>
                <hr className="border-warning border-2 opacity-75" />

                <form onSubmit={handleSubmit} className="row g-3">
                    {/* Photo de profil - Upload séparé */}
                    <div className="col-md-4">
                        <div className="mb-3">
                            <InputLabel htmlFor="photo_profil" value="Photo de profil" />
                            <FileInput
                                id="photo_profil"
                                name="photo_profil"
                                onChange={handleImageUpload}
                                accept="image/*"
                            />
                            {imagePreview && (
                                <div className="mt-3 text-center">
                                    <img
                                        src={imagePreview}
                                        alt="Aperçu de la photo de profil"
                                        className="img-thumbnail rounded-circle"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => document.getElementById('photo_profil').click()}
                                    />
                                    <p className="text-muted small mt-2">Cliquez sur l'image pour changer</p>
                                </div>
                            )}
                            <InputError message={errors.photo_profil} className="mt-2" />
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            {/* Numéro de téléphone */}
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="numero" value="Numéro de téléphone" required />
                                <TextInput
                                    id="numero"
                                    type="tel"
                                    name="numero"
                                    value={data.numero}
                                    onChange={(e) => setData('numero', e.target.value)}
                                    placeholder="+225 XX XX XX XX"
                                />
                                <InputError message={errors.numero} className="mt-2" />
                            </div>

                            {/* Genre */}
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="genre" value="Genre" required />
                                <SelectInput
                                    id="genre"
                                    name="genre"
                                    options={[
                                        { value: '', label: 'Sélectionnez...', disabled: true },
                                        { value: 'homme', label: 'Homme' },
                                        { value: 'femme', label: 'Femme' },
                                        { value: 'autre', label: 'Autre' },
                                    ]}
                                    value={data.genre}
                                    onChange={(e) => setData('genre', e.target.value)}
                                />
                                <InputError message={errors.genre} className="mt-2" />
                            </div>
                        </div>

                        {/* Date de naissance */}
                        <div className="mb-3">
                            <InputLabel htmlFor="date_naissance" value="Date de naissance" />
                            <TextInput
                                id="date_naissance"
                                type="date"
                                name="date_naissance"
                                value={data.date_naissance}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setData('date_naissance', e.target.value)}
                            />
                            <InputError message={errors.date_naissance} className="mt-2" />
                        </div>

                        {/* Adresse */}
                        <div className="mb-3">
                            <InputLabel htmlFor="adresse" value="Adresse" />
                            <TextInput
                                id="adresse"
                                type="text"
                                name="adresse"
                                value={data.adresse}
                                onChange={(e) => setData('adresse', e.target.value)}
                                placeholder="Rue, avenue, etc."
                            />
                            <InputError message={errors.adresse} className="mt-2" />
                        </div>

                        {/* Ville et Pays */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="ville" value="Ville" />
                                <TextInput
                                    id="ville"
                                    type="text"
                                    name="ville"
                                    value={data.ville}
                                    onChange={(e) => setData('ville', e.target.value)}
                                />
                                <InputError message={errors.ville} className="mt-2" />
                            </div>

                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="pays" value="Pays" />
                                <TextInput
                                    id="pays"
                                    type="text"
                                    name="pays"
                                    value={data.pays}
                                    onChange={(e) => setData('pays', e.target.value)}
                                />
                                <InputError message={errors.pays} className="mt-2" />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mb-3">
                            <InputLabel htmlFor="bio" value="À propos de moi" />
                            <Textarea
                                id="bio"
                                name="bio"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                rows="3"
                                placeholder="Décrivez-vous en quelques mots..."
                                className="form-control"
                            />
                            <InputError message={errors.bio} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="mb-3">
                            <PrimaryButton disabled={processing}>
                                {processing ? (
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                ) : null}
                                {isEditMode ? 'Mettre à jour' : 'Enregistrer'}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>

            {/* Flash Modal */}
            {showModal && (
                <div className="modal show d-block" id="flashModal" tabIndex="-1" aria-labelledby="flashModalLabel" aria-hidden="false" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className={`modal-header bg-${flash?.type || (flash?.success ? 'success' : 'danger')} text-white`}>
                                <h5 className="modal-title" id="flashModalLabel">
                                    {flash?.success ? 'Succès' : 'Erreur'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                {flash?.success || flash?.error}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default CreateInfoProfil;
