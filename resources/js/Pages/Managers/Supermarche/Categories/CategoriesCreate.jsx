import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Textarea from "@/Components/Textarea";
import TextInput from "@/Components/TextInput";
import SupermarketLayout from "@/Layouts/Managers/SupermarketLayout";
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoriesCreate = () => {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    // Formulaire pour l'ajout (nom, description, image)
    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        description: '',
        image_url: null,
    });

    // Formulaire pour la mise à jour de l'image (uniquement en édition)
    const { data: imageData, setData: setImageData, post: postImage, processing: imageProcessing, errors: imageErrors, reset: resetImage } = useForm({
        image_url: null,
    });

    const { flash } = usePage().props; // Récupérer les messages flash
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null); // État pour la catégorie en édition

    // Afficher les messages flash avec toast
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        if (flash.error) {
            toast.error(flash.error, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }, [flash]);

    // Fonction pour charger les catégories depuis l'API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/supermarche/managers/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des catégories :', error);
        }
    };

    // Charger les catégories au montage du composant
    useEffect(() => {
        fetchCategories();
    }, []);

    // Gestion du changement d'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image_url', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Gestion de la soumission du formulaire d'ajout
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/supermarche/managers/new-categories', {
            onSuccess: () => {
                reset();
                setImagePreview(null);
                fetchCategories();
            },
            onError: (errors) => {
                // Les erreurs seront gérées par les messages flash
            },
        });
    };

    // Gestion de la mise à jour d'une catégorie (nom et description)
    const handleUpdateCategory = (e) => {
        e.preventDefault();
        Inertia.put(`/supermarche/managers/categories/${editingCategory.id}`, data, {
            onSuccess: () => {
                reset();
                setEditingCategory(null);
                fetchCategories();
            },
            onError: (errors) => {
                // Les erreurs seront gérées par les messages flash
            },
        });
    };

    // Gestion de la suppression d'une catégorie
    const handleDeleteCategory = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            Inertia.delete(`/supermarche/managers/categories/${id}`, {
                onSuccess: () => {
                    toast.success('Catégorie supprimée avec succès !', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                },
                onError: () => {
                    toast.error('Erreur lors de la suppression de la catégorie.', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                },
            });
        }
    };

    // Gestion de l'édition d'une catégorie
    const handleEditCategory = (categorie) => {
        setEditingCategory(categorie);
        setData({
            nom: categorie.nom,
            description: categorie.description,
        });
        setImagePreview(categorie.image_url); // Afficher l'image existante
    };

    // Gestion de la soumission du formulaire d'image
const handleImageSubmit = (e) => {
    e.preventDefault();

    // Créer un objet FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append('image_url', imageData.image_url);
    formData.append('_method', 'PUT'); // Simuler une requête PUT

    // Envoyer la requête POST avec Inertia
    Inertia.post(`/supermarche/image-categories/${editingCategory.id}/update-image`, formData, {
        onSuccess: () => {
            resetImage();
            fetchCategories(); // Recharger les catégories
        },
        onError: (errors) => {
            console.error('Erreur lors de la mise à jour de l\'image :', errors);
        },
    });
};

    return (
        <SupermarketLayout title="Gestion des Catégories">
            
            <div className="container py-5">
                <h1 className="mb-4 h5 fw-bold">
                    {editingCategory ? 'Modifier une Catégorie' : 'Ajouter une Catégorie'}
                </h1>
                <hr className="border-2 border-danger opacity-75"/>
                {/* Formulaire d'ajout (nom, description, image) */}
                {!editingCategory && (
                    <form onSubmit={handleSubmit}>
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

                        {/* Description de la catégorie */}
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

                        {/* Image de la catégorie */}
                        <div className="mb-3">
                            <InputLabel htmlFor="image_url" value="Image de la Catégorie" />
                            <FileInput
                                id="image_url"
                                name="image_url"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-3">
                                    <img src={imagePreview} alt="Aperçu de l'image" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                </div>
                            )}
                            <InputError message={errors.image_url} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="mb-3">
                            <PrimaryButton disabled={processing}>
                                {processing ? 'En cours...' : 'Ajouter la Catégorie'}
                            </PrimaryButton>
                        </div>
                    </form>
                )}

                {/* Formulaire d'édition (nom et description) */}
                {editingCategory && (
                    <form onSubmit={handleUpdateCategory}>
                        <input type="hidden" name="id" value={editingCategory.id} />
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

                        {/* Description de la catégorie */}
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

                        {/* Bouton de soumission */}
                        <div className="mb-3">
                            <PrimaryButton disabled={processing}>
                                {processing ? 'En cours...' : 'Mettre à jour'}
                            </PrimaryButton>
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => {
                                    setEditingCategory(null);
                                    reset();
                                    setImagePreview(null);
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                )}

                {/* Formulaire pour mettre à jour l'image (uniquement en mode édition) */}
                {editingCategory && (
                    <div className="mt-5">
                        <h5>Modifier l'image de la catégorie</h5>
                        <form onSubmit={handleImageSubmit}>
                            <div className="mb-3">
                                <InputLabel htmlFor="image_url" value="Nouvelle Image" />
                                <FileInput
                                    id="image_url"
                                    name="image_url"
                                    onChange={(e) => setImageData('image_url', e.target.files[0])}
                                />
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img src={imagePreview} alt="Aperçu de l'image" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                    </div>
                                )}
                                <InputError message={imageErrors.image_url} className="mt-2" />
                            </div>
                            <div className="mb-3">
                                <PrimaryButton disabled={imageProcessing}>
                                    {imageProcessing ? 'En cours...' : 'Mettre à jour l\'image'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                )}

                {/* Section pour afficher les catégories */}
                <div className="row mt-5">
                    <h6>Liste des Catégories</h6>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {categories.map((categorie) => (
                            <div key={categorie.id} className="col">
                                <div className="card h-100">
                                    {categorie.image_url && (
                                        <img
                                            src={`${appUrl}${categorie.image_url}`}
                                            alt={categorie.nom}
                                            className="card-img-top"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body montserrat">
                                        <h6 className="card-title fw-bold">{categorie.nom}</h6>
                                        <div className="d-flex justify-content-between w-100">
                                            {/* Bouton Modifier à gauche */}
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => handleEditCategory(categorie)}
                                                title="Modifier"
                                            >
                                                <i className="bi bi-pencil"></i> {/* Icône Modifier */}
                                            </button>

                                            {/* Bouton Supprimer à droite */}
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteCategory(categorie.id)}
                                                title="Supprimer"
                                            >
                                                <i className="bi bi-trash"></i> {/* Icône Supprimer */}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ToastContainer pour afficher les notifications */}
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
            </div>
        </SupermarketLayout>
    );
};

export default CategoriesCreate;
