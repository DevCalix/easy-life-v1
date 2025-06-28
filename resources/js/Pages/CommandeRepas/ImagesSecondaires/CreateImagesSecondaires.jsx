import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { useForm, router, Link, Head } from "@inertiajs/react";
import { useState } from "react";

const CreateImagesSecondaires = ({ repas, imagesSecondaires = [] }) => {
    // Utilisation de useForm pour gérer les données du formulaire
    const { data, setData, post, processing, errors } = useForm({
        url_images: [], // Tableau pour stocker plusieurs images
    });

    // État pour l'aperçu des images
    const [imagePreviews, setImagePreviews] = useState([]);

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Utilisez FormData pour envoyer plusieurs fichiers
        const formData = new FormData();
        data.url_images.forEach((file, index) => {
            formData.append(`url_images[${index}]`, file);
        });

        post(route('repas.images-secondaires.store', repas.id), {
            data: formData,
            onSuccess: () => {
                // Réinitialiser le formulaire après la soumission
                setData({ url_images: [] });
                setImagePreviews([]);
            },
        });
    };

    // Gestion du changement des images
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convertir FileList en tableau
        if (files.length > 0) {
            setData('url_images', files);

            // Générer des aperçus pour les images sélectionnées
            const previews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    // Gestion de la suppression d'une image secondaire
    const handleDelete = (imageId) => {
        if (confirm("Voulez-vous vraiment supprimer cette image ?")) {
            router.delete(route('repas.images-secondaires.destroy', { repas: repas.id, image: imageId }), {
                onSuccess: () => {
                    // Rafraîchir la page ou afficher un message de succès
                },
            });
        }
    };

    return (
        <AdminLayout title="Image secondaire">
            
            <div className="container-fluid">
                {/* Bouton de retour */}
                <div className="my-2">
                    <Link href={route('repas.index')} className="btn btn-secondary">
                        Retour
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {/* Formulaire d'ajout d'images secondaires */}
                        <form onSubmit={handleSubmit} className="p-4 bg-light border rounded-3 shadow-sm mb-4">
                            <h2 className="mb-4 text-center text-primary">Ajouter des Images Secondaires</h2>

                            {/* Champ pour uploader plusieurs images */}
                            <div className="mb-3">
                                <InputLabel htmlFor="url_images" value="Images Secondaires" />
                                <FileInput
                                    id="url_images"
                                    name="url_images"
                                    onChange={handleImageChange}
                                    multiple // Permettre la sélection de plusieurs fichiers
                                />
                                {imagePreviews.length > 0 && (
                                    <div className="mt-3">
                                        {imagePreviews.map((preview, index) => (
                                            <img
                                                key={index}
                                                src={preview}
                                                alt={`Aperçu de l'image ${index + 1}`}
                                                className="img-thumbnail me-2"
                                                style={{ maxHeight: '100px' }}
                                            />
                                        ))}
                                    </div>
                                )}
                                <InputError message={errors.url_images} className="mt-1" />
                            </div>

                            {/* Bouton de soumission */}
                            <div className="text-center">
                                <PrimaryButton type="submit" disabled={processing}>
                                    {processing ? 'En cours...' : 'Ajouter les Images'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6">
                        {/* Liste des images secondaires existantes */}
                        <div className="p-4 bg-light border rounded-3 shadow-sm">
                            <h2 className="mb-4 text-center text-primary">Images Secondaires</h2>
                            {imagesSecondaires.length > 0 ? (
                                <div className="row">
                                    {imagesSecondaires.map((image) => (
                                        <div key={image.id} className="col-md-4 mb-3">
                                            <div className="card">
                                                <img
                                                    src={image.url_image}
                                                    alt="Image secondaire"
                                                    className="card-img-top"
                                                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                                                />
                                                <div className="card-body text-center">
                                                    <button
                                                        onClick={() => handleDelete(image.id)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center">Aucune image secondaire trouvée.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateImagesSecondaires;
