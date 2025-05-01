import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

const ToutLesMedicamentsUrgents = ({ medicamentsUrgents = [] }) => {
    const { flash } = usePage().props;

    // États pour la recherche et le filtre
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPrescription, setFilterPrescription] = useState("all");
    const [filteredMedicaments, setFilteredMedicaments] = useState(medicamentsUrgents);

    // Filtrer les médicaments en fonction de la recherche et du filtre
    useEffect(() => {
        const results = medicamentsUrgents.filter((medicament) => {
            const matchesSearch = medicament.nom
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesFilter =
                filterPrescription === "all" ||
                (filterPrescription === "requires" && medicament.ordonnance_requise) ||
                (filterPrescription === "no-requires" && !medicament.ordonnance_requise);

            return matchesSearch && matchesFilter;
        });

        setFilteredMedicaments(results);
    }, [searchTerm, filterPrescription, medicamentsUrgents]);

    return (
        <>
            <Head title="Tous les médicaments urgents" />
            <PharmaNavbar />
            <div className="container my-2 montserrat-normal">
                {/* Barre de recherche et filtres */}
                <div className="d-flex flex-row gap-1 mb-2 align-items-center">
                    {/* Barre de recherche */}
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="filter un médicament..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filtre pour les médicaments nécessitant une ordonnance */}
                    <select
                        className="form-select form-select-sm"
                        value={filterPrescription}
                        onChange={(e) => setFilterPrescription(e.target.value)}
                    >
                        <option value="all">Tous</option>
                        <option value="requires">Ordonnance requise</option>
                        <option value="no-requires">Sans ordonnance</option>
                    </select>
                </div>

                {/* Grille des médicaments */}
                <div className="row g-1">
                    {filteredMedicaments.map((medicament, index) => (
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
                                        src={medicament.image_principale ? medicament.image_principale : "/images/placeholder.png"}
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
                                                {medicament.prix} FCFA
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
            <PharmacieFooter/>
        </>
    );
};

export default ToutLesMedicamentsUrgents;
