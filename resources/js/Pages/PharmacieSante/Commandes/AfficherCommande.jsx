import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

export default function AfficherCommande({ commande }) {
    const { data, setData, post, processing } = useForm({
        statut: commande.statut,
    });

    const handleUpdateStatut = (e) => {
        e.preventDefault();
        post(route('updateStatut.pharmacie', { commande: commande.id }), {
            data, // Envoie bien les données
            preserveScroll: true, // Garde la position de la page
        });
    };

    return (
        <>
            <Head title={`Détails de la Commande #${commande.id}`} />
            <DashboardNavbar />
            <div className="container my-5">
                <h1 className="mb-4 montserrat-normal fw-bold">Détails de la Commande #{commande.id}</h1>

                <div className="card shadow-sm">
                    <div className="card-body montserrat-normal">
                        <h5 className="card-title fw-bold">Informations de la Commande</h5>
                        <p><strong>Client :</strong> {commande.user.name}</p>
                        <p><strong>Date :</strong> {new Date(commande.created_at).toLocaleDateString()}</p>
                        <p><strong>Statut :</strong> {commande.statut}</p>
                        <p><strong>Montant Total :</strong> {commande.montant_total.toLocaleString()} FCFA</p>

                        {/* Formulaire pour mettre à jour le statut */}
                        <form onSubmit={handleUpdateStatut} className="mt-3">
                            <div className="mb-3">
                                <label htmlFor="statut" className="form-label fw-bold">Mettre à jour le statut :</label>
                                <select
                                    id="statut"
                                    className="form-select"
                                    value={data.statut} // 🔹 Correction ici
                                    onChange={(e) => setData("statut", e.target.value)} // 🔹 Correctement lié à `useForm`
                                    disabled={processing}
                                >
                                    <option value="en cours">En cours</option>
                                    <option value="livrée">Livrée</option>
                                    <option value="annulée">Annulée</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing ? "En cours..." : "Mettre à jour"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="card mt-4 shadow-sm">
                    <div className="card-body montserrat-normal">
                        <h5 className="card-title fw-bold">Produits Commandés</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Médicament</th>
                                    <th>Pharmacie</th>
                                    <th>Quantité</th>
                                    <th>Prix Unitaire</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commande.details.map((detail) => (
                                    <tr key={detail.id}>
                                        <td>{detail.medicament.nom}</td>
                                        <td>
                                            {detail.medicament.pharmacie ? (
                                                <Link
                                                    href={`/pharmacie-sante/pharmacie/${detail.medicament.pharmacie.id}`}
                                                    className="text-decoration-none"
                                                >
                                                    {detail.medicament.pharmacie.nom}
                                                </Link>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td>{detail.quantite}</td>
                                        <td>{detail.prix.toLocaleString()} FCFA</td>
                                        <td>{(detail.prix * detail.quantite).toLocaleString()} FCFA</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-4">
                    <Link href={route('admin.commandes.pharmacie')} className="btn btn-secondary">
                        Retour à la liste
                    </Link>
                </div>
            </div>
            <PharmacieFooter />
        </>
    );
}
