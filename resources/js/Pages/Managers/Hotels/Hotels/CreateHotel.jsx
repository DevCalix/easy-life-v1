import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInputTom from '@/Components/SelectInputTom';
import Checkbox from '@/Components/Checkbox';
import HotelsLayout from '@/Layouts/Managers/HotelLayout';
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const CreateHotel = () => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        type_etablissement: '',
        adresse: '',
        numero_appartement_etage: '',
        ville: '',
        pays_region: '',
        telephone: '',
        email: '',
        description: '',
        equipements: [],
        services: [],
        repas_offerts: [],
        parking: false,
        horaires_arrivee_de: '',
        horaires_arrivee_a: '',
        horaires_depart_de: '',
        horaires_depart_a: '',
        accepte_enfants: false,
        accepte_animaux: false,
        fumer: false,
        note: 0,
        image_principale: null,
        coordonnees_map: '', // Ajouté pour stocker les coordonnées GPS
    });

    const [equipements, setEquipements] = useState([]);
    const [services, setServices] = useState([]);
    const [newEquipement, setNewEquipement] = useState('');
    const [newService, setNewService] = useState('');
    const [showEquipementField, setShowEquipementField] = useState(false);
    const [showServiceField, setShowServiceField] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // Références pour l'autocomplétion
    const autocompleteRef = useRef(null);
    const libraries = ['places'];

    // Fonction pour gérer la sélection d'une adresse
    const handlePlaceSelect = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            // Découper l'adresse pour remplir les champs ville et pays/région
            const addressComponents = place.address_components;
            let city = '';
            let country = '';

            addressComponents.forEach(component => {
                if (component.types.includes('locality')) {
                    city = component.long_name;
                }
                if (component.types.includes('country')) {
                    country = component.long_name;
                }
            });

            setData({
                ...data,
                adresse: place.formatted_address,
                ville: city,
                pays_region: country,
                coordonnees_map: `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`
            });
        }
    };

    // Permet la modification manuelle de l'adresse
    const handleAddressChange = (e) => {
        setData("adresse", e.target.value);
    };

    // Charger les équipements et services depuis l'API
    useEffect(() => {
        axios.get('/reservation-hotel/equipements').then((response) => {
            setEquipements(response.data);
        }).catch((error) => {
            console.error('Erreur lors du chargement des équipements :', error);
        });

        axios.get('/reservation-hotel/services').then((response) => {
            setServices(response.data);
        }).catch((error) => {
            console.error('Erreur lors du chargement des services :', error);
        });
    }, []);

    // Ajouter un nouvel équipement
    const handleAddEquipement = async () => {
        if (newEquipement.trim() !== '') {
            try {
                const response = await axios.post('/reservation-hotel/equipements', { nom: newEquipement });
                setEquipements([...equipements, response.data]);
                setData('equipements', [...data.equipements, response.data.id]);
                setNewEquipement('');
                setShowEquipementField(false); // Masquer le champ après l'ajout
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'équipement :', error);
            }
        }
    };

    // Ajouter un nouveau service
    const handleAddService = async () => {
        if (newService.trim() !== '') {
            try {
                const response = await axios.post('/reservation-hotel/services', { nom: newService });
                setServices([...services, response.data]);
                setData('services', [...data.services, response.data.id]);
                setNewService('');
                setShowServiceField(false); // Masquer le champ après l'ajout
            } catch (error) {
                console.error('Erreur lors de l\'ajout du service :', error);
            }
        }
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

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/hotel/managers/mgs-hotels', {
            onSuccess: () => {
                router.visit('/hotel/managers/mgs-hotels');
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    return (
        <HotelsLayout title="Ajouter un Hôtel">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold">Ajouter un Hôtel</h1>
                    <Link href={route('hotels.index')} className="btn btn-primary montserrat-normal">
                        retour
                    </Link>
                </div>

                <hr className="border border-danger border-3 opacity-75" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow p-4">
                        {/* Informations générales */}
                        <h5 className="mb-4">Informations générales</h5>

                        {/* Nom de l'hôtel */}
                        <div className="mb-3">
                            <InputLabel htmlFor="nom" value="Nom de l'Hôtel" />
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

                        {/* Type d'établissement */}
                        <div className="mb-3">
                            <InputLabel htmlFor="type_etablissement" value="Type d'établissement" />
                            <SelectInput
                                id="type_etablissement"
                                name="type_etablissement"
                                options={[
                                    { value: '', label: 'Sélectionnez un type' },
                                    { value: 'Hôtel', label: 'Hôtel' },
                                    { value: 'Maison d\'hôtes', label: 'Maison d\'hôtes' },
                                    { value: 'B&B / chambre d\'hôtes', label: 'B&B / chambre d\'hôtes' },
                                    { value: 'Séjour chez l\'habitant', label: 'Séjour chez l\'habitant' },
                                    { value: 'Appart ‘hôtel', label: 'Appart ‘hôtel' },
                                    { value: 'Séjour à la campagne', label: 'Séjour à la campagne' },
                                ]}
                                value={data.type_etablissement}
                                onChange={(e) => setData('type_etablissement', e.target.value)}
                            />
                            <InputError message={errors.type_etablissement} className="mt-2" />
                        </div>

                        {/* Adresse avec autocomplétion */}
                        <div className="mb-3">
                            <InputLabel htmlFor="adresse" value="Adresse" />
                            <LoadScript
                                googleMapsApiKey="AIzaSyBFRuFVMaepEf5S5-sEkF9moPBlKlmzZus"
                                libraries={libraries}
                            >
                                <Autocomplete
                                    onLoad={(autocomplete) => {
                                        autocompleteRef.current = autocomplete;
                                    }}
                                    onPlaceChanged={handlePlaceSelect}
                                    fields={['address_components', 'formatted_address', 'geometry.location']}
                                >
                                    <input
                                        id="adresse"
                                        type="text"
                                        name="adresse"
                                        value={data.adresse}
                                        onChange={handleAddressChange}
                                        className={`form-control ${errors.adresse ? 'is-invalid' : ''}`}
                                        placeholder="Rechercher une adresse..."
                                        required
                                    />
                                </Autocomplete>
                            </LoadScript>
                            <InputError message={errors.adresse} className="mt-2" />
                        </div>

                        {/* Numéro d'appartement ou d'étage */}
                        <div className="mb-3">
                            <InputLabel htmlFor="numero_appartement_etage" value="Numéro d'appartement ou d'étage (facultatif)" />
                            <TextInput
                                id="numero_appartement_etage"
                                type="text"
                                name="numero_appartement_etage"
                                value={data.numero_appartement_etage}
                                onChange={(e) => setData('numero_appartement_etage', e.target.value)}
                            />
                            <InputError message={errors.numero_appartement_etage} className="mt-2" />
                        </div>

                        {/* Ville et Pays/Région */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="ville" value="Ville" />
                                <TextInput
                                    id="ville"
                                    type="text"
                                    name="ville"
                                    value={data.ville}
                                    onChange={(e) => setData('ville', e.target.value)}
                                    required
                                />
                                <InputError message={errors.ville} className="mt-2" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="pays_region" value="Pays/Région" />
                                <TextInput
                                    id="pays_region"
                                    type="text"
                                    name="pays_region"
                                    value={data.pays_region}
                                    onChange={(e) => setData('pays_region', e.target.value)}
                                    required
                                />
                                <InputError message={errors.pays_region} className="mt-2" />
                            </div>
                        </div>

                        {/* Téléphone et Email */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
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
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="email" value="Email" />
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
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <InputLabel htmlFor="description" value="Description" />
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="3"
                            />
                            <InputError message={errors.description} className="mt-2" />
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

                        {/* Équipements */}
                        <div className="mb-3">
                            <InputLabel htmlFor="equipements" value="Équipements" />
                            <SelectInputTom
                                id="equipements"
                                name="equipements"
                                options={equipements.map((equipement) => ({
                                    value: equipement.id,
                                    label: equipement.nom,
                                }))}
                                value={data.equipements}
                                onChange={(values) => setData('equipements', values)}

                            />
                            {/* Bouton pour afficher/masquer le champ d'ajout d'équipement */}
                            <button
                                type="button"
                                className="btn btn-primary mt-2"
                                onClick={() => setShowEquipementField(!showEquipementField)}
                            >
                                {showEquipementField ? 'Masquer' : 'Ajouter un nouvel équipement'}
                            </button>
                            {/* Champ d'ajout d'équipement (visible uniquement si showEquipementField est true) */}
                            {showEquipementField && (
                                <div className="mt-2">
                                    <TextInput
                                        type="text"
                                        placeholder="Ajouter un nouvel équipement"
                                        value={newEquipement}
                                        onChange={(e) => setNewEquipement(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-success mt-2"
                                        onClick={handleAddEquipement}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            )}
                            <InputError message={errors.equipements} className="mt-2" />
                        </div>

                        {/* Services */}
                        <div className="mb-3">
                            <InputLabel htmlFor="services" value="Services" />
                            <SelectInputTom
                                id="services"
                                name="services"
                                options={services.map((service) => ({
                                    value: service.id,
                                    label: service.nom,
                                }))}
                                value={data.services}
                                onChange={(values) => setData('services', values)}

                            />
                            {/* Bouton pour afficher/masquer le champ d'ajout de service */}
                            <button
                                type="button"
                                className="btn btn-primary mt-2"
                                onClick={() => setShowServiceField(!showServiceField)}
                            >
                                {showServiceField ? 'Masquer' : 'Ajouter un nouveau service'}
                            </button>
                            {/* Champ d'ajout de service (visible uniquement si showServiceField est true) */}
                            {showServiceField && (
                                <div className="mt-2">
                                    <TextInput
                                        type="text"
                                        placeholder="Ajouter un nouveau service"
                                        value={newService}
                                        onChange={(e) => setNewService(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-success mt-2"
                                        onClick={handleAddService}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            )}
                            <InputError message={errors.services} className="mt-2" />
                        </div>

                        {/* Repas offerts */}
                        <div className="mb-3">
                            <InputLabel htmlFor="repas_offerts" value="Repas offerts" />
                            <SelectInputTom
                                id="repas_offerts"
                                name="repas_offerts"
                                options={[
                                    { value: 'Pas de repas', label: 'Pas de repas' },
                                    { value: 'Petit-déjeuner compris', label: 'Petit-déjeuner compris' },
                                    { value: 'Petit-déjeuner et dîner compris', label: 'Petit-déjeuner et dîner compris' },
                                    { value: 'Tous les repas compris', label: 'Tous les repas compris' },
                                ]}
                                value={data.repas_offerts}
                                onChange={(values) => setData('repas_offerts', values)}

                            />
                            <InputError message={errors.repas_offerts} className="mt-2" />
                        </div>

                        {/* Parking */}
                        <div className="mb-3">
                            <InputLabel htmlFor="parking" value="Parking" />
                            <SelectInput
                                id="parking"
                                name="parking"
                                options={[
                                    { value: true, label: 'Oui, gratuitement' },
                                    { value: true, label: 'Oui, moyennant un supplément' },
                                    { value: false, label: 'Non' },
                                ]}
                                value={data.parking}
                                onChange={(e) => setData('parking', e.target.value === 'true')} // Convertir en booléen
                            />
                            <InputError message={errors.parking} className="mt-2" />
                        </div>

                        {/* Horaires d'arrivée et de départ */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="horaires_arrivee_de" value="Arrivée (De)" />
                                <TextInput
                                    id="horaires_arrivee_de"
                                    type="time"
                                    name="horaires_arrivee_de"
                                    value={data.horaires_arrivee_de}
                                    onChange={(e) => setData('horaires_arrivee_de', e.target.value)}
                                />
                                <InputError message={errors.horaires_arrivee_de} className="mt-2" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="horaires_arrivee_a" value="Arrivée (À)" />
                                <TextInput
                                    id="horaires_arrivee_a"
                                    type="time"
                                    name="horaires_arrivee_a"
                                    value={data.horaires_arrivee_a}
                                    onChange={(e) => setData('horaires_arrivee_a', e.target.value)}
                                />
                                <InputError message={errors.horaires_arrivee_a} className="mt-2" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="horaires_depart_de" value="Départ (De)" />
                                <TextInput
                                    id="horaires_depart_de"
                                    type="time"
                                    name="horaires_depart_de"
                                    value={data.horaires_depart_de}
                                    onChange={(e) => setData('horaires_depart_de', e.target.value)}
                                />
                                <InputError message={errors.horaires_depart_de} className="mt-2" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="horaires_depart_a" value="Départ (À)" />
                                <TextInput
                                    id="horaires_depart_a"
                                    type="time"
                                    name="horaires_depart_a"
                                    value={data.horaires_depart_a}
                                    onChange={(e) => setData('horaires_depart_a', e.target.value)}
                                />
                                <InputError message={errors.horaires_depart_a} className="mt-2" />
                            </div>
                        </div>

                        {/* Politiques */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="accepte_enfants" value="Accepte les enfants ?" />
                                <Checkbox
                                    id="accepte_enfants"
                                    name="accepte_enfants"
                                    checked={data.accepte_enfants}
                                    onChange={(e) => setData('accepte_enfants', e.target.checked)}
                                />
                                <InputError message={errors.accepte_enfants} className="mt-2" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <InputLabel htmlFor="accepte_animaux" value="Accepte les animaux ?" />
                                <SelectInput
                                    id="accepte_animaux"
                                    name="accepte_animaux"
                                    options={[
                                        { value: true, label: 'Oui' },
                                        { value: true, label: 'Sur demande' }, // "Sur demande" peut être considéré comme true
                                        { value: false, label: 'Non' },
                                    ]}
                                    value={data.accepte_animaux}
                                    onChange={(e) => setData('accepte_animaux', e.target.value === 'true')} // Convertir en booléen
                                />
                                <InputError message={errors.accepte_animaux} className="mt-2" />
                            </div>
                        </div>

                        {/* Fumer */}
                        <div className="mb-3">
                            <InputLabel htmlFor="fumer" value="Fumer autorisé ?" />
                            <Checkbox
                                id="fumer"
                                name="fumer"
                                checked={data.fumer}
                                onChange={(e) => setData('fumer', e.target.checked)}
                            />
                            <InputError message={errors.fumer} className="mt-2" />
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

                        {/* Bouton de soumission */}
                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                Ajouter l'Hôtel
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </HotelsLayout>
    );
};

export default CreateHotel;
