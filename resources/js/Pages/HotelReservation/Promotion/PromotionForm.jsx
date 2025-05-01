import React, { useState, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import Textarea from '@/Components/Textarea';

const PromotionForm = ({ hotels, chambres, promotion = null }) => {
    const { data, setData, post, put, processing, errors } = useForm({
        ht_hotel_id: promotion?.ht_hotel_id || '',
        ht_chambre_id: promotion?.ht_chambre_id || '',
        pourcentage_reduction: promotion?.pourcentage_reduction || 0,
        date_debut: promotion?.date_debut || '',
        date_fin: promotion?.date_fin || '',
        description: promotion?.description || '',
    });

    // État pour stocker les chambres filtrées
    const [filteredChambres, setFilteredChambres] = useState([]);

    // Filtrer les chambres lorsque l'hôtel est sélectionné
    useEffect(() => {
        if (data.ht_hotel_id) {
            const filtered = chambres.filter((chambre) => chambre.ht_hotel_id == data.ht_hotel_id);
            setFilteredChambres(filtered);
        } else {
            setFilteredChambres([]);
        }
    }, [data.ht_hotel_id, chambres]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (promotion) {
            // Mettre à jour la promotion
            put(`/reservation-hotel/promotions/${promotion.id}`, {
                onSuccess: () => router.visit('/reservation-hotel/promotions'),
            });
        } else {
            // Créer une nouvelle promotion
            post('/reservation-hotel/promotions', {
                onSuccess: () => router.visit('/reservation-hotel/promotions'),
            });
        }
    };

    return (
        <>
            <DashboardNavbar />
            <Head title={promotion ? "Modifier une Promotion" : "Ajouter une Promotion"} />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">
                        {promotion ? "Modifier une Promotion" : "Ajouter une Promotion"}
                    </h1>
                    <Link href={route('promotions.index')} className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>

                <hr className="border border-primary border-3 opacity-75 mb-5" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow-lg p-4">
                        <div className="card-body">
                            <div className="row gy-4">
                                {/* Sélection de l'hôtel */}
                                <div className="col-md-6 mb-3">
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
                                        className="form-select"
                                        required
                                    />
                                    <InputError message={errors.ht_hotel_id} className="mt-2" />
                                </div>

                                {/* Sélection de la chambre */}
                                <div className="col-md-6 mb-3">
                                    <InputLabel htmlFor="ht_chambre_id" value="Chambre" />
                                    <SelectInput
                                        id="ht_chambre_id"
                                        name="ht_chambre_id"
                                        options={filteredChambres.map((chambre) => ({
                                            value: chambre.id,
                                            label: `Chambre ${chambre.numero_chambre} (${chambre.type})`,
                                        }))}
                                        value={data.ht_chambre_id}
                                        onChange={(e) => setData('ht_chambre_id', e.target.value)}
                                        className="form-select"
                                        required
                                        disabled={!data.ht_hotel_id} // Désactiver si aucun hôtel n'est sélectionné
                                    />
                                    <InputError message={errors.ht_chambre_id} className="mt-2" />
                                </div>

                                {/* Pourcentage de réduction */}
                                <div className="col-md-6 mb-3">
                                    <InputLabel htmlFor="pourcentage_reduction" value="Pourcentage de Réduction (%)" />
                                    <TextInput
                                        id="pourcentage_reduction"
                                        type="number"
                                        name="pourcentage_reduction"
                                        value={data.pourcentage_reduction}
                                        onChange={(e) => setData('pourcentage_reduction', e.target.value)}
                                        className="form-control"
                                        min="0"
                                        max="100"
                                        required
                                    />
                                    <InputError message={errors.pourcentage_reduction} className="mt-2" />
                                </div>

                                {/* Dates de début et de fin côte à côte */}
                                <div className="col-md-6 mb-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputLabel htmlFor="date_debut" value="Date de Début" />
                                            <TextInput
                                                id="date_debut"
                                                type="date"
                                                name="date_debut"
                                                value={data.date_debut}
                                                onChange={(e) => setData('date_debut', e.target.value)}
                                                className="form-control"
                                                required
                                            />
                                            <InputError message={errors.date_debut} className="mt-2" />
                                        </div>
                                        <div className="col-md-6">
                                            <InputLabel htmlFor="date_fin" value="Date de Fin" />
                                            <TextInput
                                                id="date_fin"
                                                type="date"
                                                name="date_fin"
                                                value={data.date_fin}
                                                onChange={(e) => setData('date_fin', e.target.value)}
                                                className="form-control"
                                                required
                                            />
                                            <InputError message={errors.date_fin} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="col-md-12 mb-3">
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
                            </div>
                        </div>
                        <div className="card-footer bg-light text-center mt-3">
                            <PrimaryButton type="submit" disabled={processing} className="btn btn-primary">
                                {promotion ? "Mettre à jour" : "Ajouter"}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PromotionForm;
