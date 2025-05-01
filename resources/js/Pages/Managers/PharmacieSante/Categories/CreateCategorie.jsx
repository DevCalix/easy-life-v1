import React, { useState } from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PharmaLayout from '@/Layouts/Managers/PharmaLayout';

const CreateCategorie = ({ categories }) => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description: '',
        image_principale: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    // Gestion de l'image principale
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image_principale', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sts-medoc-categorie.store'), {
            onSuccess: () => {
                router.visit(route('medoc-categorie.index'));
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    // Supprimer une catégorie
    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
            router.delete(route('sts-medoc-categorie.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <PharmaLayout title="Ajouter une Catégorie">
            
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Ajouter une Catégorie</h1>

                </div>
                <hr className="border border-warning border-3 opacity-75" />

                <form onSubmit={handleSubmit}>
                    <div className="card shadow p-4">
                        {/* Nom de la catégorie */}
                        <div className="mb-3">
                            <InputLabel htmlFor="nom" value="Nom de la Catégorie" />
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

                        {/* Image Principale */}
                        <div className="mb-3">
                            <InputLabel htmlFor="image_principale" value="Image Principale" />
                            <FileInput
                                id="image_principale"
                                name="image_principale"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-3">
                                    <img src={imagePreview} alt="Aperçu de l'image" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                </div>
                            )}
                            <InputError message={errors.image_principale} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                Ajouter la Catégorie
                            </PrimaryButton>
                        </div>
                    </div>
                </form>

                {/* Section pour afficher les catégories existantes */}
                <div className="mt-5">
                    <h2 className="montserrat-normal fw-bold mb-4">Catégories existantes</h2>
                    <div className="row">
                        {categories.map((categorie) => (
                            <div key={categorie.id} className="col-6 col-md-3 mb-4">
                                <div className="card shadow h-100">
                                    <img
                                        src={categorie.image_principale ? categorie.image_principale : 'https://via.placeholder.com/150'}
                                        alt={categorie.nom}
                                        className="card-img-top"
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{categorie.nom}</h5>
                                        <p className="card-text">{categorie.description}</p>
                                        <button
                                            onClick={() => handleDelete(categorie.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PharmaLayout>
    );
};

export default CreateCategorie;
