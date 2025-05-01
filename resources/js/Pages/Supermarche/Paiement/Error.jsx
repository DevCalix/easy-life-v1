import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketNavbar from '@/Layouts/Supermarche/global/MarketNavbar';
import MarketFooter from '@/Layouts/Supermarche/global/MarketFooter';

export default function Error({ message, error }) {
    return (
        <>
            <Head title="Erreur lors de la commande" />
            <MarketNavbar />

            <div className="container py-5 text-center">
                <h1 className="mb-4 fw-bold montserrat-normal">Oups ! Une erreur est survenue.</h1>
                <p className="lead mb-4">{message}</p>
                {error && <p className="text-danger mb-4">{error}</p>}

                <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
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
