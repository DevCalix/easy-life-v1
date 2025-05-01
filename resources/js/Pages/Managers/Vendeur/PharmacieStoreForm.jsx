import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import PharmaNavbar from '@/Layouts/PharmacieSante/PharmaNavbar';
import '../../../../css/vendeur/pharmacieStoreForm.css';

const PharmacieStoreForm = () => {
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image_principale', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/managers/sts-pharmacie', {
            onSuccess: () => {
                router.visit('/managers/sts-pharmacie');
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    return (
        <>
            <PharmaNavbar />
            <Head title="Ajouter une Pharmacie" />

            <div className="container py-2">
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                            <div className="card-header bg-gradient-primary text-white py-3">
                                <h2 className="h5 mb-0">Informations de la pharmacie</h2>
                            </div>

                            <div className="card-body p-4 p-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-4">
                                        {/* Colonne gauche */}
                                        <div className="col-md-6">
                                            {/* Nom de la pharmacie */}
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="nom"
                                                    value="Nom de la pharmacie*"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="nom"
                                                    type="text"
                                                    value={data.nom}
                                                    onChange={(e) => setData('nom', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.nom ? 'is-invalid' : ''}`}
                                                    placeholder="Nom officiel de la pharmacie"
                                                    required
                                                />
                                                <InputError message={errors.nom} className="invalid-feedback" />
                                            </div>

                                            {/* Adresse */}
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="adresse"
                                                    value="Adresse complète*"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <Textarea
                                                    id="adresse"
                                                    value={data.adresse}
                                                    onChange={(e) => setData('adresse', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.adresse ? 'is-invalid' : ''}`}
                                                    rows="3"
                                                    placeholder="Adresse précise avec ville et code postal"
                                                    required
                                                />
                                                <InputError message={errors.adresse} className="invalid-feedback" />
                                            </div>

                                            {/* Téléphone */}
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="telephone"
                                                    value="Téléphone*"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="telephone"
                                                    type="text"
                                                    value={data.telephone}
                                                    onChange={(e) => setData('telephone', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.telephone ? 'is-invalid' : ''}`}
                                                    placeholder="Numéro de téléphone principal"
                                                    required
                                                />
                                                <InputError message={errors.telephone} className="invalid-feedback" />
                                            </div>
                                        </div>

                                        {/* Colonne droite */}
                                        <div className="col-md-6">
                                            {/* Heures d'ouverture */}
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="heures_ouverture"
                                                    value="Horaires d'ouverture*"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="heures_ouverture"
                                                    type="text"
                                                    value={data.heures_ouverture}
                                                    onChange={(e) => setData('heures_ouverture', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.heures_ouverture ? 'is-invalid' : ''}`}
                                                    placeholder="Ex: 8h-20h (7j/7)"
                                                    required
                                                />
                                                <InputError message={errors.heures_ouverture} className="invalid-feedback" />
                                            </div>

                                            {/* Lien de la carte */}
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="lien_carte"
                                                    value="Coordonnées GPS (optionnel)"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="lien_carte"
                                                    type="text"
                                                    value={data.lien_carte}
                                                    onChange={(e) => setData('lien_carte', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.lien_carte ? 'is-invalid' : ''}`}
                                                    placeholder="Latitude, Longitude ou lien Google Maps"
                                                />
                                                <InputError message={errors.lien_carte} className="invalid-feedback" />
                                            </div>

                                            {/* Note */}
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="note"
                                                    value="Note (0 à 5)"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="note"
                                                    type="number"
                                                    value={data.note}
                                                    onChange={(e) => setData('note', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.note ? 'is-invalid' : ''}`}
                                                    min="0"
                                                    max="5"
                                                    step="0.1"
                                                    placeholder="Note moyenne"
                                                />
                                                <InputError message={errors.note} className="invalid-feedback" />
                                            </div>
                                        </div>

                                        {/* Section pleine largeur */}
                                        <div className="col-12">
                                            <div className="row g-4">
                                                {/* Pharmacie de garde */}
                                                <div className="col-md-6">
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="pharmacie_de_garde"
                                                            checked={data.pharmacie_de_garde}
                                                            onChange={(e) => setData('pharmacie_de_garde', e.target.checked)}
                                                            style={{ width: '3em', height: '1.5em' }}
                                                        />
                                                        <label className="form-check-label fw-semibold" htmlFor="pharmacie_de_garde">
                                                            Pharmacie de garde
                                                        </label>
                                                    </div>
                                                    <InputError message={errors.pharmacie_de_garde} className="invalid-feedback" />
                                                </div>

                                                {/* Image Principale */}
                                                <div className="col-md-6">
                                                    <div className="mb-4">
                                                        <InputLabel
                                                            htmlFor="image_principale"
                                                            value="Logo/Photo de la pharmacie"
                                                            className="form-label fw-semibold small text-muted"
                                                        />
                                                        <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center">
                                                            <div className="flex-grow-1">
                                                                <FileInput
                                                                    id="image_principale"
                                                                    onChange={handleImageChange}
                                                                    className={`form-control rounded-2 ${errors.image_principale ? 'is-invalid' : ''}`}
                                                                />
                                                                <InputError message={errors.image_principale} className="invalid-feedback" />
                                                            </div>
                                                            {imagePreview && (
                                                                <div className="flex-shrink-0">
                                                                    <img
                                                                        src={imagePreview}
                                                                        alt="Aperçu"
                                                                        className="img-fluid rounded-3 shadow-sm border"
                                                                        style={{ maxHeight: '100px' }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bouton de soumission */}
                                        <div className="col-12 mt-3">
                                            <div className="d-grid">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="btn btn-primary rounded-2 py-3 fw-semibold"
                                                >
                                                    {processing ? (
                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    ) : (
                                                        <i className="bi bi-check-circle me-2"></i>
                                                    )}
                                                    Enregistrer la pharmacie
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default PharmacieStoreForm;
