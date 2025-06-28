import React, { useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const Edit = ({ contactInfo }) => {
    const { data, setData, put, processing, errors } = useForm({
        phone_number: contactInfo ? contactInfo.phone_number : '',
    });

    const {flash } = usePage().props;

        // Afficher les messages de succès ou d'erreur
        useEffect(() => {
            if (flash.success) {
                toast.success(flash.success, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
            if (flash.error) {
                toast.error(flash.error, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
            }
        }, [flash.success, flash.error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/adds/contact-number/update', {
            onSuccess: () => {
                // Afficher un message de succès ou rediriger
            },
        });
    };

    return (
        <AdminLayout title="Modifier le numéro de contact">

            <div className="container py-2">
                <div className="card shadow p-4">
                    <h1 className="mb-4 text-center montserrat-normal fw-bold">
                        Modifier le numéro de contact
                    </h1>
                    <form onSubmit={handleSubmit}>
                        {/* Champ pour le numéro de téléphone */}
                        <div className="mb-3">
                            <InputLabel htmlFor="phone_number" value="Numéro de téléphone" />
                            <TextInput
                                id="phone_number"
                                type="text"
                                name="phone_number"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                className="form-control"
                                placeholder="Entrez le numéro de téléphone"
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="d-flex justify-content-center">
                            <PrimaryButton disabled={processing}>
                                {processing ? 'En cours...' : 'Mettre à jour'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AdminLayout>
    );
};

export default Edit;
