import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const AddSecondaryImagesForm = ({ produitId, imagesSecondaires = [] }) => {
    const { props } = usePage(); // Accéder aux props transmises par Laravel
    const appUrl = props.appUrl; // Récupérer l'URL de base
    const { data, setData, post, processing, errors } = useForm({
        image_secondaires: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [currentImages, setCurrentImages] = useState(imagesSecondaires || []);
    const [showModal, setShowModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);

    // Récupération des flash messages
    const { flash } = usePage().props;

    // Gestion du changement d'images
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('image_secondaires', files);

        const previews = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                previews.push(reader.result);
                if (previews.length === files.length) {
                    setImagePreviews(previews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/supermarche/produits/${produitId}/images`, {
            onSuccess: (response) => {
                console.log('Images ajoutées :', response.props.newImages);
                if (response.props.newImages) {
                    setCurrentImages((prev) => [...prev, ...response.props.newImages]);
                }
                setImagePreviews([]);
                setData('image_secondaires', []);
            },
            onError: (error) => {
                console.error('Erreur:', error);
                setImagePreviews([]);
            },
        });
    };

    // Gestion de la suppression d'une image
    const handleDelete = (imageId) => {
        setImageToDelete(imageId);
        setShowModal(true);
    };

    // Confirmation de la suppression
    const confirmDelete = () => {
        if (imageToDelete) {
            Inertia.delete(route('imagesSecondaires.destroy', imageToDelete), {
                onSuccess: () => {
                    setCurrentImages((prev) => prev.filter((img) => img.id !== imageToDelete));
                    setShowModal(false);
                },
            });
        }
    };

    // Annulation de la suppression
    const cancelDelete = () => {
        setShowModal(false);
    };

    return (
        <AdminLayout>
            {/* <DashboardNavbar/> */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0 montserrat-normal">Gestion des images secondaires</h5>
                    <hr className="border-warning border-2 opacity-75"/>
                </div>
                <div className="card-body">
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="alert alert-success mb-3">{flash.success}</div>
                    )}
                    {flash?.error && (
                        <div className="alert alert-danger mb-3">{flash.error}</div>
                    )}

                    {/* Images secondaires actuelles */}
                    {currentImages.length > 0 && (
                        <div className="mb-4">
                            <h6 className="mb-3">Images actuelles</h6>
                            <div className="row g-3">
                                {currentImages.map((image) => (
                                    <div
                                        key={image.id}
                                        className="col-6 col-sm-4 col-md-3 position-relative"
                                    >
                                        <div className="card shadow-sm">
                                            <img
                                                src={`${appUrl}${image.url}`} // Correction ici
                                                alt="Image secondaire"
                                                className="card-img-top"
                                                style={{
                                                    objectFit: 'cover',
                                                    height: '150px',
                                                }}
                                            />
                                            <button
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                                onClick={() => handleDelete(image.id)}
                                                aria-label="Supprimer cette image"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Formulaire d'ajout */}
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="mb-3">
                            <label
                                htmlFor="image_secondaires"
                                className="form-label fw-bold"
                            >
                                Ajouter des images secondaires
                            </label>
                            <input
                                type="file"
                                id="image_secondaires"
                                name="image_secondaires[]"
                                className="form-control"
                                multiple
                                onChange={handleImageChange}
                            />
                            {errors.image_secondaires && (
                                <div className="text-danger small mt-1">
                                    {errors.image_secondaires}
                                </div>
                            )}
                        </div>

                        {/* Aperçu des nouvelles images */}
                        {imagePreviews.length > 0 && (
                            <div className="mb-3">
                                <h6>Aperçu des nouvelles images</h6>
                                <div className="row g-3">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="col-6 col-sm-4 col-md-3">
                                            <div className="card shadow-sm">
                                                <img
                                                    src={preview}
                                                    alt={`Aperçu ${index + 1}`}
                                                    className="card-img-top"
                                                    style={{
                                                        objectFit: 'cover',
                                                        height: '150px',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="d-flex justify-content-between">
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={processing}
                            >
                                <i className="bi bi-plus-circle me-2"></i>Ajouter
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    Inertia.visit(`/supermarche/produits/${produitId}/edit`)
                                }
                            >
                                <i className="bi bi-arrow-left-circle me-2"></i>Retour
                            </button>
                        </div>
                    </form>
                </div>

                {/* Modal Bootstrap pour confirmation de suppression */}
                {showModal && (
                    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Confirmer la suppression</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={cancelDelete}
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="modal-body">
                                    Êtes-vous sûr de vouloir supprimer cette image ?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                                        Annuler
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AddSecondaryImagesForm;
