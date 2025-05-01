import React from 'react';
import { Head, Link } from '@inertiajs/react';
import SupermarketLayout from '@/Layouts/Managers/SupermarketLayout';

export default function Dashboard({ auth, produitsCount, commandes }) {
    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'livree': return 'bg-success text-white';
            case 'annulee': return 'bg-danger text-white';
            case 'en_cours': return 'bg-warning text-dark';
            case 'payee': return 'bg-primary text-white';
            default: return 'bg-secondary text-white';
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            'en_attente': 'En attente',
            'en_cours': 'En cours',
            'livree': 'Livrée',
            'annulee': 'Annulée',
        };
        return labels[status] || status;
    };

    return (
        <SupermarketLayout title={"Tableau de bord"}>
            <Head title="Tableau de bord" />

            <div className="container py-4">
                <h1 className="h4 mb-4">Tableau de bord</h1>

                {/* Section Produits */}
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h2 className="h6 mb-0">Produits</h2>
                        <span className="badge bg-primary">
                            {produitsCount} produit{produitsCount !== 1 ? 's' : ''}
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="text-center py-3">
                            <p className={produitsCount > 0 ? "text-success" : "text-muted"}>
                                {produitsCount > 0
                                    ? `${produitsCount} produit${produitsCount !== 1 ? 's' : ''} enregistré${produitsCount !== 1 ? 's' : ''}`
                                    : "Aucun produit enregistré"}
                            </p>
                            <Link href={route('mds-produits.index')} className="btn btn-sm btn-primary">
                                Gérer les produits
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Section Commandes */}
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h2 className="h6 mb-0">Commandes récentes</h2>
                        <Link href={route('mds-commandes.index')} className="btn btn-sm btn-outline-primary">
                            Voir toutes
                        </Link>
                    </div>
                    <div className="card-body p-0">
                        {commandes.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {commandes.map(commande => (
                                    <li key={commande.id} className="list-group-item">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-1">#{commande.reference}</h6>
                                                <small className="text-muted">
                                                    {commande.client} • {commande.date}
                                                </small>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className={`badge ${getStatusBadgeClass(commande.statut)}`}>
                                                    {getStatusLabel(commande.statut)}
                                                </span>
                                                <span className="text-nowrap">
                                                    {commande.montant.toLocaleString()} XAF
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-end">
                                            <small className="text-muted">
                                                {commande.produits_count} produit{commande.produits_count !== 1 ? 's' : ''}
                                            </small>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-4 text-muted">
                                Aucune commande récente
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SupermarketLayout>
    );
}
