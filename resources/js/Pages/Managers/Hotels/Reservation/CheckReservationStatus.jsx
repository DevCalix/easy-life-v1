import React, { useState } from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import HotelReservationNavbar from "@/Layouts/HotelReservationAccueil/HotelReservationNavbar";
import HotelFooter from "@/Layouts/HotelReservationAccueil/HotelFooter";

const CheckReservationStatus = () => {
  const { flash } = usePage().props; // Récupérer les messages flash
  const { data, setData, post, processing, errors } = useForm({
    reservation_key: "", // Clé de réservation saisie par l'utilisateur
  });

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/reservation-hotel/reservations/check-status", {
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
      <Head title="Vérifier le statut de la réservation" />
      <HotelReservationNavbar/>
      <div className="container py-5">
        <h1 className="text-center mb-2 montserrat-normal fw-bold">Vérifier le statut de votre réservation</h1>

        {/* Formulaire de vérification */}
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <InputLabel htmlFor="reservation_key" value="Clé de réservation" />
            <TextInput
              id="reservation_key"
              type="text"
              value={data.reservation_key}
              onChange={(e) => setData("reservation_key", e.target.value)}
              required
              placeholder="Entrez votre clé de réservation"
            />
            {errors.reservation_key && (
              <div className="text-danger mt-2">{errors.reservation_key}</div>
            )}
          </div>

          <div className="text-center">
            <PrimaryButton type="submit" disabled={processing}>
              {processing ? "En cours..." : "Vérifier le statut"}
            </PrimaryButton>
          </div>
        </form>

        {/* Afficher les messages flash */}
        {flash.success && (
          <div className="alert alert-success mt-4" role="alert">
            {flash.success}
          </div>
        )}
        {flash.error && (
          <div className="alert alert-danger mt-4" role="alert">
            {flash.error}
          </div>
        )}
      </div>
      <HotelFooter/>
    </>
  );
};

export default CheckReservationStatus;
