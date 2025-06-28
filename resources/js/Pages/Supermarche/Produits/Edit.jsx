import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import DatalistInput from '@/Components/DatalistInput';
import SelectInputTom from '@/Components/SelectInputTom';
import Checkbox from '@/Components/Checkbox';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const Edit = ({ produit }) => {
    const { data, setData, put, processing, errors } = useForm({
        nom: produit.nom,
        slug: produit.slug,
        description_courte: produit.description_courte,
        description: produit.description,
        prix: produit.prix,
        statut: produit.statut,
        category_id: produit.category_id,
        tags: produit.tags.map(tag => tag.id),
        store_id: produit.store ? produit.store.id : null,
        is_variable: produit.is_variable || false, // Valeur par défaut si `is_variable` est undefined ou null
        est_populaire: produit.est_populaire,
        pourcentage_reduction: produit.pourcentage_reduction,
    });

    const [categories, setCategories] = useState([]);
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [isAddingNewTag, setIsAddingNewTag] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [loadingTag, setLoadingTag] = useState(false);
    const [stores, setStores] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/supermarche/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des catégories :', error);
        }
    };

    const fetchStores = async () => {
        try {
            const response = await axios.get('/supermarche/magasins');
            setStores(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des magasins :', error);
        }
    };

    const handleAddNewCategory = async () => {
        if (newCategory.trim() === '' || loading) return;

        setLoading(true);
        try {
            const response = await axios.post('/supermarche/categories', {
                nom: newCategory,
                description: newCategoryDescription,
            });

            fetchCategories();
            setNewCategory('');
            setNewCategoryDescription('');
            setIsAddingNewCategory(false);
            setData('category_id', response.data.id);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie :', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const category = categories.find(cat => cat.nom.toLowerCase() === value.toLowerCase());

        if (category) {
            setData('category_id', category.id);
            setNewCategory('');
        } else {
            setData('category_id', '');
            setNewCategory(value);
        }
    };

    const handleTagsChange = (e) => {
        setData('tags', Array.from(e.target.selectedOptions, option => option.value));
    };

    const fetchTags = async () => {
        try {
            const response = await axios.get('/supermarche/tags');
            setTags(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des tags :', error);
        }
    };

    const handleAddNewTag = async () => {
        if (newTag.trim() === '' || loadingTag) return;

        setLoadingTag(true);
        try {
            const response = await axios.post('/supermarche/tags', {
                nom: newTag,
            });

            fetchTags();
            setNewTag('');
            setIsAddingNewTag(false);
            setData('tags', [...data.tags, response.data.id]);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du tag :', error);
        } finally {
            setLoadingTag(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTags();
        fetchStores();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/supermarche/produits/${produit.id}`);
    };

    return (
        <AdminLayout>
            {/* <DashboardNavbar/> */}
            <Head title='Mise à jour'/>
            <div className="container py-1">
                <h1 className="mb-4 montserrat-normal fw-bold">Modifier le Produit</h1>
                <hr className="border-warning border-2 opacity-75"/>
                <form onSubmit={handleSubmit}>
                    {/* Nom du produit */}
                    <div className="mb-3">
                        <InputLabel htmlFor="nom" value="Nom du Produit" />
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

                    {/* Description courte et détaillée */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <InputLabel htmlFor="description_courte" value="Courte description" />
                            <Textarea
                                id="description_courte"
                                name="description_courte"
                                value={data.description_courte}
                                onChange={(e) => setData('description_courte', e.target.value)}
                                rows="3"
                            />
                            <InputError message={errors.description_courte} className="mt-2" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <InputLabel htmlFor="description" value="Description détaillée" />
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="3"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>

                    {/* Prix et statut */}
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <InputLabel htmlFor="prix" value="Prix" />
                            <TextInput
                                id="prix"
                                type="number"
                                name="prix"
                                value={data.prix}
                                onChange={(e) => setData('prix', e.target.value)}
                                required
                            />
                            <InputError message={errors.prix} className="mt-2" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <InputLabel htmlFor="pourcentage_reduction" value="Offre" />
                            <TextInput
                                id="pourcentage_reduction"
                                type="number"
                                name="pourcentage_reduction"
                                value={data.pourcentage_reduction}
                                placeholder="% de reduction"
                                onChange={(e) => setData('pourcentage_reduction', e.target.value)}
                            />
                            <InputError message={errors.prix} className="mt-2" />
                        </div>
                        <div className="col-md-4 mb-3">
                            <InputLabel htmlFor="statut" value="Statut" />
                            <SelectInput
                                id="statut"
                                name="statut"
                                options={[
                                    { value: 'actif', label: 'Actif' },
                                    { value: 'épuisé', label: 'Épuisé' },
                                ]}
                                value={data.statut}
                                onChange={(e) => setData('statut', e.target.value)}
                            />
                            <InputError message={errors.statut} className="mt-2" />
                        </div>
                    </div>

                    {/* Catégories */}
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <InputLabel htmlFor="category" value="Catégorie" />
                            <DatalistInput
                                id="category"
                                name="category"
                                options={categories.map((category) => ({
                                    label: category.nom,
                                    value: category.nom,
                                }))}
                                value={newCategory || categories.find(cat => cat.id === data.category_id)?.nom || ''}
                                onChange={handleCategoryChange}
                                placeholder="Choisissez ou saisissez une catégorie"
                            />

                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isAddingNewCategory}
                                    onChange={() => setIsAddingNewCategory(!isAddingNewCategory)}
                                    id="newCategoryCheckbox"
                                />
                                <label className="form-check-label" htmlFor="newCategoryCheckbox">
                                    Ajouter une nouvelle catégorie
                                </label>
                            </div>

                            {isAddingNewCategory && (
                                <>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom de la nouvelle catégorie"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <textarea
                                            className="form-control"
                                            placeholder="Description de la catégorie"
                                            value={newCategoryDescription}
                                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-3"
                                        onClick={handleAddNewCategory}
                                        disabled={loading}
                                    >
                                        {loading ? 'Ajout en cours...' : 'Ajouter la catégorie'}
                                    </button>
                                </>
                            )}
                            <InputError message={errors.category_id} className="mt-2" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <InputLabel htmlFor="tags" value="Tags" />
                            <SelectInputTom
                                id="tags"
                                name="tags"
                                options={tags.map((tag) => ({ value: tag.id, label: tag.nom }))}
                                value={data.tags}
                                onChange={(values) => setData('tags', values)}
                                className="mb-3"
                            />

                            <div className="form-check mt-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={isAddingNewTag}
                                    onChange={() => setIsAddingNewTag(!isAddingNewTag)}
                                    id="newTagCheckbox"
                                />
                                <label className="form-check-label" htmlFor="newTagCheckbox">
                                    Ajouter un nouveau tag
                                </label>
                            </div>

                            {isAddingNewTag && (
                                <>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom du nouveau tag"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary mt-3"
                                        onClick={handleAddNewTag}
                                        disabled={loadingTag}
                                    >
                                        {loadingTag ? 'Ajout en cours...' : 'Ajouter le tag'}
                                    </button>
                                </>
                            )}
                            <InputError message={errors.tags} className="mt-2" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <InputLabel htmlFor="store" value="Associé un Store" />
                            <SelectInput
                                id="store_id"
                                name="store_id"
                                options={stores.map((store) => ({
                                    value: store.id,
                                    label: store.nom,
                                }))}
                                value={data.store_id}
                                onChange={(e) => setData('store_id', e.target.value)}  // Mise à jour de store_id
                            />
                            <InputError message={errors.store} className="mt-2" />
                        </div>
                    </div>
                    {/* Options supplémentaires */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <Checkbox
                                    id="is_variable"
                                    name="is_variable"
                                    checked={data.is_variable}
                                    onChange={(e) => setData('is_variable', e.target.checked)}
                                />
                                <InputLabel htmlFor="is_variable" value="Produit à variations" />
                                <InputError message={errors.is_variable} className="mt-2" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <Checkbox
                                    id="est_populaire"
                                    name="est_populaire"
                                    checked={data.est_populaire}
                                    onChange={(e) => setData('est_populaire', e.target.checked)}
                                />
                                <InputLabel htmlFor="est_populaire" value="Produit populaire" />
                                <InputError message={errors.est_populaire} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Boutons de soumission */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <PrimaryButton disabled={processing} className="btn btn-primary">
                            Mettre à jour le produit
                        </PrimaryButton>

                        <div className="btn-group" role="group" aria-label="Actions supplémentaires">
                            <Link
                                href={`/supermarche/produits/${produit.id}/edit-image`}
                                className="btn btn-warning"
                            >
                                Modifier l'image principale
                            </Link>
                            <Link
                                href={`/supermarche/produits/${produit.id}/ajouter-images`}
                                className="btn btn-warning"
                            >
                                Ajouter des Images secondaires
                            </Link>
                            {/* Afficher le bouton "Ajouter une Variation" uniquement si le produit est à variation */}
                            {data.is_variable === true && (
                                <Link
                                    href={`/supermarche/produits/${produit.id}/ajouter-variation`}
                                    className="btn btn-info"
                                >
                                    Ajouter une Variation
                                </Link>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default Edit;
