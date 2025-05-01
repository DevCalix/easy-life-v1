import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import axios from 'axios';
import DatalistInput from '@/Components/DatalistInput';
import SelectInputTom from '@/Components/SelectInputTom';
import CheckboxInput from '@/Components/CheckboxInput';
import Checkbox from '@/Components/Checkbox';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        slug: '',
        description_courte: '',
        description: '',
        prix: '',
        image_principale: null,
        statut: 'actif',
        category_id: '', // ID de la catégorie sélectionnée
        tags: [],
        stores: [],
        is_variable: false,
        est_populaire: false,
        pourcentage_reduction: '',
    });

    const [categories, setCategories] = useState([]); // Liste des catégories
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [loading, setLoading] = useState(false); // Indicateur de chargement
    const [newCategory, setNewCategory] = useState(''); // Pour gérer la nouvelle catégorie
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    //Tags
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]); // Liste des tags
    const [isAddingNewTag, setIsAddingNewTag] = useState(false);  // Contrôle l'état d'ajout d'un nouveau tag
    const [newTag, setNewTag] = useState('');  // Nom du nouveau tag
    const [loadingTag, setLoadingTag] = useState(false);  // Indicateur de chargement pour l'ajout du tag

    const [stores, setStores] = useState([]); // Liste des magasins



    // Charger les catégories depuis la base de données
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/supermarche/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des catégories :', error);
        }
    };

    // Charger les magasins depuis la base de données
    const fetchStores = async () => {
        try {
            const response = await axios.get('/supermarche/magasins');
            setStores(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des magasins :', error);
        }
    };

    // Ajouter une nouvelle catégorie
    const handleAddNewCategory = async () => {
        if (newCategory.trim() === '' || loading) return;

        setLoading(true);
        try {
            const response = await axios.post('/supermarche/categories', {
                nom: newCategory,
                description: newCategoryDescription,
            });

            // Rafraîchir la liste des catégories après ajout
            fetchCategories();

            // Réinitialiser les champs
            setNewCategory('');
            setNewCategoryDescription('');
            setIsAddingNewCategory(false);

            // Mettre à jour le data avec la nouvelle catégorie
            setData('category_id', response.data.id); // Utiliser l'ID de la catégorie nouvellement ajoutée
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie :', error);
        } finally {
            setLoading(false);
        }
    };

    // Gérer la sélection de la catégorie ou la saisie d'une nouvelle catégorie
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const category = categories.find(cat => cat.nom.toLowerCase() === value.toLowerCase());

        if (category) {
            // Si une catégorie existante est sélectionnée
            setData('category_id', category.id);
            setNewCategory('');  // Réinitialisez la saisie de nouvelle catégorie si une catégorie existante est choisie
        } else {
            // Si la saisie ne correspond à aucune catégorie existante, vous pouvez décider de laisser cette saisie comme une nouvelle catégorie
            setData('category_id', '');  // Laisser vide pour l'ajout ultérieur ou gérer une nouvelle catégorie
            setNewCategory(value);  // Conservez la saisie comme nouvelle catégorie
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

            // Rafraîchir la liste des tags après ajout
            fetchTags();

            // Réinitialiser le champ
            setNewTag('');
            setIsAddingNewTag(false);

            // Ajouter le nouveau tag à la liste des tags dans le formulaire (facultatif)
            setData('tags', [...data.tags, response.data.id]);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du tag :', error);
        } finally {
            setLoadingTag(false);
        }
    };


    useEffect(() => {
        fetchCategories();
        fetchTags();  // Ajout de l'appel pour charger les tags
        fetchStores();  // Charger les magasins
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        post('/supermarche/produits');
    };

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image_principale', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <DashboardNavbar/>
            <Head title='Ajouté Nouveau Produits'/>
            <div className="container py-5">
                <h1 className="mb-4">Ajouter un Produit</h1>
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
                                    value: category.nom,  // Utiliser le nom de la catégorie pour la saisie libre
                                }))}
                                value={newCategory || categories.find(cat => cat.id === data.category_id)?.nom || ''}  // Assurez-vous que la valeur est toujours définie
                                onChange={handleCategoryChange} // Mettez à jour category_id ou laissez-le vide pour une nouvelle catégorie
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
                                onChange={(values) => setData('tags', values)} // Gérer les changements de sélection
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
                    <div className='row'>
                        <div className="col-md-12 mb-3">
                            <InputLabel htmlFor="stores" value="Associé un Store" />
                            <SelectInput
                                id="store_id"
                                name="store_id"
                                options={stores.map((store) => ({ value: store.id, label: store.nom }))}
                                value={data.store_id}
                                onChange={(e) => setData('store_id', e.target.value)}
                            />
                            <InputError message={errors.stores} className="mt-2" />
                        </div>

                    </div>
                    <div className="row">
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

                    </div>
                    <div className='row'>
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



                    {/* Bouton de soumission */}
                    <div className="mb-3">
                        <PrimaryButton disabled={processing}>
                            Ajouter le produit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Create;
