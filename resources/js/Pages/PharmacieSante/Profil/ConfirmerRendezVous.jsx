import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import { useForm } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/react";


export default function ConfirmerRendezVous({ rdv }) {
    const { data, setData, post, processing, errors } = useForm({
        date: rdv.date,
        heure: rdv.heure,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/pharmacie-sante/rendez-vous/${rdv.id}/confirmer`, {
            onSuccess: () => {
                alert("Rendez-vous confirmé avec succès !");
                Inertia.visit("/profil");
            },
            onError: () => {
                alert("Une erreur s'est produite lors de la confirmation.");
            },
        });
    };

    return (
        <>
            <PharmaNavbar />
            <Head title="Confirmer le Rendez-vous" />

            <div className="container my-5">
                <h1 className="mb-4 montserrat-normal fw-bold">Confirmer le Rendez-vous</h1>
                <hr />

                <div className="card shadow-sm p-4">
                    <form onSubmit={handleSubmit}>
                        {/* Champ Date */}
                        <div className="mb-3">
                            <InputLabel htmlFor="date" value="Date du rendez-vous" />
                            <TextInput
                                id="date"
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={(e) => setData("date", e.target.value)}
                                required
                            />
                            <InputError message={errors.date} className="mt-2" />
                        </div>

                        {/* Champ Heure */}
                        <div className="mb-3">
                            <InputLabel htmlFor="heure" value="Heure du rendez-vous" />
                            <TextInput
                                id="heure"
                                type="time"
                                name="heure"
                                value={data.heure}
                                onChange={(e) => setData("heure", e.target.value)}
                                required
                            />
                            <InputError message={errors.heure} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="text-center mt-4">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing ? "Confirmation en cours..." : "Confirmer le Rendez-vous"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            <PharmacieFooter />
        </>
    );
}
