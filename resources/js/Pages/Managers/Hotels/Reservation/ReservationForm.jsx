import React, { useEffect, useState } from "react";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import FileInput from "@/Components/FileInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ReservationForm = ({ hotel, chambre }) => {
  const { data, setData, post, processing, errors } = useForm({
    ht_hotel_id: hotel.id,
    ht_chambre_id: chambre.id,
    date_arrivee: "",
    date_depart: "",
    nombre_personnes: 1,
    prix: chambre.prix_par_nuit,
    numero_piece: "",
    piece_identite: null,
    nom: "",
    email: "",
    telephone: "",
    raison_sejour: "",
  });

  const { flash, auth } = usePage().props; // Récupérer les messages flash

  const [prixTotal, setPrixTotal] = useState(chambre.prix_par_nuit); // État pour stocker le prix total

  // Fonction pour calculer le nombre de nuits et mettre à jour le prix total
  const calculerPrixTotal = () => {
    const { date_arrivee, date_depart } = data;
    if (date_arrivee && date_depart) {
      const arrivee = new Date(date_arrivee);
      const depart = new Date(date_depart);
      const differenceEnJours = Math.max(
        0,
        Math.ceil((depart - arrivee) / (1000 * 60 * 60 * 24))
      ); // Calcul de la différence en jours
      setPrixTotal(differenceEnJours * chambre.prix_par_nuit);
    }
  };

  useEffect(() => {
    calculerPrixTotal();
  }, [data.date_arrivee, data.date_depart]);

  // Afficher les messages de succès ou d'erreur
  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success, {
        position: "top-center",
        autoClose: 3000,
      });
    }
    if (flash.error) {
      toast.error(flash.error, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [flash.success, flash.error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/reservation-hotel/reservations", {
      onSuccess: () => {
        // Rediriger ou afficher un message de succès
      },
      onError: (errors) => {
        console.error('Erreurs de validation :', errors);
      },
    });
  };

  return (
    <>
      <HotelReservationNavbar />
      <div className="reservation-form-page">
        <Head title={`Réserver la chambre ${chambre.numero_chambre}`} />

        {/* En-tête de la page */}
        <div className="reservation-header text-center py-5">
            {/* Afficher la clé de réservation et le lien */}
            {flash.reservation_key && (
  <div className="alert alert-success mt-4">
    <p>Votre réservation a été créée avec succès !</p>
    <p>
      Votre Clé de réservation à garder: <strong>{flash.reservation_key}</strong>
    </p>
    <p>
      Vous pouvez vérifier le statut de votre réservation en cliquant sur ce lien :{" "}
      <Link href={`/reservation-hotel/reservations/${flash.reservation_key}/status`}>
        Vérifier le statut
      </Link>
    </p>

    {/* Bouton pour laisser un avis, visible uniquement si l'utilisateur est connecté */}
    {auth.user && (
      <div className="mt-3">
        <Link href={`/reservation-hotel/hotel/${hotel.id}/avis/create`} className="btn btn-primary">
          Laisser un avis sur l'hôtel
        </Link>
      </div>
    )}
  </div>
)}

          <h1 className="fw-bold montserrat-normal">Réserver la chambre {chambre.numero_chambre}</h1>
          <p className="montserrat-normal">
            À l'hôtel <span className="text-primary">{hotel.nom}</span>, {hotel.ville}
          </p>
          <hr/>
        </div>

        {/* Formulaire de réservation */}
        <div className="container">

          <form onSubmit={handleSubmit} className="reservation-form" encType="multipart/form-data">
            {/* Champ : Hôtel (lecture seule) */}
            <div className="mb-3">
              <InputLabel htmlFor="ht_hotel_id" value="Hôtel" />
              <TextInput
                id="ht_hotel_id"
                type="text"
                value={hotel.nom}
                readOnly
              />
              <InputError message={errors.ht_hotel_id} className="mt-2" />
            </div>

            {/* Champ : Chambre (lecture seule) */}
            <div className="mb-3">
              <InputLabel htmlFor="ht_chambre_id" value="Chambre" />
              <TextInput
                id="ht_chambre_id"
                type="text"
                value={`Chambre ${chambre.numero_chambre} - ${chambre.type}`}
                readOnly
              />
              <InputError message={errors.ht_chambre_id} className="mt-2" />
            </div>

            {/* Champ : Prix (lecture seule) */}
            <div className="mb-3">
              <InputLabel htmlFor="prix" value="Prix par nuit" />
              <TextInput
                id="prix"
                type="text"
                value={`${chambre.prix_par_nuit} FCFA`}
                readOnly
              />
            </div>
            {/* Affichage du prix total (lecture seule) */}
            <div className="mb-3">
              <InputLabel htmlFor="prix_total" value="Prix total" />
              <TextInput
                id="prix_total"
                type="text"
                value={`${prixTotal} FCFA`}
                readOnly
              />
            </div>

            {/* Dates d'arrivée et de départ côte à côte */}
            <div className="row mb-3">
              <div className="col-md-6">
                <InputLabel htmlFor="date_arrivee" value="Date d'arrivée" />
                <TextInput
                  id="date_arrivee"
                  type="date"
                  value={data.date_arrivee}
                  onChange={(e) => setData("date_arrivee", e.target.value)}
                  required
                />
                <InputError message={errors.date_arrivee} className="mt-2" />
              </div>
              <div className="col-md-6">
                <InputLabel htmlFor="date_depart" value="Date de départ" />
                <TextInput
                  id="date_depart"
                  type="date"
                  value={data.date_depart}
                  onChange={(e) => setData("date_depart", e.target.value)}
                  required
                />
                <InputError message={errors.date_depart} className="mt-2" />
              </div>
            </div>

            {/* Champ : Nombre de personnes */}
            <div className="mb-3">
              <InputLabel htmlFor="nombre_personnes" value="Nombre de personnes" />
              <TextInput
                id="nombre_personnes"
                type="number"
                value={data.nombre_personnes}
                onChange={(e) => setData("nombre_personnes", e.target.value)}
                min="1"
                required
              />
              <InputError message={errors.nombre_personnes} className="mt-2" />
            </div>

            {/* Champ : Numéro de pièce d'identité */}
            <div className="mb-3">
              <InputLabel htmlFor="numero_piece" value="Numéro de pièce d'identité" />
              <TextInput
                id="numero_piece"
                type="text"
                value={data.numero_piece}
                onChange={(e) => setData("numero_piece", e.target.value)}
                required
              />
              <InputError message={errors.numero_piece} className="mt-2" />
            </div>

            {/* Champ : Upload de la pièce d'identité */}
            <div className="mb-3">
              <InputLabel htmlFor="piece_identite" value="Pièce d'identité (PDF, JPG, PNG)" />
              <FileInput
                id="piece_identite"
                onChange={(e) => setData("piece_identite", e.target.files[0])}
                accept=".pdf,.jpg,.png"
              />
              <InputError message={errors.piece_identite} className="mt-2" />
            </div>

            {/* Nom, Email, Téléphone côte à côte */}
            <div className="row mb-3">
              <div className="col-md-4">
                <InputLabel htmlFor="nom" value="Nom" />
                <TextInput
                  id="nom"
                  type="text"
                  value={data.nom}
                  onChange={(e) => setData("nom", e.target.value)}
                  required
                />
                <InputError message={errors.nom} className="mt-2" />
              </div>
              <div className="col-md-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  required
                />
                <InputError message={errors.email} className="mt-2" />
              </div>
              <div className="col-md-4">
                <InputLabel htmlFor="telephone" value="Téléphone" />
                <TextInput
                  id="telephone"
                  type="tel"
                  value={data.telephone}
                  onChange={(e) => setData("telephone", e.target.value)}
                  required
                />
                <InputError message={errors.telephone} className="mt-2" />
              </div>
            </div>

            {/* Champ : Raison du séjour */}
            <div className="mb-3">
              <InputLabel htmlFor="raison_sejour" value="Raison du séjour" />
              <TextInput
                id="raison_sejour"
                type="text"
                value={data.raison_sejour}
                onChange={(e) => setData("raison_sejour", e.target.value)}
                required
              />
              <InputError message={errors.raison_sejour} className="mt-2" />
            </div>

            {/* Bouton de soumission */}
            <div className="text-center">
              <PrimaryButton type="submit" disabled={processing}>
                {processing ? "En cours..." : "Réserver"}
              </PrimaryButton>
            </div>
          </form>


        </div>
      </div>
      <HotelFooter />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ReservationForm;
