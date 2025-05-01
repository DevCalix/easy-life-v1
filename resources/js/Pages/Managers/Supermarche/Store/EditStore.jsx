import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SupermarketLayout from "@/Layouts/Managers/SupermarketLayout";
import StoreImageUpload from "@/Layouts/Managers/Supermarche/StoreImageUpload";

const EditStore = ({ store }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        nom: store.nom,
        adresse: store.adresse,
        coordonnees_map: store.coordonnees_map,
        numero_telephone: store.numero_telephone,
        horaires_ouverture: store.horaires_ouverture,
        rating: store.rating || "", // Initialisation de la note
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/supermarche/managers/stores-managers/${store.id}`, {
            onSuccess: () => {
                toast.success("Store mis à jour avec succès !", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            },
            onError: (errors) => {
                toast.error("Erreur lors de la mise à jour du store.", {
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
        <SupermarketLayout title="Modifier le Store">
            <div className="container">
                <div className="card shadow-sm mb-2">
                    <div className="card-header bg-primary text-white">
                        <h3 className="mb-0">Modifier le Store</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Nom du store */}
                            <div className="mb-3">
                                <InputLabel htmlFor="nom" value="Nom du Store" />
                                <TextInput
                                    id="nom"
                                    type="text"
                                    name="nom"
                                    value={data.nom}
                                    onChange={(e) => setData("nom", e.target.value)}
                                    className="form-control"
                                    placeholder="Entrez le nom du store"
                                    required
                                />
                                <InputError message={errors.nom} className="mt-2 text-danger" />
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

                            {/* Numéro de téléphone */}
                            <div className="mb-3">
                                <InputLabel htmlFor="numero_telephone" value="Numéro de téléphone" />
                                <TextInput
                                    id="numero_telephone"
                                    type="text"
                                    name="numero_telephone"
                                    value={data.numero_telephone}
                                    onChange={(e) =>
                                        setData("numero_telephone", e.target.value)
                                    }
                                    className="form-control"
                                    placeholder="Entrez le numéro de téléphone"
                                    required
                                />
                                <InputError
                                    message={errors.numero_telephone}
                                    className="mt-2 text-danger"
                                />
                            </div>

                            {/* Horaires d'ouverture */}
                            <div className="mb-3">
                                <InputLabel htmlFor="horaires_ouverture" value="Horaires d'ouverture" />
                                <Textarea
                                    id="horaires_ouverture"
                                    name="horaires_ouverture"
                                    value={data.horaires_ouverture}
                                    onChange={(e) =>
                                        setData("horaires_ouverture", e.target.value)
                                    }
                                    className="form-control"
                                    rows="3"
                                    placeholder="Ex: Lundi - Vendredi : 8h - 20h"
                                />
                                <InputError
                                    message={errors.horaires_ouverture}
                                    className="mt-2 text-danger"
                                />
                            </div>

                            {/* Rating */}
                            <div className="mb-3">
                                <InputLabel htmlFor="rating" value="Note (1 à 5)" />
                                <TextInput
                                    id="rating"
                                    type="number"
                                    name="rating"
                                    value={data.rating}
                                    onChange={(e) => setData("rating", e.target.value)}
                                    className="form-control"
                                    placeholder="Entrez une note entre 1 et 5"
                                    min="1"
                                    max="5"
                                    required
                                />
                                <InputError message={errors.rating} className="mt-2 text-danger" />
                            </div>

                            {/* Bouton de soumission */}
                            <div className="d-grid">
                                <PrimaryButton disabled={processing} className="btn btn-primary">
                                    {processing ? "En cours..." : "Mettre à jour le Store"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Composant pour mettre à jour l'image */}
                <StoreImageUpload storeId={store.id} initialImage={store.photo_store} />

                {/* ToastContainer */}
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </SupermarketLayout>
    );
};

export default EditStore;
