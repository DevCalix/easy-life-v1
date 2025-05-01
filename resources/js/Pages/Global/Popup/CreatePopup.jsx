import React, { useState } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePopup = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        message: '',
        cover_popup: null,
        delay: 5000,
        is_active: true,
        redirect_url: '', // Nouveau champ pour le lien de redirection
    });

    const [mediaPreview, setMediaPreview] = useState(null);

    // Gestion du changement de fichier
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setData('cover_popup', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setMediaPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/adds/popups', {
            onSuccess: () => {
                router.visit('/adds/popups');
                toast.success('Popup créé avec succès !');
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission :', errors);
                toast.error('Une erreur est survenue lors de la soumission du formulaire.');
            },
        });
    };

    return (
        <>
            <DashboardNavbar />
            <Head title="Créer un Popup" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">Créer un Popup</h1>
                    <Link href="/admin/popups" className="btn btn-primary montserrat-normal">
                        Retour
                    </Link>
                </div>

                <hr className="border border-primary border-3 opacity-75 mb-5" />
                <form onSubmit={handleSubmit}>
                    <div className="card shadow-lg p-4">
                        <div className="card-body">
                            <div className="row gy-4">
                                {/* Titre */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="title" value="Titre" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Message */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="message" value="Message" />
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows="4"
                                    />
                                    <InputError message={errors.message} className="mt-2" />
                                </div>

                                {/* Délai */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="delay" value="Délai (ms)" />
                                    <TextInput
                                        id="delay"
                                        type="number"
                                        name="delay"
                                        value={data.delay}
                                        onChange={(e) => setData('delay', e.target.value)}
                                        min="0"
                                    />
                                    <InputError message={errors.delay} className="mt-2" />
                                </div>

                                {/* Lien de redirection */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="redirect_url" value="Lien de redirection" />
                                    <TextInput
                                        id="redirect_url"
                                        type="url"
                                        name="redirect_url"
                                        value={data.redirect_url}
                                        onChange={(e) => setData('redirect_url', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    <InputError message={errors.redirect_url} className="mt-2" />
                                </div>

                                {/* Média (cover_popup) */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="cover_popup" value="Image du Popup" />
                                    <FileInput
                                        id="cover_popup"
                                        name="cover_popup"
                                        onChange={handleMediaChange}
                                        accept="image/*"
                                    />
                                    {mediaPreview && (
                                        <div className="mt-3">
                                            <img
                                                src={mediaPreview}
                                                alt="Aperçu de l'image"
                                                className="img-thumbnail"
                                                style={{ maxHeight: '150px' }}
                                            />
                                        </div>
                                    )}
                                    <InputError message={errors.cover_popup} className="mt-2" />
                                </div>

                                {/* Statut */}
                                <div className="col-md-6">
                                    <InputLabel htmlFor="is_active" value="Statut" />
                                    <SelectInput
                                        id="is_active"
                                        name="is_active"
                                        options={[
                                            { value: true, label: 'Actif' },
                                            { value: false, label: 'Inactif' },
                                        ]}
                                        value={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.value === 'true')}
                                    />
                                    <InputError message={errors.is_active} className="mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer bg-light text-center mt-3">
                            <PrimaryButton type="submit" disabled={processing}>
                                Créer le Popup
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreatePopup;
