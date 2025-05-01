import FileInput from "@/Components/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function UploadOrdonnance({ medicamentsManquants }) {
    const { data, setData, processing, errors } = useForm({
        ordonnances: medicamentsManquants.map((medicament) => ({
            st_medicament_id: medicament.st_medicament_id,
            fichier_ordonnance: null,
        })),
    });

    const handleFileChange = (index, file) => {
        const newOrdonnances = [...data.ordonnances];
        newOrdonnances[index].fichier_ordonnance = file;
        setData("ordonnances", newOrdonnances);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        data.ordonnances.forEach((ordonnance, index) => {
            formData.append(`ordonnances[${index}][st_medicament_id]`, ordonnance.st_medicament_id);
            formData.append(`ordonnances[${index}][fichier_ordonnance]`, ordonnance.fichier_ordonnance);
        });

        Inertia.post("/pharmacie-sante/upload-ordonnance", formData, {
            onSuccess: () => {
                alert("Ordonnances uploadées avec succès !");
                Inertia.visit("/paiement");
            },
            onError: () => {
                alert("Une erreur s'est produite lors de l'upload des ordonnances.");
            },
        });
    };

    return (
        <>
            <PharmaNavbar />
            <Head title="Uploader des Ordonnances" />
            <div className="container my-5">
                <h1 className="mb-4 montserrat-normal fw-bold">Uploader des Ordonnances</h1>
                <hr />
                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        {medicamentsManquants.length === 0 ? (
                            <p>Aucun médicament nécessitant une ordonnance n'est trouvé.</p>
                        ) : (
                            medicamentsManquants.map((medicament, index) => (
                                <div key={medicament.st_medicament_id} className="mb-4">
                                    <h5 className="fw-bold">{medicament.medicament?.nom || "Nom non disponible"}</h5>
                                    <div className="mb-3">
                                        <InputLabel
                                            htmlFor={`ordonnance-${medicament.st_medicament_id}`}
                                            value={`Téléverser une ordonnance pour ${medicament.medicament?.nom}`}
                                        />
                                        <FileInput
                                            id={`ordonnance-${medicament.st_medicament_id}`}
                                            name={`ordonnance-${medicament.st_medicament_id}`}
                                            onChange={(e) => handleFileChange(index, e.target.files[0])}
                                            required
                                        />
                                        <InputError message={errors[`ordonnances.${index}.fichier_ordonnance`]} className="mt-2" />
                                    </div>
                                </div>
                            ))
                        )}
                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? "Upload en cours..." : "Uploader les Ordonnances"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <PharmacieFooter />
        </>
    );
}
