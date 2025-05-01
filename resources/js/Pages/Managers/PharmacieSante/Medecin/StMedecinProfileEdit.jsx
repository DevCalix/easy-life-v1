import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PharmaNavbar from '@/Layouts/PharmacieSante/PharmaNavbar';
import PharmacieFooter from '@/Layouts/PharmacieSante/PharmacieFooter';

const StMedecinProfileEdit = ({ medecin }) => {
    const { data, setData, put, processing, errors } = useForm({
        nom: medecin.nom,
        specialite: medecin.specialite,
        adresse: medecin.adresse,
        telephone: medecin.telephone,
        email: medecin.email,
        carte: medecin.carte,
    });

    const [imagePreview, setImagePreview] = useState(medecin.image_principale ? medecin.image_principale : null);

    // Soumission du formulaire de mise à jour des informations
    const handleUpdateInfo = (e) => {
        e.preventDefault();
        put(route('specialiste-de-sante.update', medecin.id), {
            onSuccess: () => {
                router.visit(route('specialiste-de-sante.update', medecin.id));
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour du profil :', errors);
            },
        });
    };

    // Soumission du formulaire de mise à jour de l'image
    const handleUpdateImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image_principale', data.image_principale);
        router.post(route('medecin.profil.updateImage'), formData, {
            onSuccess: () => {
                router.visit(route('specialiste-de-sante.update', medecin.id));
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour de l\'image :', errors);
            },
        });
    };

    // Gestion de l'image principale
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image_principale', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <PharmaNavbar />
            <Head title="Profil du médecin" />
            <div className="container py-5">
                <div className="row">
                    {/* Colonne de gauche : Image de profil */}
                    <div className="col-md-4">
                        <div className="card shadow p-4 text-center">
                            <h3 className="mb-4 montserrat-normal fw-bold text-primary">Photo de profil</h3>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Photo de profil"
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            )}
                            <form onSubmit={handleUpdateImage}>
                                <FileInput
                                    id="image_principale"
                                    name="image_principale"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                                <InputError message={errors.image_principale} className="mt-2" />
                                <div className="text-center mt-3">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Mettre à jour la photo
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Colonne de droite : Formulaire de mise à jour des informations */}
                    <div className="col-md-8">
                        <div className="card shadow p-4">
                            <h3 className="mb-4 montserrat-normal fw-bold text-success">Informations du profil</h3>
                            <form onSubmit={handleUpdateInfo}>
                                {/* Nom */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="nom" value="Nom complet" />
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

                                {/* Spécialité */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="specialite" value="Spécialité" />
                                    <TextInput
                                        id="specialite"
                                        type="text"
                                        name="specialite"
                                        value={data.specialite}
                                        onChange={(e) => setData('specialite', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.specialite} className="mt-2" />
                                </div>

                                {/* Adresse */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="adresse" value="Adresse professionnelle" />
                                    <TextInput
                                        id="adresse"
                                        type="text"
                                        name="adresse"
                                        value={data.adresse}
                                        onChange={(e) => setData('adresse', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.adresse} className="mt-2" />
                                </div>

                                {/* Téléphone */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="telephone" value="Téléphone" />
                                    <TextInput
                                        id="telephone"
                                        type="text"
                                        name="telephone"
                                        value={data.telephone}
                                        onChange={(e) => setData('telephone', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.telephone} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="email" value="Email professionnel" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Lien de la carte */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="carte" value="Lien de la carte (facultatif)" />
                                    <TextInput
                                        id="carte"
                                        type="text"
                                        name="carte"
                                        value={data.carte}
                                        onChange={(e) => setData('carte', e.target.value)}
                                    />
                                    <InputError message={errors.carte} className="mt-2" />
                                </div>

                                {/* Bouton de soumission */}
                                <div className="text-center mt-4">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Mettre à jour les informations
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <PharmacieFooter />
        </>
    );
};

export default StMedecinProfileEdit;
