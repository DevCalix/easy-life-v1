import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

export default function CommandesIndex({ commandes }) {
    const { props } = usePage();
    const appUrl = props.appUrl;
    const [filter, setFilter] = useState({ reference: '', nomClient: '' });

    const filteredCommandes = commandes.filter(commande =>
        commande.reference.toLowerCase().includes(filter.reference.toLowerCase()) &&
        commande.nom_client.toLowerCase().includes(filter.nomClient.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Liste des Commandes" />
            {/* <DashboardNavbar /> */}
            <div className="container py-3">
                <h4 className="text-center mb-4 fw-bold text-primary montserrat">📦 Liste des Commandes</h4>

                {/* Filtres Modernes */}
                <div className="d-flex mb-4 gap-3">
                    <input
                        type="text"
                        className="form-control shadow-sm rounded-pill"
                        placeholder="🔍 Référence"
                        value={filter.reference}
                        onChange={(e) => setFilter({ ...filter, reference: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control shadow-sm rounded-pill"
                        placeholder="👤 Nom du Client"
                        value={filter.nomClient}
                        onChange={(e) => setFilter({ ...filter, nomClient: e.target.value })}
                    />
                </div>

                {filteredCommandes.length ? filteredCommandes.map((commande) => (
                    <div key={commande.id} className="card mb-4 shadow border-0 rounded-4">
                        <div className="card-header bg-primary text-white d-flex justify-content-between">
                            <h5 className="mb-0">#{commande.reference}</h5>
                            <span className="badge bg-secondary">{commande.statut}</span>
                        </div>
                        <div className="card-body">
                            <p className="mb-1 text-secondary">💳 {commande.montant_total.toLocaleString()} XAF</p>
                            <p className="fw-bold">👤 {commande.nom_client} ({commande.email_client})</p>
                            <ul className="list-group">
                                {commande.produits.map((produit) => (
                                    <li key={produit.id} className="list-group-item border-0">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={produit.image_principale ? `${appUrl}${produit.image_principale}` : "/storage/supermache/default_product.webp"}
                                                alt={produit.nom}
                                                className="rounded-3 me-3"
                                                style={{ width: '60px', height: '60px' }}
                                            />
                                            <div>
                                                <p className="fw-semibold mb-0">{produit.nom}</p>
                                                <small className="text-muted">Quantité: {produit.pivot.quantite} | Prix: {produit.pivot.prix_unitaire.toLocaleString()} XAF</small>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )) : <p className="text-center text-muted">Aucune commande trouvée.</p>}
            </div>
        </AdminLayout>
    );
}
