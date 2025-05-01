import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { useRestaurantPanier } from '../Context/RestaurantPanierContext'; // Assurez-vous d'importer le bon contexte
import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import PiedDePageResto from '@/Layouts/Restaurant/global/PiedDePageResto';

export default function CartPageRepas() {
    const { panier, totalPanier } = usePage().props;
    const { supprimerDuPanier, mettreAJourQuantite } = useRestaurantPanier();

    return (
        <>
            <Head title="Panier" />
            <DashboardNavbar />
            <div className="min-vh-100 bg-light py-5">
                <div className="container">
                    <h1 className="mb-4">Votre Panier</h1>

                    {panier.length === 0 ? (
                        <div className="text-center text-muted">
                            <p>Votre panier est vide.</p>
                            <Link href="/commande-repas" className="text-primary text-decoration-none">
                                Retour à la carte
                            </Link>
                        </div>
                    ) : (
                        <div className="row">
                            {/* Liste des repas dans le panier */}
                            <div className="col-md-8">
                                {panier.map((item) => {
                                    const [quantite, setQuantite] = useState(item.quantite);

                                    const handleUpdateQuantite = async () => {
                                        try {
                                            await mettreAJourQuantite(item.id, quantite);
                                        } catch (err) {
                                            console.error("Erreur lors de la mise à jour de la quantité :", err);
                                        }
                                    };

                                    return (
                                        <div key={item.id} className="card mb-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.repas.image}
                                                            alt={item.repas.nom}
                                                            className="img-thumbnail me-3"
                                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                        />
                                                        <div>
                                                            <h5 className="card-title mb-1">{item.repas.nom}</h5>
                                                            {item.variation && (
                                                                <p className="card-text text-muted mb-1">
                                                                    Variation : {item.variation.nom} (+{item.variation.prix} XOF)
                                                                </p>
                                                            )}
                                                            <p className="card-text text-muted mb-0">Quantité : {item.quantite}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-end d-flex align-items-center gap-3">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            style={{ width: '80px' }}
                                                            value={quantite}
                                                            min="1"
                                                            onChange={(e) => setQuantite(parseInt(e.target.value))}
                                                        />
                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={handleUpdateQuantite}
                                                        >
                                                            Mettre à jour
                                                        </button>
                                                        <p className="card-text fw-bold mb-0">
                                                            {(
                                                                (item.variation ? item.variation.prix : item.repas.prix) *
                                                                item.quantite
                                                            ).toLocaleString()}{' '}
                                                            XOF
                                                        </p>
                                                        <button
                                                            className="btn btn-link text-danger p-0"
                                                            onClick={() => supprimerDuPanier(item.id)}
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Résumé du panier */}
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title mb-4">Résumé du Panier</h5>
                                        <div className="d-flex justify-content-between mb-3">
                                            <span className="text-muted">Total</span>
                                            <span className="fw-bold">{totalPanier.toLocaleString()} XOF</span>
                                        </div>
                                        <Link
                                            href="/commande-repas/checkout"
                                            className="btn btn-primary w-100 mb-2"
                                        >
                                            Passer la commande
                                        </Link>
                                        <button
                                            onClick={() => viderPanier()}
                                            className="btn btn-danger w-100 mb-2"
                                        >
                                            Vider le panier
                                        </button>
                                        <Link
                                            href="/commande-repas"
                                            className="btn btn-outline-secondary w-100"
                                        >
                                            Continuer mes achats
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PiedDePageResto />
        </>
    );
}
