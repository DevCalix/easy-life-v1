import React from "react";
import { Head, Link } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

const MedicamentsParCategorie = ({ categorie }) => {
    return (
        <>
            <Head title={`Médicaments - ${categorie.nom}`} />
            <PharmaNavbar />
            <div className="container my-2 montserrat-normal">
                <h1 className="fw-bold mb-2 montserrat-normal">{categorie.nom}</h1>
                <hr />

                {/* Grille des médicaments */}
                <div className="row g-1">
                    {categorie.medicaments.map((medicament, index) => (
                        <div className="col-4 col-md-3" key={index}>
                            <Link href={route('medicaments.details', medicament.slug)}>
                                <div
                                    className="card position-relative"
                                    style={{
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                        height: "180px",
                                    }}
                                >
                                    {/* Badge pour les médicaments nécessitant une ordonnance */}
                                    {medicament.ordonnance_requise == true && (
                                        <span
                                            className="badge bg-danger position-absolute"
                                            style={{ top: "5px", left: "5px", fontSize: "10px" }}
                                        >
                                            O
                                        </span>
                                    )}

                                    {/* Image du médicament */}
                                    <img
                                        src={medicament.image_principale || "/images/default-medicament.jpg"}
                                        alt={medicament.nom}
                                        className="card-img-top"
                                        style={{
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    {/* Contenu de la carte */}
                                    <div className="card-body p-2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <h5
                                            className="card-title fw-bold text-truncate mb-2"
                                            style={{ fontSize: "0.7rem" }}
                                        >
                                            {medicament.nom}
                                        </h5>

                                        {/* Section prix + bouton "+" */}
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{
                                                width: "100%",
                                                marginTop: "auto",
                                            }}
                                        >
                                            {/* Prix */}
                                            <span
                                                className="text-primary fw-bold"
                                                style={{
                                                    fontSize: "0.7rem",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {medicament.prix} XOF
                                            </span>

                                            {/* Bouton "+" */}
                                            <button
                                                className="btn btn-outline-success btn-sm d-flex justify-content-center align-items-center"
                                                style={{
                                                    height: "24px",
                                                    width: "24px",
                                                    padding: "0",
                                                    borderRadius: "50%",
                                                    marginRight: "1px",
                                                }}
                                            >
                                                <i className="bi bi-plus" style={{ fontSize: "1rem" }}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <PharmacieFooter />
        </>
    );
};

export default MedicamentsParCategorie;
