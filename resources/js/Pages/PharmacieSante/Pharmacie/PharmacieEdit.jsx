import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const PharmacieEdit = ({ pharmacie }) => {
    const { data, setData, put, processing, errors } = useForm({
        nom: pharmacie.nom,
        adresse: pharmacie.adresse,
        heures_ouverture: pharmacie.heures_ouverture,
        telephone: pharmacie.telephone,
        lien_carte: pharmacie.lien_carte,
        note: pharmacie.note || 0,
        pharmacie_de_garde: pharmacie.pharmacie_de_garde,
    });

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/pharmacie-sante/pharmacie/${pharmacie.id}`, {
            onSuccess: () => {
                router.visit('/pharmacie-sante/pharmacie');
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour :', errors);
            },
        });
    };

    return (
        <AdminLayout title="Modifier une Pharmacie">
            
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold">Modifier la Pharmacie</h1>
                    <Link href={route('pharmacie.index')} className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>

                <hr className="border border-danger border-3 opacity-75" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow p-4">
                        <h5 className="mb-4">Informations générales</h5>

                        <div className="mb-3">
                            <InputLabel htmlFor="nom" value="Nom de la Pharmacie" />
                            <TextInput id="nom" type="text" name="nom" value={data.nom} onChange={(e) => setData('nom', e.target.value)} required />
                            <InputError message={errors.nom} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="adresse" value="Adresse" />
                            <TextInput id="adresse" type="text" name="adresse" value={data.adresse} onChange={(e) => setData('adresse', e.target.value)} required />
                            <InputError message={errors.adresse} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="heures_ouverture" value="Heures d'ouverture" />
                            <TextInput id="heures_ouverture" type="text" name="heures_ouverture" value={data.heures_ouverture} onChange={(e) => setData('heures_ouverture', e.target.value)} required />
                            <InputError message={errors.heures_ouverture} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="telephone" value="Téléphone" />
                            <TextInput id="telephone" type="text" name="telephone" value={data.telephone} onChange={(e) => setData('telephone', e.target.value)} required />
                            <InputError message={errors.telephone} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="lien_carte" value="Lien de la carte (facultatif)" />
                            <TextInput id="lien_carte" type="text" name="lien_carte" value={data.lien_carte} onChange={(e) => setData('lien_carte', e.target.value)} />
                            <InputError message={errors.lien_carte} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="note" value="Note (0 à 5)" />
                            <TextInput id="note" type="number" name="note" value={data.note} onChange={(e) => setData('note', e.target.value)} min="0" max="5" step="0.1" />
                            <InputError message={errors.note} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="pharmacie_de_garde" value="Pharmacie de garde" />
                            <Checkbox id="pharmacie_de_garde" name="pharmacie_de_garde" checked={data.pharmacie_de_garde} onChange={(e) => setData('pharmacie_de_garde', e.target.checked)} />
                            <InputError message={errors.pharmacie_de_garde} className="mt-2" />
                        </div>

                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                Mettre à jour
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default PharmacieEdit;
