import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";

export default function PrendreRendezVousForm({ medecin }) {
    const { data, setData, post, processing, errors } = useForm({
        st_medecin_id: medecin.id,
        date: "",
        heure: "",
        message: "",
    });

    // États pour le Modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/pharmacie-sante/prendre-rendez-vous", {
            onSuccess: () => {
                setModalMessage("Votre demande de rendez-vous a été envoyée avec succès ! Veuillez revenir plutard consulté le statut dans votre espace membre.");
                setShowModal(true);
            },
            onError: () => {
                setModalMessage("Une erreur est survenue. Veuillez réessayer.");
                setShowModal(true);
            },
        });
    };

    return (
        <>
            <Head title="Prendre un Rendez-vous" />
            <PharmaNavbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg p-4">
                            {/* Affichage de l'image du spécialiste */}
                            <div className="text-center mb-3">
                                <img
                                    src={medecin.image_principale ? medecin.image_principale : "/images/default-doctor.png"}
                                    alt={medecin.nom}
                                    className="rounded-circle shadow-sm"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                />
                            </div>

                            <h6 className="text-center mb-2 fw-bold text-primary">
                                Prendre un Rendez-vous avec <span className="text-success">{medecin.nom}</span>
                            </h6>
                            <p className="text-center mb-4 text-muted">
                                <span className="text-muted fw-bold">Spécialité </span>: {medecin.specialite}
                            </p>
                            <hr />

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

                                {/* Champ Message */}
                                <div className="mb-3">
                                    <InputLabel htmlFor="message" value="Message (facultatif)" />
                                    <TextArea
                                        id="message"
                                        name="message"
                                        value={data.message}
                                        onChange={(e) => setData("message", e.target.value)}
                                        rows="4"
                                    />
                                    <InputError message={errors.message} className="mt-2" />
                                </div>

                                {/* Bouton de soumission */}
                                <div className="text-center mt-4">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        {processing ? "Envoi en cours..." : "Envoyer la demande"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <PharmacieFooter />

            {/* Modal de Confirmation */}
            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Notification</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay pour le modal */}
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
}
