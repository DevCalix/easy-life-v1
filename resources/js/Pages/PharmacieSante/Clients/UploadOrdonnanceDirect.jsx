import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/react";

export default function UploadOrdonnanceDirect({ directData }) {
    const { data, setData, processing, errors } = useForm({
        fichier_ordonnance: null,
        st_medicament_id: directData.st_medicament_id, // On récupère l'ID du médicament directement depuis directData
    });

    const handleFileChange = (file) => {
        setData("fichier_ordonnance", file);
    };
console.log(directData);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("st_medicament_id", data.st_medicament_id);
        formData.append("fichier_ordonnance", data.fichier_ordonnance);

        Inertia.post("/pharmacie-sante/upload-ordonnance-direct", formData, {
            onSuccess: () => {
                alert("Ordonnance uploadée avec succès !");
                Inertia.visit("/paiement-direct");
            },
            onError: () => {
                alert("Une erreur s'est produite lors de l'upload de l'ordonnance.");
            },
        });
    };

    return (
        <>
            <PharmaNavbar />
            <Head title="Uploader une Ordonnance" />
            <div className="container my-5">
                <h1 className="mb-4 montserrat-normal fw-bold">Uploader une Ordonnance</h1>
                <hr />
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        <h5 className="fw-bold">{directData.nom_medicament || "Nom du médicament non disponible"}</h5>
                        <div className="mb-3">
                            <InputLabel
                                htmlFor="fichier_ordonnance"
                                value={`Téléverser une ordonnance pour ${directData.nom_medicament}`}
                            />
                            <FileInput
                                id="fichier_ordonnance"
                                name="fichier_ordonnance"
                                onChange={(e) => handleFileChange(e.target.files[0])}
                                required
                            />
                            <InputError message={errors.fichier_ordonnance} className="mt-2" />
                        </div>
                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? "Upload en cours..." : "Uploader l'Ordonnance"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <PharmacieFooter />
        </>
    );
}
