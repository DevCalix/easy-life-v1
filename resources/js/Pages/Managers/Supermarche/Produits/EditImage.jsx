import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import SupermarketLayout from '@/Layouts/Managers/SupermarketLayout';

const EditImage = ({ produit }) => {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    const { data, setData, post, processing, errors, reset } = useForm({
        image_principale: null, // Champ pour l'image
    });

    const [imagePreview, setImagePreview] = useState(
        produit.image_principale ? `${appUrl}${produit.image_principale}` : null
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData('image_principale', file);

            // Afficher un aperçu de l'image
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setData('image_principale', null);
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.image_principale) {
            // Si aucun fichier n'est sélectionné, utilisez la propriété `errors` pour afficher un message
            setData('image_principale', null); // Réinitialiser le champ
            return;
        }

        // Envoyer uniquement l'image au serveur
        post(`/supermarche/managers/mds-produits/${produit.id}/update-image`, {
            forceFormData: true, // Indique à Inertia d'utiliser FormData
            onSuccess: () => {
                reset(); // Réinitialiser le formulaire après succès
                setImagePreview(null); // Réinitialiser l'aperçu de l'image
            },
        });
    };

    return (
        <SupermarketLayout>

            <div className="container py-5">
            <h2 className="mb-4">Mettre à jour l'image principale</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Champ pour l'image */}
            <div className="mb-3">
            <InputLabel htmlFor="image_principale" value="Image Principale" />
            <FileInput
            id="image_principale"
            name="image_principale"
            onChange={handleImageChange}
            accept="image/*" // Limite les fichiers aux images
            />
            {imagePreview && (
            <div className="mt-3">
            <img
            src={imagePreview}
            alt="Aperçu de l'image"
            className="img-thumbnail"
            style={{ maxHeight: '200px' }}
            />
            </div>
            )}
            <InputError message={errors.image_principale} className="mt-2" />
            </div>

            {/* Bouton de soumission */}
            <div className="mb-3">
            <PrimaryButton disabled={processing || !data.image_principale}>
            {processing ? 'Mise à jour en cours...' : 'Mettre à jour l\'image'}
            </PrimaryButton>
            </div>
            </form>
            </div>
        </SupermarketLayout> 
    );
};

export default EditImage;
