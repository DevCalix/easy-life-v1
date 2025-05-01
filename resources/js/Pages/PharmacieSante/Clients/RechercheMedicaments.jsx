import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

export default function RechercheMedicaments() {
    const { medicaments, query } = usePage().props;

    return (
        <>
            <PharmaNavbar />
            <Head title="Résultats de recherche" />

            <div className="container my-5">
                <h1 className="text-center text-success fw-bold montserrat-normal">
                    Résultats de recherche pour "<span className="text-dark">{query}</span>"

                </h1>
                <hr/>


                {medicaments.data.length > 0 ? (
                    <div className="row g-4">
                        {medicaments.data.map((medicament) => (
                            <div key={medicament.id} className="col-6 col-md-4">
                                <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                                    {medicament.image_principale && (
                                        <img
                                            src={medicament.image_principale}
                                            alt={medicament.nom}
                                            className="card-img-top"
                                            style={{ height: "180px", objectFit: "cover" }}
                                        />
                                    )}

                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-primary fw-bold montserrat-normal">{medicament.nom}</h5>
                                        <p className="mb-1">
                                            <strong>Prix :</strong> <span className="text-success fw-bold montserrat-normal">{medicament.prix.toLocaleString()} FCFA</span>
                                        </p>
                                        <p className="mb-2 montserrat-normal">
                                            <strong>Pharmacie :</strong> {medicament.pharmacie?.nom || "Non spécifiée"}
                                        </p>

                                        <div className="mt-auto">
                                            <Link
                                                href={route("medicaments.details", medicament.slug)}
                                                className="btn btn-outline-primary w-100 rounded-pill montserrat-normal"
                                            >
                                                Acheter
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-warning text-center mt-4">
                        <strong>Aucun médicament trouvé</strong> pour votre recherche.
                    </div>
                )}

                {/* Pagination stylisée */}
                {medicaments.total > medicaments.per_page && (
                    <div className="d-flex justify-content-center mt-5">
                        <nav>
                            <ul className="pagination pagination-lg">
                                {medicaments.prev_page_url && (
                                    <li className="page-item">
                                        <button
                                            className="page-link rounded-pill"
                                            onClick={() => Inertia.visit(medicaments.prev_page_url)}
                                        >
                                            ← Précédent
                                        </button>
                                    </li>
                                )}
                                {medicaments.next_page_url && (
                                    <li className="page-item">
                                        <button
                                            className="page-link rounded-pill"
                                            onClick={() => Inertia.visit(medicaments.next_page_url)}
                                        >
                                            Suivant →
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            <PharmacieFooter />
        </>
    );
}
