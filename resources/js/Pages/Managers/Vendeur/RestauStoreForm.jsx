import React, { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import { Head, useForm } from '@inertiajs/react';

const RestauStoreForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        adresse: '',
        coordonnees_map: '',
        numero_telephone: '',
        horaires_ouverture: '',
        rating: '',
        photo_restaurant: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mgs-restaurant.store'));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo_restaurant', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Ajouter un Restaurant" />

            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                            {/* En-tête avec couleur thématique */}
                            <div className="card-header bg-gradient-restaurant text-white py-4">
                                <h2 className="h4 mb-0 fw-light">
                                    <i className="bi bi-shop me-2"></i>
                                    Nouveau Restaurant
                                </h2>
                            </div>

                            <div className="card-body p-4 p-md-5">
                                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                    <div className="row g-4">
                                        {/* Section Informations principales */}
                                        <div className="col-md-6">
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="nom"
                                                    value="Nom du restaurant*"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="nom"
                                                    type="text"
                                                    value={data.nom}
                                                    onChange={(e) => setData('nom', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.nom ? 'is-invalid' : ''}`}
                                                    placeholder="Nom de votre établissement"
                                                    required
                                                />
                                                <InputError message={errors.nom} className="invalid-feedback" />
                                            </div>

                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="numero_telephone"
                                                    value="Téléphone*"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="numero_telephone"
                                                    type="text"
                                                    value={data.numero_telephone}
                                                    onChange={(e) => setData('numero_telephone', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.numero_telephone ? 'is-invalid' : ''}`}
                                                    placeholder="Numéro de contact"
                                                    required
                                                />
                                                <InputError message={errors.numero_telephone} className="invalid-feedback" />
                                            </div>

                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="rating"
                                                    value="Note (sur 5)"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <SelectInput
                                                    id="rating"
                                                    options={[
                                                        { value: '1', label: '⭐ 1 étoile' },
                                                        { value: '2', label: '⭐⭐ 2 étoiles' },
                                                        { value: '3', label: '⭐⭐⭐ 3 étoiles' },
                                                        { value: '4', label: '⭐⭐⭐⭐ 4 étoiles' },
                                                        { value: '5', label: '⭐⭐⭐⭐⭐ 5 étoiles' },
                                                    ]}
                                                    value={data.rating}
                                                    onChange={(e) => setData('rating', e.target.value)}
                                                    className={`form-select rounded-2 ${errors.rating ? 'is-invalid' : ''}`}
                                                />
                                                <InputError message={errors.rating} className="invalid-feedback" />
                                            </div>
                                        </div>

                                        {/* Section Localisation */}
                                        <div className="col-md-6">
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
                                                    placeholder="Adresse précise du restaurant"
                                                    required
                                                />
                                                <InputError message={errors.adresse} className="invalid-feedback" />
                                            </div>

                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="coordonnees_map"
                                                    value="Coordonnées GPS"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <TextInput
                                                    id="coordonnees_map"
                                                    type="text"
                                                    value={data.coordonnees_map}
                                                    onChange={(e) => setData('coordonnees_map', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.coordonnees_map ? 'is-invalid' : ''}`}
                                                    placeholder="Latitude, Longitude"
                                                />
                                                <InputError message={errors.coordonnees_map} className="invalid-feedback" />
                                            </div>
                                        </div>

                                        {/* Section Horaires */}
                                        <div className="col-12">
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="horaires_ouverture"
                                                    value="Horaires d'ouverture"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <Textarea
                                                    id="horaires_ouverture"
                                                    value={data.horaires_ouverture}
                                                    onChange={(e) => setData('horaires_ouverture', e.target.value)}
                                                    className={`form-control rounded-2 ${errors.horaires_ouverture ? 'is-invalid' : ''}`}
                                                    rows="2"
                                                    placeholder="Ex: Lundi-Vendredi: 11h-15h, 18h-23h | Samedi: 11h-minuit"
                                                />
                                                <InputError message={errors.horaires_ouverture} className="invalid-feedback" />
                                            </div>
                                        </div>

                                        {/* Section Photo */}
                                        <div className="col-12">
                                            <div className="mb-4">
                                                <InputLabel
                                                    htmlFor="photo_restaurant"
                                                    value="Photo du restaurant"
                                                    className="form-label fw-semibold small text-muted"
                                                />
                                                <div className="d-flex flex-column flex-md-row gap-4 align-items-md-center">
                                                    <div className="flex-grow-1">
                                                        <FileInput
                                                            id="photo_restaurant"
                                                            onChange={handleImageChange}
                                                            className={`form-control rounded-2 ${errors.photo_restaurant ? 'is-invalid' : ''}`}
                                                        />
                                                        <InputError message={errors.photo_restaurant} className="invalid-feedback" />
                                                    </div>
                                                    {imagePreview && (
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Aperçu"
                                                                className="img-fluid rounded-3 shadow-sm border"
                                                                style={{ maxHeight: '120px' }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bouton de soumission */}
                                        <div className="col-12 mt-2">
                                            <div className="d-grid">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="btn btn-dark rounded-2 py-3 fw-semibold"
                                                >
                                                    {processing ? (
                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    ) : (
                                                        <i className="bi bi-check-circle me-2"></i>
                                                    )}
                                                    Enregistrer le restaurant
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

            {/* Style spécifique */}
            <style jsx>{`
                .bg-gradient-restaurant {
                    background: linear-gradient(135deg, #ff4d4d, #d62c2c);
                }
                .form-control, .form-select {
                    border: 1px solid #e0e0e0;
                    padding: 0.5rem 1rem;
                    transition: all 0.3s;
                }
                .form-control:focus, .form-select:focus {
                    border-color: #d62c2c;
                    box-shadow: 0 0 0 0.25rem rgba(214, 44, 44, 0.25);
                }
            `}</style>
        </>
    );
};

export default RestauStoreForm;
