import React from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const CreateSubmenu = ({ submenus }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        url: '',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/sous-menu', {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Gérer les Sous-Menus">
            <Head title="Gérer les Sous-Menus" />
            <div className="container py-2">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-4 montserrat-normal fw-bold text-primary">Gérer les Sous-Menus</h1>
                    
                </div>

                <hr className="border border-primary border-3 opacity-75 mb-5" />

                {/* Formulaire d'ajout */}
                <div className="card shadow-lg mb-5">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0 montserrat-normal">Ajouter un nouveau sous-menu</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row gy-4">
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
                            <div className="text-end mt-4">
                                <PrimaryButton type="submit" disabled={processing}>
                                    {processing ? 'En cours...' : 'Ajouter le Sous-Menu'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Liste des sous-menus existants */}
                <div className="card shadow-lg">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0 montserrat-normal">Liste des sous-menus</h5>
                    </div>
                    <div className="card-body">
                        {submenus.length === 0 ? (
                            <div className="text-center py-4">
                                <p className="text-muted">Aucun sous-menu n'a été créé pour le moment</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Titre</th>
                                            <th>URL</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {submenus.map((submenu) => (
                                            <tr key={submenu.id}>
                                                <td>{submenu.title}</td>
                                                <td>{submenu.url}</td>
                                                <td>
                                                    <span className={`badge ${submenu.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                                        {submenu.is_active ? 'Actif' : 'Inactif'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        <Link
                                                            href={`/admin/sous-menu/${submenu.id}/edit`}
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            Modifier
                                                        </Link>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => {
                                                                if (confirm('Êtes-vous sûr de vouloir supprimer ce sous-menu ?')) {
                                                                    router.delete(`/admin/sous-menu/${submenu.id}`)
                                                                }
                                                            }}
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateSubmenu;
