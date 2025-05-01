import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";
import { useForm } from "@inertiajs/inertia-react";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

const MedecinCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        specialite: '',
        adresse: '',
        telephone: '',
        email: '',
        carte: '',
        image_principale: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

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

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/pharmacie-sante/specialiste-de-sante', {
            onSuccess: () => {
                router.visit('/pharmacie-sante/specialiste-de-sante/create');
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
            },
        });
    };

    return (
        <>
            <PharmaNavbar />
            <Head title="Rejoignez notre réseau de spécialistes de santé" />
            <div className="container py-5">
                <div className="row">
                    {/* Colonne de gauche : Image et message d'introduction */}
                    <div className="col-md-6 d-md-block">
                        <div className="text-center">
                            <img
                                src="/images/Pharmacie/Medecin3.webp" // Remplacez par une image inspirante
                                alt="Rejoignez notre réseau"
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: '500px' }}
                            />
                            <h2 className="mt-4 montserrat-normal fw-bold text-primary">
                                Rejoignez notre réseau de spécialistes de santé
                            </h2>
                            <hr/>
                            <p className="mt-3 montserrat-normal text-muted">
                                En vous inscrivant, vous rejoignez une communauté de professionnels de santé dévoués à offrir des soins de qualité.
                                Nous vous offrons une plateforme pour vous connecter avec des patients et développer votre pratique.
                            </p>
                        </div>
                    </div>

                    {/* Colonne de droite : Formulaire d'inscription */}
                    <div className="col-md-6">
                        <div className="card shadow p-4">
                            <h2 className="mb-4 montserrat-normal fw-bold text-center text-success">
                                Inscription
                            </h2>
                            <form onSubmit={handleSubmit}>
                                {/* Nom du médecin */}
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

                                {/* Image Principale */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="image_principale" value="Photo de profil" />
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

                                {/* Bouton de soumission */}
                                <div className="text-center mt-4">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        S'inscrire
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <PharmacieFooter/>
        </>
    );
};

export default MedecinCreate;
