import React from "react";
import { Link } from "@inertiajs/react";

export default function InscriptionDocteurSection() {
    return (
        <section className="py-5 bg-light text-center">
            <div className="container">
                <h2 className="fw-bold">Vous êtes médecin ou spécialiste ?</h2>
                <p className="lead text-muted mb-4">
                    Rejoignez notre réseau et facilitez la prise de rendez-vous avec vos patients tout en gagnant en visibilité.
                </p>
                <Link href="/pharmacie-sante/specialiste-de-sante/create" className="btn btn-primary btn-lg">
                    Devenir Partenaire Santé
                </Link>
            </div>
        </section>
    );
}
