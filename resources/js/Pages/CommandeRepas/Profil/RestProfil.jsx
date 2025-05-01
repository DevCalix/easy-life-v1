import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";

export default function RestProfil() {
    const { user, reservations } = usePage().props;
    const [activeTab, setActiveTab] = useState("profil");
    console.log(reservations);

    return (
        <>
            <MarketNavbar />
            <Head title="Mon Profil" />

            <div className="container my-5">
                <h1 className="mb-2 montserrat-normal fw-bold">Mon Profil</h1>
                <hr />

                {/* Onglets de navigation */}
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "profil" ? "active" : ""}`}
                            onClick={() => setActiveTab("profil")}
                        >
                            Profil
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === "reservations" ? "active" : ""}`}
                            onClick={() => setActiveTab("reservations")}
                        >
                            Mes Réservations
                        </button>
                    </li>
                </ul>

                {/* Contenu des onglets */}
                <div className="tab-content">
                    {/* Onglet Profil */}
                    {activeTab === "profil" && (
                        <div className="tab-pane fade show active">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body montserrat-normal">
                                    <h5 className="card-title">Informations personnelles</h5>
                                    <p><strong>Nom :</strong> {user.name}</p>
                                    <p><strong>Email :</strong> {user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Onglet Réservations */}
                    {activeTab === "reservations" && (
                        <div className="tab-pane fade show active">
                            <h5 className="mb-3">Mes Réservations</h5>
                            {reservations.data.length > 0 ? (
                                <>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Restaurant</th>
                                                    <th>Date</th>
                                                    <th>Heure</th>
                                                    <th>Nombre de personnes</th>
                                                    <th>Statut</th>
                                                    <th>Clé de réservation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservations.data.map((reservation) => (
                                                    <tr key={reservation.id}>
                                                        <td>{reservation.restaurant.nom}</td>
                                                        <td>{new Date(reservation.date_reservation).toLocaleDateString()}</td>
                                                        <td>{reservation.heure_reservation}</td>
                                                        <td>{reservation.nombre_personnes}</td>
                                                        <td>
                                                            <span className={`badge bg-${reservation.statut === 'confirmée' ? 'success' : 'warning'}`}>
                                                                {reservation.statut}
                                                            </span>
                                                        </td>
                                                        <td>{reservation.cle_reservation}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    
                                </>
                            ) : (
                                <p>Aucune réservation trouvée.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <MarketFooter />
        </>
    );
}
