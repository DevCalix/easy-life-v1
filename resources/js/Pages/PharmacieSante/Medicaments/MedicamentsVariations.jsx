import React, { useState, useEffect } from "react";
import { useForm, router, Head, Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import FileInput from "@/Components/FileInput";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";

const MedicamentVariationForm = ({ medicament, flash }) => {
    const [variations, setVariations] = useState(medicament.variations || []);
    const { data, setData, processing, errors } = useForm({
        type_variation: "",
        valeur_variation: "",
        prix: "",
        image_variation: null,
    });

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash.success, flash.error]);

    const [imagePreview, setImagePreview] = useState(null);

    // Gestion de l'image
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image_variation", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Ajouter une variation
    const handleAddVariation = () => {
        if (data.type_variation && data.valeur_variation && data.prix) {
            const variationExists = variations.some(
                (v) =>
                    v.type_variation === data.type_variation &&
                    v.valeur_variation === data.valeur_variation
            );

            if (!variationExists) {
                setVariations([...variations, { ...data }]);
                setData({ type_variation: "", valeur_variation: "", prix: "", image_variation: null });
                setImagePreview(null);
            } else {
                alert("Cette variation existe déjà.");
            }
        }
    };

    // Supprimer une variation locale
    const handleRemoveVariation = (index) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    // Supprimer une variation de la base de données
    const handleDeleteVariation = async (variationId) => {
        if (confirm("Voulez-vous vraiment supprimer cette variation ?")) {
            await router.delete(route("medicaments.variations.destroy", variationId), {
                preserveScroll: true,
            });
            setVariations(variations.filter((v) => v.id !== variationId));
        }
    };

    // Soumettre les variations
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("medicament_id", medicament.id);

        variations.forEach((variation, index) => {
            formData.append(`variations[${index}][type_variation]`, variation.type_variation);
            formData.append(`variations[${index}][valeur_variation]`, variation.valeur_variation);
            formData.append(`variations[${index}][prix]`, variation.prix);
            if (variation.image_variation instanceof File) {
                formData.append(`variations[${index}][image_variation]`, variation.image_variation);
            }
        });

        router.post(route("medicaments.variations.store", medicament.id), formData, {
            forceFormData: true,
        });
    };

    return (
        <>
            <DashboardNavbar/>
            <Head title="Variations liées au medicament"/>
            <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-4">Gérer les variations du médicament</h3>
                <Link href={route('medicaments.index')} className="btn btn-warning montserrat-normal">
                    Retour
                </Link>
                </div>


                {/* Formulaire d'ajout */}
                <div className="card shadow p-4 mb-4">
                    <h5 className="mb-3">Ajouter une variation</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <InputLabel htmlFor="type_variation" value="Type de variation" />
                            <TextInput
                                id="type_variation"
                                type="text"
                                value={data.type_variation}
                                onChange={(e) => setData("type_variation", e.target.value)}
                            />
                            <InputError message={errors.type_variation} />
                        </div>

                        <div className="col-md-2">
                            <InputLabel htmlFor="valeur_variation" value="Valeur" />
                            <TextInput
                                id="valeur_variation"
                                type="text"
                                value={data.valeur_variation}
                                onChange={(e) => setData("valeur_variation", e.target.value)}
                            />
                            <InputError message={errors.valeur_variation} />
                        </div>

                        <div className="col-md-2">
                            <InputLabel htmlFor="prix" value="Prix" />
                            <TextInput
                                id="prix"
                                type="number"
                                value={data.prix}
                                onChange={(e) => setData("prix", e.target.value)}
                            />
                            <InputError message={errors.prix} />
                        </div>

                        <div className="col-md-4">
                            <InputLabel htmlFor="image_variation" value="Image" />
                            <FileInput id="image_variation" onChange={handleImageChange} />
                            {imagePreview && <img src={imagePreview} alt="Aperçu" className="img-thumbnail mt-2" />}
                            <InputError message={errors.image_variation} />
                        </div>
                    </div>
                    <div className="text-end mt-3">
                        <PrimaryButton onClick={handleAddVariation} disabled={processing}>
                            Ajouter
                        </PrimaryButton>
                    </div>
                </div>

                {/* Liste des variations */}
                <div className="card shadow p-4">
                    <h5 className="mb-3">Variations existantes</h5>
                    {variations.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Valeur</th>
                                    <th>Prix</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variations.map((variation, index) => (
                                    <tr key={variation.id || `local-${index}`}>
                                        <td>{variation.type_variation}</td>
                                        <td>{variation.valeur_variation}</td>
                                        <td>{variation.prix} FCFA</td>
                                        <td>
                                            {variation.image_variation && (
                                                <img
                                                    src={variation.image_variation instanceof File
                                                        ? URL.createObjectURL(variation.image_variation)
                                                        : variation.image_variation
                                                    }
                                                    alt="Variation"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: '50px' }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger btn-sm"
                                                onClick={() => variation.id ? handleDeleteVariation(variation.id) : handleRemoveVariation(index)}>
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-muted">Aucune variation ajoutée.</p>
                    )}
                </div>

                <div className="text-end mt-4">
                    <PrimaryButton onClick={handleSubmit} disabled={processing}>
                        Enregistrer
                    </PrimaryButton>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} />
        </>
    );
};

export default MedicamentVariationForm;
