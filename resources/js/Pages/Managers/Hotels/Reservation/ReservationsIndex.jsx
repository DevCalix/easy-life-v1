import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HotelsLayout from "@/Layouts/Managers/HotelLayout";

const ReservationsIndex = ({ reservations, flash }) => {
  const [reservationList, setReservationList] = useState(reservations);
  const [filters, setFilters] = useState({
    statut: "",
    hotel: "",
    client: "",
  });

  // Gestion des notifications
      useEffect(() => {
          if (flash.success) {
              toast.success(flash.success, { position: "bottom-right", autoClose: 3000 });
          }
          if (flash.error) {
              toast.error(flash.error, { position: "bottom-right", autoClose: 3000 });
          }
      }, [flash.success, flash.error]);

  // Fonction pour valider une réservation
  const handleValidateReservation = (reservationId) => {
    if (confirm("Êtes-vous sûr de vouloir valider cette réservation ?")) {
      Inertia.post(
        `/hotel/managers/reservations/${reservationId}/validate`,
        {},
        {
          preserveScroll: true,
          onSuccess: () => {
            toast.success("Réservation validée avec succès !");

            // Mise à jour locale des données
            setReservationList((prevReservations) =>
              prevReservations.map((reservation) =>
                reservation.id === reservationId
                  ? { ...reservation, statut: "validée" }
                  : reservation
              )
            );
          },
          onError: () => {
            toast.error("Une erreur s'est produite lors de la validation.");
          },
        }
      );
    }
  };

  // Fonction de filtrage
  const filteredReservations = reservationList.filter((reservation) => {
    return (
      (filters.statut === "" || reservation.statut === filters.statut) &&
      (filters.hotel === "" ||
        reservation.hotel.nom.toLowerCase().includes(filters.hotel.toLowerCase())) &&
      (filters.client === "" ||
        reservation.nom.toLowerCase().includes(filters.client.toLowerCase()))
    );
  });

  return (
    <HotelsLayout title={"Liste des réservations"}>

      <div className="container-fluid">
        <h1 className="text-center mb-2 montserrat-normal fw-bold">
          Liste des Réservations
        </h1>
        <hr className="border border-success border-3 opacity-75" />

        {/* Zone de filtres */}
        <div className="d-flex flex-wrap gap-3 mb-4">
          {/* Filtre Statut */}
          <select
            className="form-select w-auto"
            value={filters.statut}
            onChange={(e) => setFilters({ ...filters, statut: e.target.value })}
          >
            <option value="">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="validée">Validée</option>
          </select>

          {/* Filtre Hôtel */}
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Rechercher par hôtel"
            value={filters.hotel}
            onChange={(e) => setFilters({ ...filters, hotel: e.target.value })}
          />

          {/* Filtre Client */}
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Rechercher par client"
            value={filters.client}
            onChange={(e) => setFilters({ ...filters, client: e.target.value })}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hôtel</th>
                <th>Chambre</th>
                <th>Client</th>
                <th>Date d'arrivée</th>
                <th>Date de départ</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.hotel.nom}</td>
                  <td>Chambre {reservation.chambre.numero_chambre}</td>
                  <td>{reservation.nom}</td>
                  <td>{reservation.date_arrivee}</td>
                  <td>{reservation.date_depart}</td>
                  <td>
                    <span
                      className={`badge ${
                        reservation.statut === "validée"
                          ? "bg-success"
                          : "bg-warning"
                      }`}
                    >
                      {reservation.statut}
                    </span>
                  </td>
                  <td>
                    {reservation.statut === "en_attente" && (
                      <button
                        onClick={() => handleValidateReservation(reservation.id)}
                        className="btn btn-success btn-sm"
                      >
                        Valider
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </HotelsLayout>
  );
};

export default ReservationsIndex;
