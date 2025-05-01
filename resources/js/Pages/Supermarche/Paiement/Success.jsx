import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketNavbar from '@/Layouts/Supermarche/global/MarketNavbar';
import MarketFooter from '@/Layouts/Supermarche/global/MarketFooter';

export default function Success({ message, commande }) {
    return (
        <>
            <Head title="Merci pour votre achat" />
            <MarketNavbar />

            <div className="container py-5 text-center">
                <h1 className="mb-4 fw-bold montserrat-normal">Merci pour votre achat !</h1>
                <p className="lead mb-4">{message}</p>

                <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
                    <h5 className="fw-bold montserrat-normal mb-3">Détails de votre commande :</h5>
                    <div className="text-start">
                        <p><strong>Référence de la commande :</strong> {commande.reference}</p>
                        <p><strong>Nom du client :</strong> {commande.nom_client}</p>
                        <p><strong>Email :</strong> {commande.email_client}</p>
                        <p><strong>Téléphone :</strong> {commande.telephone_client}</p>
                        <p><strong>Montant total :</strong> {commande.montant_total.toLocaleString()} XAF</p>
                        <p><strong>Statut :</strong> {commande.statut}</p>
                    </div>

                    <hr className="my-4" />

                    <Link
                        href={route('supermarche.accueil')}
                        className="btn btn-success w-100 py-2"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </div>

            <MarketFooter />
        </>
    );
}
