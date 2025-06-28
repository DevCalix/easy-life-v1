import React from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';

const EditSubmenu = ({ submenu }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: submenu.title,
        url: submenu.url,
        is_active: submenu.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/sous-menu/${submenu.id}`, {
            preserveScroll: true,
            onSuccess: () => router.visit('/admin/sous-menu'),
        });
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Modifier le Sous-Menu" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">Modifier le Sous-Menu</h1>
                    <Link href={route('sous-menu.index')} className="btn btn-primary montserrat-normal">
                        Retour à la liste
                    </Link>
                </div>

                <hr className="border border-primary border-3 opacity-75 mb-5" />
                
                <form onSubmit={handleSubmit}>
                    <div className="card shadow-lg p-4">
                        <div className="card-body">
                            <div className="row gy-4">
                                {/* Titre du sous-menu */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="title" value="Titre du Sous-Menu" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        placeholder="Ex: Livraison de repas"
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* URL du sous-menu */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="url" value="URL du Sous-Menu" />
                                    <TextInput
                                        id="url"
                                        type="text"
                                        name="url"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        required
                                        placeholder="Ex: /restaurant"
                                    />
                                    <InputError message={errors.url} className="mt-2" />
                                </div>

                                {/* Statut actif/inactif */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="is_active" value="Statut" />
                                    <select
                                        id="is_active"
                                        name="is_active"
                                        className="form-select"
                                        value={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.value === 'true')}
                                        required
                                    >
                                        <option value={true}>Actif</option>
                                        <option value={false}>Inactif</option>
                                    </select>
                                    <InputError message={errors.is_active} className="mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-light text-center mt-3">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditSubmenu;