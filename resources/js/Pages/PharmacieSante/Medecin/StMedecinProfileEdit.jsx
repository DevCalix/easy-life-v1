import React, { useEffect, useState } from 'react';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import PharmaNavbar from '@/Layouts/PharmacieSante/PharmaNavbar';
import PharmacieFooter from '@/Layouts/PharmacieSante/PharmacieFooter';
import { Modal } from 'bootstrap';

const StMedecinProfileEdit = ({ medecin }) => {
    const { data, setData, put, processing, errors } = useForm({
        nom: medecin.nom,
        specialite: medecin.specialite,
        type: medecin.type,
        adresse: medecin.adresse,
        telephone: medecin.telephone,
        email: medecin.email,
        carte: medecin.carte,
        nombre_d_annee_experience: medecin.nombre_d_annee_experience,
        a_propos: medecin.a_propos,
    });

    const [imagePreview, setImagePreview] = useState(medecin.image_principale ? medecin.image_principale : null);
    const { flash } = usePage().props;
    // Soumission du formulaire de mise à jour des informations
    const handleUpdateInfo = (e) => {
        e.preventDefault();
        put(route('specialiste-de-sante.update', medecin.id), {
            onSuccess: () => {
                router.visit(route('specialiste-de-sante.update', medecin.id));
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour du profil :', errors);
            },
        });
    };

    // Soumission du formulaire de mise à jour de l'image
    const handleUpdateImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image_principale', data.image_principale);
        router.post(route('medecin.profil.updateImage'), formData, {
            onSuccess: () => {
                router.visit(route('specialiste-de-sante.update', medecin.id));
            },
            onError: (errors) => {
                console.error('Erreur lors de la mise à jour de l\'image :', errors);
            },
        });
    };

    // Gestion de l'image principale
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image_principale', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (flash?.success) {
          const modalEl = document.getElementById("successModal");
          if (modalEl) {
            const modal = new Modal(modalEl);
            modal.show();
          }
        }
      }, [flash]);

    return (
        <>
            <PharmaNavbar />
            <Head title="Profil du médecin" />
            <div className="container py-5">
                <div className="row">
                    {/* Colonne de gauche : Image de profil */}
                    <div className="col-md-4">
                        <div className="card shadow p-4 text-center">
                            <h3 className="mb-4 montserrat-normal fw-bold text-primary">Photo de profil</h3>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Photo de profil"
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                            )}
                            <form onSubmit={handleUpdateImage}>
                                <FileInput
                                    id="image_principale"
                                    name="image_principale"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                                <InputError message={errors.image_principale} className="mt-2" />
                                <div className="text-center mt-3">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Mettre à jour la photo
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Colonne de droite : Formulaire de mise à jour des informations */}
                    <div className="col-md-8">
                        <div className="card shadow p-4">
                            <h3 className="mb-4 montserrat-normal fw-bold text-success">Informations du profil</h3>
                            <form onSubmit={handleUpdateInfo}>
                                {/* Nom */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="nom" value="Nom complet" />
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

                                {/* Spécialité */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="specialite" value="Spécialité" />
                                    <TextInput
                                        id="specialite"
                                        type="text"
                                        name="specialite"
                                        value={data.specialite}
                                        onChange={(e) => setData('specialite', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.specialite} className="mt-2" />
                                </div>
                                {/* Type */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="type" value="Type de médecin" />
                                    <select
                                        id="type"
                                        name="type"
                                        className="form-select"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        required
                                    >

                                        <option value="">Sélectionnez le type</option>
                                        <option value="Généraliste">Généraliste</option>
                                        <option value="Spécialiste">Spécialiste</option>
                                    </select>
                                    <InputError message={errors.type} className="mt-2" />
                                </div>


                                {/* Adresse */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="adresse" value="Adresse professionnelle" />
                                    <TextInput
                                        id="adresse"
                                        type="text"
                                        name="adresse"
                                        value={data.adresse}
                                        onChange={(e) => setData('adresse', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.adresse} className="mt-2" />
                                </div>

                                {/* Téléphone */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="telephone" value="Téléphone" />
                                    <TextInput
                                        id="telephone"
                                        type="text"
                                        name="telephone"
                                        value={data.telephone}
                                        onChange={(e) => setData('telephone', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.telephone} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="email" value="Email professionnel" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mb-3">
                                    <InputLabel htmlFor="nombre_d_annee_experience" value="Nombre d'années d'expérience" />
                                    <TextInput
                                        id="nombre_d_annee_experience"
                                        type="number"
                                        name="nombre_d_annee_experience"
                                        value={data.nombre_d_annee_experience}
                                        onChange={(e) => setData('nombre_d_annee_experience', e.target.value)}
                                        required
                                        min="0"
                                    />
                                    <InputError message={errors.nombre_d_annee_experience} className="mt-2" />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="a_propos" value="À propos (description professionnelle)" />
                                    <textarea
                                        id="a_propos"
                                        name="a_propos"
                                        className="form-control"
                                        value={data.a_propos}
                                        onChange={(e) => setData('a_propos', e.target.value)}
                                        rows="4"
                                        required
                                    />
                                    <InputError message={errors.a_propos} className="mt-2" />
                                </div>

                                {/* Lien de la carte */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="carte" value="Lien de la carte (facultatif)" />
                                    <TextInput
                                        id="carte"
                                        type="text"
                                        name="carte"
                                        value={data.carte}
                                        onChange={(e) => setData('carte', e.target.value)}
                                    />
                                    <InputError message={errors.carte} className="mt-2" />
                                </div>

                                {/* Bouton de soumission */}
                                <div className="text-center mt-4">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Mettre à jour les informations
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <PharmacieFooter />

            {/* Modal succès */}
            <div
                className="modal fade"
                id="successModal"
                tabIndex="-1"
                aria-labelledby="successModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-success shadow-sm">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title d-flex align-items-center" id="successModalLabel">
                                <i className="bi bi-person-check-fill me-2" style={{ fontSize: '1.5rem' }}></i>
                                Profil mis à jour avec succès !
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Fermer"
                            ></button>
                        </div>
                        <div className="modal-body fs-5 text-center text-success">
                            Votre profil a été mis à jour avec succès.<br />
                            Merci de garder vos informations à jour pour profiter pleinement de nos services.
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className="btn btn-success px-4"
                                data-bs-dismiss="modal"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default StMedecinProfileEdit;
