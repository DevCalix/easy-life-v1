import React from "react";
import { Link, useForm } from "@inertiajs/react";
import PharmaLayout from "@/Layouts/Managers/PharmaLayout";

export default function AfficherCommande({ commande }) {
    const { data, setData, post, processing } = useForm({
        statut: commande.statut,
    });

    const handleUpdateStatut = (e) => {
        e.preventDefault();
        post(route('updateStatut.pharmacie', { commande: commande.id }), {
            data,
            preserveScroll: true,
        });
    };

    // Normaliser les détails de commande en tableau et filtrer les entrées invalides
    const commandeDetails = (Array.isArray(commande.details) ? commande.details : [])
        .filter(detail => detail && detail.medicament && detail.medicament.pharmacie)
        .map(detail => ({
            ...detail,
            total: detail.prix * detail.quantite
        }));

    return (
        <PharmaLayout title={`Détails de la Commande #${commande.id}`}>
            <div className="container">
                <h1 className="mb-4 montserrat-normal fw-bold">Détails de la Commande #{commande.id}</h1>

                <div className="card shadow-sm">
                    <div className="card-body montserrat-normal">
                        <h5 className="card-title fw-bold">Informations de la Commande</h5>
                        <p><strong>Client :</strong> {commande.user?.name || 'Non spécifié'}</p>
                        <p><strong>Date :</strong> {new Date(commande.created_at).toLocaleDateString()}</p>
                        <p><strong>Statut :</strong> {commande.statut}</p>
                        <p><strong>Montant Total :</strong> {commande.montant_total?.toLocaleString('fr-FR') || '0'} FCFA</p>

                        <form onSubmit={handleUpdateStatut} className="mt-3">
                            <div className="mb-3">
                                <label htmlFor="statut" className="form-label fw-bold">Mettre à jour le statut :</label>
                                <select
                                    id="statut"
                                    className="form-select"
                                    value={data.statut}
                                    onChange={(e) => setData("statut", e.target.value)}
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
                        {commandeDetails.length > 0 ? (
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
                                    {commandeDetails.map((detail) => (
                                        <tr key={detail.id}>
                                            <td>{detail.medicament.nom}</td>
                                            <td>
                                                <Link
                                                    href={`/pharmacie-sante/pharmacie/${detail.medicament.pharmacie.id}`}
                                                    className="text-decoration-none"
                                                >
                                                    {detail.medicament.pharmacie.nom}
                                                </Link>
                                            </td>
                                            <td>{detail.quantite}</td>
                                            <td>{detail.prix.toLocaleString('fr-FR')} FCFA</td>
                                            <td>{detail.total.toLocaleString('fr-FR')} FCFA</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-warning">
                                Aucun produit valide trouvé dans cette commande
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <Link href={route('sts-admin.commandes.pharmacie')} className="btn btn-secondary">
                        Retour à la liste
                    </Link>
                </div>
            </div>
        </PharmaLayout>
    );
}