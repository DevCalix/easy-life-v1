import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IndexHotel = () => {
    const { hotels, flash } = usePage().props;
    const [search, setSearch] = useState('');
    const [filteredHotels, setFilteredHotels] = useState(hotels);

    // Gestion des notifications
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, { position: "bottom-right", autoClose: 3000 });
        }
        if (flash.error) {
            toast.error(flash.error, { position: "bottom-right", autoClose: 3000 });
        }
    }, [flash.success, flash.error]);

    // Fonction pour supprimer un hôtel
    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cet hôtel ?")) {
            Inertia.delete(route('hotels.destroy', id), { preserveScroll: true });
        }
    };

    // Fonction de filtrage
    useEffect(() => {
        setFilteredHotels(
            hotels.filter(hotel =>
                hotel.nom.toLowerCase().includes(search.toLowerCase()) ||
                hotel.adresse.toLowerCase().includes(search.toLowerCase()) ||
                hotel.ville.toLowerCase().includes(search.toLowerCase()) ||
                hotel.pays_region.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, hotels]);

    return (
        <>
            <DashboardNavbar />
            <Head title="Liste des Hôtels" />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="montserrat-normal fw-bold">Liste des Hôtels</h1>
                    <Link href={route('hotels.create')} className="btn btn-primary montserrat-normal">
                        Ajouter un Hôtel
                    </Link>
                </div>

                <hr className="border border-warning border-3 opacity-75"/>

                {/* Barre de recherche */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher un hôtel..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Adresse</th>
                                <th>Ville</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHotels.length > 0 ? (
                                filteredHotels.map((hotel, index) => (
                                    <tr key={hotel.id}>
                                        <td>{index + 1}</td>
                                        <td>{hotel.nom}</td>
                                        <td>{hotel.adresse}</td>
                                        <td>{hotel.ville}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                {/* Bouton Éditer */}
                                                <Link
                                                    href={route('hotels.edit', hotel.id)}
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    Éditer
                                                </Link>

                                                {/* Gérer les images */}
                                                <Link
                                                    href={`/reservation-hotel/hotels/${hotel.id}/images`}
                                                    className="btn btn-secondary btn-sm"
                                                >
                                                    Images
                                                </Link>
                                                <Link
                                                    href={`/reservation-hotel/hotels/${hotel.id}/informations-supplementaires/create`}
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Info Sup.
                                                </Link>

                                                {/* Bouton Supprimer */}
                                                <button
                                                    onClick={() => handleDelete(hotel.id)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Aucun hôtel trouvé.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
        </>
    );
};

export default IndexHotel;
