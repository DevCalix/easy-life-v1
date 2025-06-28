import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const PharmacieCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        adresse: '',
        heures_ouverture: '',
        telephone: '',
        lien_carte: '',
        image_principale: null,
        note: 0,
        pharmacie_de_garde: false,
    });

    const [imagePreview, setImagePreview] = useState(null);

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

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/pharmacie-sante/pharmacie', {
            onSuccess: () => {
                router.visit('/pharmacie-sante/pharmacie');
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    return (
        <AdminLayout title="Ajouter une Pharmacie">

            <div className="container py-2">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold">Ajouter une Pharmacie</h1>
                    <Link href={route('pharmacie.index')} className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>

                <hr className="border border-danger border-3 opacity-75" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow p-4">
                        {/* Informations générales */}
                        <h5 className="mb-4">Informations générales</h5>

                        {/* Nom de la pharmacie */}
                        <div className="mb-3">
                            <InputLabel htmlFor="nom" value="Nom de la Pharmacie" />
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

                        {/* Adresse */}
                        <div className="mb-3">
                            <InputLabel htmlFor="adresse" value="Adresse" />
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

                        {/* Heures d'ouverture */}
                        <div className="mb-3">
                            <InputLabel htmlFor="heures_ouverture" value="Heures d'ouverture" />
                            <TextInput
                                id="heures_ouverture"
                                type="text"
                                name="heures_ouverture"
                                value={data.heures_ouverture}
                                onChange={(e) => setData('heures_ouverture', e.target.value)}
                                required
                            />
                            <InputError message={errors.heures_ouverture} className="mt-2" />
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

                        {/* Lien de la carte */}
                        <div className="mb-3">
                            <InputLabel htmlFor="lien_carte" value="Lien de la carte (facultatif)" />
                            <TextInput
                                id="lien_carte"
                                type="text"
                                name="lien_carte"
                                value={data.lien_carte}
                                onChange={(e) => setData('lien_carte', e.target.value)}
                            />
                            <InputError message={errors.lien_carte} className="mt-2" />
                        </div>

                        {/* Image Principale */}
                        <div className="mb-3">
                            <InputLabel htmlFor="image_principale" value="Image Principale" />
                            <FileInput
                                id="image_principale"
                                name="image_principale"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-3">
                                    <img src={imagePreview} alt="Aperçu de l'image" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                </div>
                            )}
                            <InputError message={errors.image_principale} className="mt-2" />
                        </div>

                        {/* Note */}
                        <div className="mb-3">
                            <InputLabel htmlFor="note" value="Note (0 à 5)" />
                            <TextInput
                                id="note"
                                type="number"
                                name="note"
                                value={data.note}
                                onChange={(e) => setData('note', e.target.value)}
                                min="0"
                                max="5"
                                step="0.1"
                            />
                            <InputError message={errors.note} className="mt-2" />
                        </div>

                        {/* Pharmacie de garde */}
                        <div className="mb-3">
                            <InputLabel htmlFor="pharmacie_de_garde" value="Pharmacie de garde" />
                            <Checkbox
                                id="pharmacie_de_garde"
                                name="pharmacie_de_garde"
                                checked={data.pharmacie_de_garde}
                                onChange={(e) => setData('pharmacie_de_garde', e.target.checked)}
                            />
                            <InputError message={errors.pharmacie_de_garde} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                Ajouter la Pharmacie
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default PharmacieCreate;
