import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast } from "react-toastify";

const StoreImageUpload = ({ storeId, initialImage }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        photo_store: null,
    });

    const [imagePreview, setImagePreview] = useState(initialImage || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("photo_store", file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/supermarche/managers/stores/${storeId}/update-image`, {
            onSuccess: () => {
                toast.success("Image mise à jour avec succès !", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                reset();
            },
            onError: (errors) => {
                toast.error("Erreur lors de la mise à jour de l'image.", {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            },
        });
    };

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-secondary text-white">
                <h5 className="mb-0">Mettre à jour l'image du store</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {/* Champ pour uploader l'image */}
                    <div className="mb-3">
                        <FileInput
                            id="photo_store"
                            name="photo_store"
                            onChange={handleImageChange}
                            className="form-control"
                        />
                        {imagePreview && (
                            <div className="mt-3">
                                <img
                                    src={imagePreview}
                                    alt="Aperçu de l'image"
                                    className="img-thumbnail shadow-sm"
                                    style={{ maxHeight: "200px" }}
                                />
                            </div>
                        )}
                        <InputError
                            message={errors.photo_store}
                            className="mt-2 text-danger"
                        />
                    </div>

                    {/* Bouton de soumission */}
                    <div className="d-grid">
                        <PrimaryButton disabled={processing} className="btn btn-success">
                            {processing ? "En cours..." : "Mettre à jour l'image"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoreImageUpload;
