import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, router } from "@inertiajs/react"; // Importez router depuis Inertia
import { useState } from "react";
import { Link } from '@inertiajs/react'; // Importez Link pour la navigation
import AdminLayout from "@/Layouts/Admin/AdminLayout";

const AddVariationRepas = ({ repas, variations }) => {
    // Utilisation de useForm pour gérer les données du formulaire
    const { data, setData, post, processing, errors } = useForm({
        repas_id: repas.id, // Utilisation de repas.id pour l'ID du repas
        type_variation: '', // Nouveau champ : type de variation
        valeur_variation: '', // Nouveau champ : valeur de variation
        prix: '',
        image_variation: null,
    });

    // État pour l'aperçu de l'image
    const [imagePreview, setImagePreview] = useState(null);

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('repas.variations.store', { repas: repas.id }), {
            onSuccess: () => {
                // Réinitialiser le formulaire après la soumission
                setData({
                    repas_id: repas.id,
                    type_variation: '',
                    valeur_variation: '',
                    prix: '',
                    image_variation: null,
                });
                setImagePreview(null);
            },
        });
    };

    // Gestion du changement de l'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image_variation', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Gestion de la suppression d'une variation
    const handleDelete = (variationId) => {
        if (confirm("Voulez-vous vraiment supprimer cette variation ?")) {
            router.delete(route('repas.variations.destroy', { repas: repas.id, variation: variationId }), {
                onSuccess: () => {
                    // Rafraîchir la page ou afficher un message de succès
                },
            });
        }
    };

    return (
        <AdminLayout title="Ajouter une Variation">
            <div className="container-fluid">
                {/* Bouton de retour */}
                <div className="my-2">
                    <Link href={route('repas.index')} className="btn btn-secondary">
                        Retour
                    </Link>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        {/* Formulaire d'ajout de variation */}
                        <form onSubmit={handleSubmit} className="p-2 bg-light border rounded-3 shadow-sm mb-4">
                            {/* Titre */}
                            <h2 className="mb-4 text-center text-primary montserrat-normal">Ajouter une Variation</h2>

                            {/* Type de la variation */}
                            <div className="mb-3">
                                <InputLabel htmlFor="type_variation" value="Type de la Variation" />
                                <TextInput
                                    id="type_variation"
                                    type="text"
                                    name="type_variation"
                                    value={data.type_variation}
                                    onChange={(e) => setData('type_variation', e.target.value)}
                                    required
                                    placeholder="Entrez le type de la variation (ex: Taille, Sauce, etc.)"
                                />
                                <InputError message={errors.type_variation} className="mt-1" />
                            </div>

                            {/* Valeur de la variation */}
                            <div className="mb-3">
                                <InputLabel htmlFor="valeur_variation" value="Valeur de la Variation" />
                                <TextInput
                                    id="valeur_variation"
                                    type="text"
                                    name="valeur_variation"
                                    value={data.valeur_variation}
                                    onChange={(e) => setData('valeur_variation', e.target.value)}
                                    required
                                    placeholder="Entrez la valeur de la variation (ex: Petite, Grande, Spicy, etc.)"
                                />
                                <InputError message={errors.valeur_variation} className="mt-1" />
                            </div>

                            {/* Prix de la variation */}
                            <div className="mb-3">
                                <InputLabel htmlFor="prix" value="Prix (en CFA)" />
                                <TextInput
                                    id="prix"
                                    type="number"
                                    name="prix"
                                    value={data.prix}
                                    onChange={(e) => setData('prix', e.target.value)}
                                    required
                                    placeholder="Entrez le prix"
                                />
                                <InputError message={errors.prix} className="mt-1" />
                            </div>

                            {/* Image de la variation */}
                            <div className="mb-3">
                                <InputLabel htmlFor="image_variation" value="Image de la Variation" />
                                <FileInput
                                    id="image_variation"
                                    name="image_variation"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <div className="mt-3 text-center">
                                        <img
                                            src={imagePreview}
                                            alt="Aperçu de l'image"
                                            className="img-thumbnail"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}
                                <InputError message={errors.image_variation} className="mt-1" />
                            </div>

                            {/* Bouton de soumission */}
                            <div className="text-center">
                                <PrimaryButton type="submit" disabled={processing}>
                                    {processing ? 'En cours...' : 'Ajouter la Variation'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6">
                        {/* Liste des variations existantes */}
                        <div className="p-4 bg-light border rounded-3 shadow-sm">
                            <h2 className="mb-4 text-center text-primary montserrat-normal">Variations existantes</h2>
                            {variations.length > 0 ? (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Valeur</th>
                                            <th>Prix</th>
                                            <th>Image</th>
                                            <th>Actions</th> {/* Colonne pour les boutons d'actions */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {variations.map((variation) => (
                                            <tr key={variation.id}>
                                                <td>{variation.type_variation}</td>
                                                <td>{variation.valeur_variation}</td>
                                                <td>{variation.prix} CFA</td>
                                                <td>
                                                    {variation.image_variation && (
                                                        <img
                                                            src={`${variation.image_variation}`}
                                                            alt="Image de la variation"
                                                            className="img-thumbnail"
                                                            style={{ maxHeight: '50px' }}
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    {/* Bouton de suppression */}
                                                    <button
                                                        onClick={() => handleDelete(variation.id)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-center">Aucune variation trouvée.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddVariationRepas;
