import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import Checkbox from '@/Components/Checkbox';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import SelectInputTom from '@/Components/SelectInputTom';

const MedicamentEdit = ({ medicament, pharmacies, categories }) => {
    // Convertir les catégories associées en format attendu par SelectInputTom
    const initialCategories = medicament.categories.map(categorie => categorie.id);

    const { data, setData, put, processing, errors } = useForm({
        nom: medicament.nom,
        description: medicament.description,
        prix: medicament.prix,
        ordonnance_requise: medicament.ordonnance_requise,
        medicament_urgent: medicament.medicament_urgent,
        st_pharmacie_id: medicament.st_pharmacie_id,
        categories: initialCategories, // Stocker uniquement les IDs des catégories sélectionnées
    });

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('medicaments.update', medicament.id), {
            onSuccess: () => {
                router.visit(route('medicaments.index'));
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Modifier un Médicament" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Modifier un Médicament</h1>
                    <Link href={route('medicaments.index')} className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>
                <hr className="border border-warning border-3 opacity-75" />

                <form onSubmit={handleSubmit}>
                    <div className="card shadow p-4">
                        {/* Nom du médicament */}
                        <div className="mb-3">
                            <InputLabel htmlFor="nom" value="Nom du Médicament" />
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

                        {/* Prix */}
                        <div className="mb-3">
                            <InputLabel htmlFor="prix" value="Prix" />
                            <TextInput
                                id="prix"
                                type="number"
                                name="prix"
                                value={data.prix}
                                onChange={(e) => setData('prix', e.target.value)}
                                required
                                min="0"
                                step="0.01"
                            />
                            <InputError message={errors.prix} className="mt-2" />
                        </div>

                        {/* Ordonnance requise */}
                        <div className="mb-3">
                            <InputLabel htmlFor="ordonnance_requise" value="Ordonnance requise" />
                            <Checkbox
                                id="ordonnance_requise"
                                name="ordonnance_requise"
                                checked={data.ordonnance_requise}
                                onChange={(e) => setData('ordonnance_requise', e.target.checked)}
                            />
                            <InputError message={errors.ordonnance_requise} className="mt-2" />
                        </div>

                        {/* Médicament urgent */}
                        <div className="mb-3">
                            <InputLabel htmlFor="medicament_urgent" value="Médicament urgent" />
                            <Checkbox
                                id="medicament_urgent"
                                name="medicament_urgent"
                                checked={data.medicament_urgent}
                                onChange={(e) => setData('medicament_urgent', e.target.checked)}
                            />
                            <InputError message={errors.medicament_urgent} className="mt-2" />
                        </div>

                        {/* Sélection de la pharmacie */}
                        <div className="mb-3">
                            <InputLabel htmlFor="st_pharmacie_id" value="Pharmacie" />
                            <SelectInput
                                id="st_pharmacie_id"
                                name="st_pharmacie_id"
                                options={[
                                    { value: "", label: "Choisir une pharmacie" }, // Option par défaut
                                    ...pharmacies.map((pharmacie) => ({
                                        value: pharmacie.id,
                                        label: pharmacie.nom,
                                    })),
                                ]}
                                value={data.st_pharmacie_id}
                                onChange={(e) => setData('st_pharmacie_id', e.target.value)}
                                required
                            />
                            <InputError message={errors.st_pharmacie_id} className="mt-2" />
                        </div>

                        {/* Sélection des catégories */}
                        <div className="mb-3">
                            <InputLabel htmlFor="categories" value="Categories" />
                            <SelectInputTom
                                id="categories"
                                name="categories"
                                options={categories.map((categorie) => ({
                                    value: categorie.id,
                                    label: categorie.nom,
                                }))}
                                value={data.categories}
                                onChange={(values) => setData('categories', values)}

                            />
                            <InputError message={errors.categories} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                Modifier le Médicament
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MedicamentEdit;
