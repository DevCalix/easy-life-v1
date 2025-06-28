import React, { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInputTom from '@/Components/SelectInputTom';
import Checkbox from '@/Components/Checkbox';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const EditHotel = ({ hotel }) => {
    const { data, setData, put, processing, errors } = useForm({
        nom: hotel.nom,
        type_etablissement: hotel.type_etablissement,
        adresse: hotel.adresse,
        numero_appartement_etage: hotel.numero_appartement_etage,
        ville: hotel.ville,
        pays_region: hotel.pays_region,
        telephone: hotel.telephone,
        email: hotel.email,
        description: hotel.description,
        equipements: hotel.equipements.map((e) => e.id), // Tableau d'IDs des équipements
        services: hotel.services.map((s) => s.id), // Tableau d'IDs des services
        repas_offerts: hotel.repas_offerts,
        parking: hotel.parking,
        horaires_arrivee_de: hotel.horaires_arrivee_de,
        horaires_arrivee_a: hotel.horaires_arrivee_a,
        horaires_depart_de: hotel.horaires_depart_de,
        horaires_depart_a: hotel.horaires_depart_a,
        accepte_enfants: hotel.accepte_enfants,
        accepte_animaux: hotel.accepte_animaux,
        fumer: hotel.fumer,
        note: hotel.note,
    });

    const [equipements, setEquipements] = useState([]); // Liste des équipements disponibles
    const [services, setServices] = useState([]); // Liste des services disponibles
    const [newEquipement, setNewEquipement] = useState(''); // Nouvel équipement à ajouter
    const [newService, setNewService] = useState(''); // Nouveau service à ajouter
    const [showEquipementField, setShowEquipementField] = useState(false); // Contrôle la visibilité du champ d'ajout d'équipement
    const [showServiceField, setShowServiceField] = useState(false); // Contrôle la visibilité du champ d'ajout de service

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

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/reservation-hotel/hotels/${hotel.id}`, {
            onSuccess: () => {
                router.visit('/reservation-hotel/hotels');
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    return (
        <AdminLayout title="Modifier un Hôtel">
            <div className="container-fluid py-2">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold">Modifier un Hôtel</h1>
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
                                Modifier l'Hôtel
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EditHotel;
