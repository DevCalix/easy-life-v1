import React, { useEffect, useState } from 'react';
import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import SelectInputTom from '@/Components/SelectInputTom';

const EditChambre = ({ hotels, chambre }) => {
    const { data, setData, put, processing, errors } = useForm({
        ht_hotel_id: chambre.ht_hotel_id,
        numero_chambre: chambre.numero_chambre,
        type: chambre.type,
        prix_par_nuit: chambre.prix_par_nuit,
        capacite: chambre.capacite,
        equipements: chambre.equipements.map(e => e.id), // Pré-remplir les équipements sélectionnés
        lits_disponibles: chambre.lits_disponibles,
        description: chambre.description,
        est_disponible: chambre.est_disponible,
        image_principale: null, // L'image existante est déjà affichée, donc null par défaut
    });

    const [equipements, setEquipements] = useState([]); // Liste des équipements disponibles
    const [newEquipement, setNewEquipement] = useState(''); // Nouvel équipement à ajouter
    const [showEquipementField, setShowEquipementField] = useState(false); // Contrôle la visibilité du champ d'ajout d'équipement

    // Charger les équipements depuis l'API
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

    // Soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/reservation-hotel/chambres/${chambre.id}`, {
            onSuccess: () => router.visit('/reservation-hotel/chambres'),
            onError: (errors) => console.error('Erreur lors de la soumission :', errors),
        });
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Modifier une Chambre" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">Modifier la Chambre</h1>
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
                                        options={hotels.map((hotel) => ({
                                            value: hotel.id,
                                            label: hotel.nom,
                                        }))}
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

                                {/* Équipements */}
                                <div className="col-md-6">
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
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-2"
                                        onClick={() => setShowEquipementField(!showEquipementField)}
                                    >
                                        {showEquipementField ? 'Masquer' : 'Ajouter un nouvel équipement'}
                                    </button>
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
                                Mettre à jour la Chambre
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditChambre;
