import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';

const HopitaleEdit = ({ hopital }) => {
    const { data, setData, put, processing, errors } = useForm({
        nom: hopital.nom,
        adresse: hopital.adresse,
        telephone: hopital.telephone,
        carte: hopital.carte,
        note: hopital.note || 0,
    });

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/pharmacie-sante/hopitaux/${hopital.id}`, {
            onSuccess: () => {
                router.visit('/pharmacie-sante/hopitaux');
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour :', errors);
            },
        });
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Modifier un Hôpital" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold">Modifier un Hôpital</h1>
                    <Link href={route('hopitaux.index')} className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>

                <hr className="border border-danger border-3 opacity-75" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow p-4">
                        <h5 className="mb-4">Informations générales</h5>

                        <div className="mb-3">
                            <InputLabel htmlFor="nom" value="Nom de l'hôpital" />
                            <TextInput id="nom" type="text" name="nom" value={data.nom} onChange={(e) => setData('nom', e.target.value)} required />
                            <InputError message={errors.nom} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="adresse" value="Adresse" />
                            <TextInput id="adresse" type="text" name="adresse" value={data.adresse} onChange={(e) => setData('adresse', e.target.value)} required />
                            <InputError message={errors.adresse} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="telephone" value="Téléphone" />
                            <TextInput id="telephone" type="text" name="telephone" value={data.telephone} onChange={(e) => setData('telephone', e.target.value)} required />
                            <InputError message={errors.telephone} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="carte" value="Lien de la carte (facultatif)" />
                            <TextInput id="carte" type="text" name="carte" value={data.carte} onChange={(e) => setData('carte', e.target.value)} />
                            <InputError message={errors.carte} className="mt-2" />
                        </div>

                        <div className="mb-3">
                            <InputLabel htmlFor="note" value="Note (0 à 5)" />
                            <TextInput id="note" type="number" name="note" value={data.note} onChange={(e) => setData('note', e.target.value)} min="0" max="5" step="0.1" />
                            <InputError message={errors.note} className="mt-2" />
                        </div>

                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                Mettre à jour
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default HopitaleEdit;
