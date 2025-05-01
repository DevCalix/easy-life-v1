import React, { useState, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";

const RegisterSupermarche = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: "",
        adresse: "",
        coordonnees_map: "",
        numero_telephone: "",
        horaires_ouverture: "",
        photo_store: null,
        rating: "",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);
    const libraries = ['places'];

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            setData({
                ...data,
                adresse: place.formatted_address,
                coordonnees_map: `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`
            });
        }
    };

    const handleAddressChange = (e) => {
        // Permet la modification manuelle
        setData("adresse", e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("photo_store", file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/supermarche/managers/stores-managers", {
            onSuccess: () => {
                toast.success("Store ajouté avec succès !", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                reset();
                setImagePreview(null);
            },
            onError: (errors) => {
                toast.error("Erreur lors de l'ajout du store.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            },
        });
    };

    return (
        <>
            <MarketNavbar/>
            <Head title="Enregistrement Supermarché" />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-primary text-white py-3">
                                <h2 className="h5 mb-0">Enregistrement de votre Supermarché</h2>
                            </div>

                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                                    <div className="row g-3">
                                        {/* Nom du supermarché */}
                                        <div className="col-md-6">
                                            <InputLabel htmlFor="nom" value="Nom du supermarché*" />
                                            <TextInput
                                                id="nom"
                                                type="text"
                                                value={data.nom}
                                                onChange={(e) => setData("nom", e.target.value)}
                                                className={`form-control ${errors.nom ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            <InputError message={errors.nom} className="invalid-feedback" />
                                        </div>

                                        {/* Numéro de téléphone */}
                                        <div className="col-md-6">
                                            <InputLabel htmlFor="numero_telephone" value="Téléphone*" />
                                            <TextInput
                                                id="numero_telephone"
                                                type="tel"
                                                value={data.numero_telephone}
                                                onChange={(e) => setData("numero_telephone", e.target.value)}
                                                className={`form-control ${errors.numero_telephone ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            <InputError message={errors.numero_telephone} className="invalid-feedback" />
                                        </div>

                                        {/* Adresse avec autocomplétion Google Places */}
                                        <div className="col-12">
                                            <InputLabel htmlFor="adresse" value="Adresse complète*" />
                                            <LoadScript
                                                googleMapsApiKey="AIzaSyBFRuFVMaepEf5S5-sEkF9moPBlKlmzZus"
                                                libraries={libraries}
                                            >
                                                <Autocomplete
                                                    onLoad={(autocomplete) => {
                                                        autocompleteRef.current = autocomplete;
                                                    }}
                                                    onPlaceChanged={handlePlaceSelect}
                                                    fields={['formatted_address', 'geometry.location']}
                                                >
                                                    <input
                                                        ref={inputRef}
                                                        id="adresse"
                                                        type="text"
                                                        value={data.adresse}
                                                        onChange={handleAddressChange}
                                                        className={`form-control ${errors.adresse ? 'is-invalid' : ''}`}
                                                        placeholder="Rechercher une adresse..."
                                                        required
                                                    />
                                                </Autocomplete>
                                            </LoadScript>
                                            <InputError message={errors.adresse} className="invalid-feedback" />
                                        </div>

                                        {/* Coordonnées de la carte */}
                                        <div className="col-md-6">
                                            <InputLabel htmlFor="coordonnees_map" value="Coordonnées GPS" />
                                            <TextInput
                                                id="coordonnees_map"
                                                type="text"
                                                value={data.coordonnees_map}
                                                onChange={(e) => setData("coordonnees_map", e.target.value)}
                                                className={`form-control ${errors.coordonnees_map ? 'is-invalid' : ''}`}
                                                placeholder="Sera automatiquement rempli"
                                                readOnly
                                            />
                                            <InputError message={errors.coordonnees_map} className="invalid-feedback" />
                                        </div>

                                        {/* Rating */}
                                        <div className="col-md-6">
                                            <InputLabel htmlFor="rating" value="Note actuelle (0-5)" />
                                            <TextInput
                                                id="rating"
                                                type="number"
                                                value={data.rating}
                                                onChange={(e) => setData("rating", e.target.value)}
                                                className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
                                                min="0"
                                                max="5"
                                                step="0.1"
                                            />
                                            <InputError message={errors.rating} className="invalid-feedback" />
                                        </div>

                                        {/* Horaires d'ouverture */}
                                        <div className="col-12">
                                            <InputLabel htmlFor="horaires_ouverture" value="Horaires d'ouverture*" />
                                            <Textarea
                                                id="horaires_ouverture"
                                                value={data.horaires_ouverture}
                                                onChange={(e) => setData("horaires_ouverture", e.target.value)}
                                                className={`form-control ${errors.horaires_ouverture ? 'is-invalid' : ''}`}
                                                rows="3"
                                                required
                                            />
                                            <InputError message={errors.horaires_ouverture} className="invalid-feedback" />
                                        </div>

                                        {/* Photo du store */}
                                        <div className="col-12">
                                            <InputLabel htmlFor="photo_store" value="Logo/Photo du supermarché" />
                                            <input
                                                id="photo_store"
                                                type="file"
                                                onChange={handleImageChange}
                                                className={`form-control ${errors.photo_store ? 'is-invalid' : ''}`}
                                                accept="image/*"
                                            />
                                            <InputError message={errors.photo_store} className="invalid-feedback" />

                                            {imagePreview && (
                                                <div className="mt-3 text-center">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Aperçu"
                                                        className="img-fluid rounded shadow-sm"
                                                        style={{ maxHeight: '200px' }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Bouton de soumission */}
                                        <div className="col-12 mt-4">
                                            <PrimaryButton
                                                type="submit"
                                                className="btn btn-primary w-100 py-3"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                ) : null}
                                                Enregistrer mon supermarché
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default RegisterSupermarche;
