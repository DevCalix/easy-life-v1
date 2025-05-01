import React, { useEffect, useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import SelectInputTom from '@/Components/SelectInputTom';

const CreateChambre = ({ hotels }) => {
    const { data, setData, post, processing, errors } = useForm({
        ht_hotel_id: '',
        numero_chambre: '',
        type: '',
        prix_par_nuit: 0,
        capacite: 1,
        equipements: [],
        lits_disponibles: 1,
        description: '',
        est_disponible: true,
        image_principale: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [equipements, setEquipements] = useState([]); // Liste des équipements disponibles
    const [newEquipement, setNewEquipement] = useState(''); // Nouvel équipement à ajouter
    const [showEquipementField, setShowEquipementField] = useState(false); // Contrôle la visibilité du champ d'ajout d'équipement
    // Charger les équipements et services depuis l'API
        useEffect(() => {
            axios.get('/reservation-hotel/equipements').then((response) => {
                setEquipements(response.data);
            }).catch((error) => {
                console.error('Erreur lors du chargement des équipements :', error);
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
        post('/reservation-hotel/chambres', {
            onSuccess: () => router.visit('/reservation-hotel/chambres'),
            onError: (errors) => console.error('Erreur lors de la soumission :', errors),
        });
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Ajouter une Chambre" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">Ajouter une Chambre</h1>
                    <Link href={route('chambres.index')} className="btn btn-primary montserrat-normal">
                        retour
                    </Link>
                </div>

                <hr className="border border-primary border-3 opacity-75 mb-5" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow-lg p-4">

                        <div className="card-body">
                            <div className="row gy-4">
                                {/* Sélection de l'hôtel */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="ht_hotel_id" value="Hôtel" />
                                    <SelectInput
                                        id="ht_hotel_id"
                                        name="ht_hotel_id"
                                        options={[
                                            { value: '', label: 'Sélectionnez un hôtel' }, // Option par défaut
                                            ...hotels.map((hotel) => ({
                                                value: hotel.id,
                                                label: hotel.nom,
                                            })),
                                        ]}
                                        value={data.ht_hotel_id}
                                        onChange={(e) => setData('ht_hotel_id', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.ht_hotel_id} className="mt-2" />
                                </div>

                                {/* Numéro de chambre */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="numero_chambre" value="Numéro de Chambre" />
                                    <TextInput
                                        id="numero_chambre"
                                        type="text"
                                        name="numero_chambre"
                                        value={data.numero_chambre}
                                        onChange={(e) => setData('numero_chambre', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.numero_chambre} className="mt-2" />
                                </div>

                                {/* Type de chambre */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="type" value="Type de Chambre" />
                                    <SelectInput
                                        id="type"
                                        name="type"
                                        options={[
                                            { value: '', label: 'Selectionner le type de chambre' },
                                            { value: 'Simple', label: 'Simple' },
                                            { value: 'Premium', label: 'Premium' },
                                            { value: 'Studio', label: 'Studio' },
                                            { value: 'Appartement', label: 'Appartement' },
                                            { value: 'Suite présidentielle', label: 'Suite présidentielle' },
                                        ]}
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.type} className="mt-2" />
                                </div>

                                {/* Prix par nuit */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="prix_par_nuit" value="Prix par Nuit (FCFA)" />
                                    <TextInput
                                        id="prix_par_nuit"
                                        type="number"
                                        name="prix_par_nuit"
                                        value={data.prix_par_nuit}
                                        onChange={(e) => setData('prix_par_nuit', Math.max(0, e.target.value))}
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <InputError message={errors.prix_par_nuit} className="mt-2" />
                                </div>

                                {/* Capacité */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="capacite" value="Capacité (personnes)" />
                                    <TextInput
                                        id="capacite"
                                        type="number"
                                        name="capacite"
                                        value={data.capacite}
                                        onChange={(e) => setData('capacite', Math.max(1, e.target.value))}
                                        min="1"
                                        required
                                    />
                                    <InputError message={errors.capacite} className="mt-2" />
                                </div>

                                <div className="col-md-6">
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
                                </div>

                                {/* Image principale */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="image_principale" value="Image Principale" />
                                    <FileInput
                                        id="image_principale"
                                        name="image_principale"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                    {imagePreview && (
                                        <div className="mt-3">
                                            <img
                                                src={imagePreview}
                                                alt="Aperçu de l'image"
                                                className="img-thumbnail shadow-sm"
                                                style={{ maxHeight: '150px' }}
                                            />
                                        </div>
                                    )}
                                    <InputError message={errors.image_principale} className="mt-2" />
                                </div>

                                {/* Disponibilité */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="est_disponible" value="Disponibilité" />
                                    <SelectInput
                                        id="est_disponible"
                                        name="est_disponible"
                                        options={[
                                            { value: true, label: 'Disponible' },
                                            { value: false, label: 'Non disponible' },
                                        ]}
                                        value={data.est_disponible}
                                        onChange={(e) => setData('est_disponible', e.target.value === 'true')}
                                        required
                                    />
                                    <InputError message={errors.est_disponible} className="mt-2" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Description" />
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="4"
                                    required
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                        </div>
                        <div className="card-footer bg-light text-center mt-3">
                            <PrimaryButton type="submit" disabled={processing}>
                                Ajouter la Chambre
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateChambre;
