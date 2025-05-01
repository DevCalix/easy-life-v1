import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import DashboardNavbar from "@/Layouts/Supermarche/admin/DashboardNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

export default function CommandesIndex() {
    const { commandes } = usePage().props;

    return (
        <>
            <Head title="Liste des Commandes" />
            <DashboardNavbar />
            <div className="container my-5">
                <h1 className="mb-4 montserrat-normal fw-bold">Liste des Commandes</h1>
                <hr className="border border-warning border-3 opacity-75"/>
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Statut</th>
                                <th>Montant Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commandes.data.map((commande) => (
                                <tr key={commande.id}>
                                    <td>{commande.id}</td>
                                    <td>{commande.user.name}</td>
                                    <td>{new Date(commande.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`badge bg-${commande.statut === 'livrée' ? 'success' : commande.statut === 'annulée' ? 'danger' : 'warning'}`}>
                                            {commande.statut}
                                        </span>
                                    </td>
                                    <td>{commande.montant_total.toLocaleString()} FCFA</td>
                                    <td>
                                        <Link
                                            href={route('afficherCommande.pharmacie', { commande: commande.id })}
                                            className="btn btn-info btn-sm"
                                        >
                                            Détails
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            {commandes.links.map((link, index) => (
                                <li key={index} className={`page-item ${link.active ? 'active' : ''} ${link.url ? '' : 'disabled'}`}>
                                    <Link
                                        href={link.url || '#'}
                                        className="page-link"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <PharmacieFooter/>
        </>
    );
}
