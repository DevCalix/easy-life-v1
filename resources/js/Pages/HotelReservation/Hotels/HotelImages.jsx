import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HotelImages = ({ hotel }) => {
    const { flash } = usePage().props;

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

    const { data, setData, post, processing, errors } = useForm({
        image_principale: null,
        images_secondaires: [], // Ajout d'un champ pour les images secondaires
    });

    const [imagePreview, setImagePreview] = useState(hotel.image_principale_url);
    const [secondairesPreviews, setSecondairesPreviews] = useState([]); // Prévisualisation des images secondaires

    const handleImagePrincipaleChange = (e) => {
        const file = e.target.files[0];
        setData('image_principale', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImagesSecondairesChange = (e) => {
        const files = Array.from(e.target.files); // Convertir FileList en tableau
        setData('images_secondaires', files);

        // Générer des prévisualisations pour les images secondaires
        const previews = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(previews).then(results => {
            setSecondairesPreviews(results);
        });
    };

    const handleUpdateImagePrincipale = (e) => {
        e.preventDefault();
        post(`/reservation-hotel/hotels/${hotel.id}/update-image-principale`, {
            preserveScroll: true,
            onSuccess: () => {
                setData('image_principale', null);
            },
        });
    };

    const handleAddImagesSecondaires = (e) => {
        e.preventDefault();
        post(`/reservation-hotel/hotels/${hotel.id}/add-image-secondaire`, {
            preserveScroll: true,
            onSuccess: () => {
                setData('images_secondaires', []); // Réinitialiser le champ après succès
                setSecondairesPreviews([]); // Réinitialiser les prévisualisations
            },
        });
    };

    return (
        <AdminLayout title="Gestion des Images de l'Hôtel">
            <div className="container-fluid py-2">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="mb-4 montserrat-normal fw-bold">Gestion des Images de l'Hôtel</h1>
                    <button
                        className="btn btn-outline-primary btn-sm montserrat-regulier"
                        onClick={() => Inertia.visit(route('hotels.index'))}
                    >
                        Retour
                    </button>
                </div>

                <hr className="border border-danger border-3 opacity-75"/>

                {/* Image Principale */}
                <div className="card shadow p-4 mb-4">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="mb-4">Image Principale</h5>
                            <form onSubmit={handleUpdateImagePrincipale}>
                                <div className="mb-3">
                                    <InputLabel htmlFor="image_principale" value="Nouvelle Image Principale" />
                                    <FileInput
                                        id="image_principale"
                                        name="image_principale"
                                        onChange={handleImagePrincipaleChange}
                                    />
                                    {imagePreview && (
                                        <div className="mt-3">
                                            <img src={imagePreview} alt="Aperçu de l'image" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                        </div>
                                    )}
                                    <InputError message={errors.image_principale} className="mt-2" />
                                </div>
                                <div className="text-center mt-4">
                                    <PrimaryButton disabled={processing}>
                                        Mettre à jour l'Image Principale
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src={hotel.image_principale} alt="Image secondaire" className="img-thumbnail" />
                        </div>

                    </div>

                </div>

                {/* Images Secondaires */}
                <div className="card shadow p-4">
                    <h5 className="mb-4">Images Secondaires</h5>
                    <form onSubmit={handleAddImagesSecondaires}>
                        <div className="mb-3">
                            <InputLabel htmlFor="images_secondaires" value="Ajouter des Images Secondaires" />
                            <FileInput
                                id="images_secondaires"
                                name="images_secondaires"
                                onChange={handleImagesSecondairesChange}
                                multiple // Permettre la sélection de plusieurs fichiers
                            />
                            <InputError message={errors.images_secondaires} className="mt-2" />
                        </div>

                        {/* Prévisualisation des images secondaires */}
                        <div className="row mt-3">
                            {secondairesPreviews.map((preview, index) => (
                                <div key={index} className="col-md-3 mb-3">
                                    <img src={preview} alt={`Aperçu de l'image ${index}`} className="img-thumbnail" style={{ maxHeight: '200px' }} />
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-4">
                            <PrimaryButton disabled={processing}>
                                Ajouter les Images Secondaires
                            </PrimaryButton>
                        </div>
                    </form>

                    {/* Affichage des images secondaires existantes */}
                    <div className="mt-4">
                        <h6>Images Secondaires Existantes</h6>
                        <div className="row">
                            {hotel.images.map((image) => (
                                <div key={image.id} className="col-md-3 mb-3">
                                    <img src={image.url} alt="Image secondaire" className="img-thumbnail" />
                                    <button
                                        className="btn btn-danger btn-sm mt-2"
                                        onClick={() => router.delete(`/reservation-hotel/hotels/images/${image.id}`)}
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
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

export default HotelImages;
