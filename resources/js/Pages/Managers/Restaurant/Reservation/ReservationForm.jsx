import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Textarea from '@/Components/Textarea';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PiedDePageResto from '@/Layouts/Restaurant/global/PiedDePageResto';
import NavBarResto from '@/Layouts/Restaurant/global/NavBarResto';

const ReservationForm = ({ restaurants }) => {
    const { flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [reservationKey, setReservationKey] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        restaurant_id: '',
        nom_client: '',
        numero_telephone: '',
        date_reservation: '',
        heure_reservation: '',
        nombre_personnes: 1,
        commentaire: '',
    });

    useEffect(() => {
        console.log('Flash data:', flash);
        if (flash.success && flash.cle_reservation) {
            setReservationKey(flash.cle_reservation);
            setShowModal(true);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reservations-table.store'), {
            onSuccess: () => {
                toast.success('Réservation enregistrée avec succès !', {
                    position: 'bottom-right',
                    autoClose: 3000,
                });
                setData({
                    restaurant_id: '',
                    nom_client: '',
                    numero_telephone: '',
                    date_reservation: '',
                    heure_reservation: '',
                    nombre_personnes: 1,
                    commentaire: '',
                });
            },
            onError: (errors) => {
                console.error('Erreur lors de la soumission du formulaire :', errors);
                toast.error('Erreur lors de l\'enregistrement de la réservation. Veuillez réessayer.', {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
            },
        });
    };

    return (
        <>
            <Head title="Réserver une table" />
            <ToastContainer />
            <NavBarResto />
            <div className="container py-5">
                <h1 className="text-center my-3 fw-bold montserrat-normal">Réserver une table</h1>

                <div className="card shadow-sm p-4">
                <form onSubmit={handleSubmit}>
                        {/* Champ pour choisir le restaurant */}
                        <div className="mb-3">
                            <InputLabel htmlFor="restaurant_id" value="Choisir le restaurant" />
                            <SelectInput
                                id="restaurant_id"
                                name="restaurant_id"
                                options={[
                                    { value: "", label: "Choisir son restaurant", disabled: true }, // Option par défaut
                                    ...restaurants.map((restaurant) => ({
                                        value: restaurant.id,
                                        label: restaurant.nom,
                                    })),
                                ]}
                                value={data.restaurant_id}
                                onChange={(e) => setData("restaurant_id", e.target.value)}
                                required
                            />
                            <InputError message={errors.restaurant_id} className="mt-2" />
                        </div>


                        {/* Champ pour le nom du client */}
                        <div className="mb-3">
                            <InputLabel htmlFor="nom_client" value="Nom complet" />
                            <TextInput
                                id="nom_client"
                                type="text"
                                name="nom_client"
                                value={data.nom_client}
                                onChange={(e) => setData('nom_client', e.target.value)}
                                required
                            />
                            <InputError message={errors.nom_client} className="mt-2" />
                        </div>

                        {/* Champ pour le numéro de téléphone */}
                        <div className="mb-3">
                            <InputLabel htmlFor="numero_telephone" value="Numéro de téléphone" />
                            <TextInput
                                id="numero_telephone"
                                type="tel"
                                name="numero_telephone"
                                value={data.numero_telephone}
                                onChange={(e) => setData('numero_telephone', e.target.value)}
                                required
                            />
                            <InputError message={errors.numero_telephone} className="mt-2" />
                        </div>

                        {/* Champ pour la date de réservation */}
                        <div className="mb-3">
                            <InputLabel htmlFor="date_reservation" value="Date de réservation" />
                            <TextInput
                                id="date_reservation"
                                type="date"
                                name="date_reservation"
                                value={data.date_reservation}
                                onChange={(e) => setData('date_reservation', e.target.value)}
                                required
                            />
                            <InputError message={errors.date_reservation} className="mt-2" />
                        </div>

                        {/* Champ pour l'heure de réservation */}
                        <div className="mb-3">
                            <InputLabel htmlFor="heure_reservation" value="Heure de réservation" />
                            <TextInput
                                id="heure_reservation"
                                type="time"
                                name="heure_reservation"
                                value={data.heure_reservation}
                                onChange={(e) => setData('heure_reservation', e.target.value)}
                                required
                            />
                            <InputError message={errors.heure_reservation} className="mt-2" />
                        </div>

                        {/* Champ pour le nombre de personnes */}
                        <div className="mb-3">
                            <InputLabel htmlFor="nombre_personnes" value="Nombre de personnes" />
                            <TextInput
                                id="nombre_personnes"
                                type="number"
                                name="nombre_personnes"
                                value={data.nombre_personnes}
                                onChange={(e) => setData('nombre_personnes', e.target.value)}
                                min="1"
                                required
                            />
                            <InputError message={errors.nombre_personnes} className="mt-2" />
                        </div>

                        {/* Champ pour le commentaire */}
                        <div className="mb-3">
                            <InputLabel htmlFor="commentaire" value="Commentaire (optionnel)" />
                            <Textarea
                                id="commentaire"
                                name="commentaire"
                                value={data.commentaire}
                                onChange={(e) => setData('commentaire', e.target.value)}
                                rows="3"
                            />
                            <InputError message={errors.commentaire} className="mt-2" />
                        </div>

                        {/* Bouton de soumission */}
                        <div className="mb-3">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={processing}
                        >
                            {processing ? 'Enregistrement en cours...' : 'Réserver'}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
            <PiedDePageResto />

            {/* Modal Bootstrap */}
            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Réservation réussie</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Votre réservation a été enregistrée avec succès !</p>
                                <p>Votre clé de réservation est : <strong>{reservationKey}</strong></p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReservationForm;
