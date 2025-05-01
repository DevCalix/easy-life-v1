import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import Navbar from '@/Layouts/Accueil/Navbar';

const DevenirAdminForm = () => {
    const { data, setData, post, processing, errors } = useForm({
        code_secret: '',
    });

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/devenir-admin');
    };

    return (
        <>
            <Navbar/>
            <Head title="Devenir Administrateur" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold">Devenir Administrateur</h1>
                </div>

                <hr className="border border-primary border-3 opacity-75" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow p-4">
                        <h5 className="mb-4">Entrez le code secret pour devenir administrateur</h5>

                        <div className="mb-3">
                            <InputLabel htmlFor="code_secret" value="Code Secret" />
                            <TextInput
                                id="code_secret"
                                type="text"
                                name="code_secret"
                                value={data.code_secret}
                                onChange={(e) => setData('code_secret', e.target.value)}
                                required
                            />
                            <InputError message={errors.code_secret} className="mt-2" />
                        </div>

                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? 'En cours...' : 'Devenir Administrateur'}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default DevenirAdminForm;
