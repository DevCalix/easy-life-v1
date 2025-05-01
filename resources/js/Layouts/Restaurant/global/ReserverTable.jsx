import React, { useState } from "react";
import "../../../../css/Restaurant/reserverTable.css"
import { Link } from "@inertiajs/react";

export default function ReserverTable() {
  const [formData, setFormData] = useState({
    people: 2,
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler une soumission de formulaire
    alert(`Table réservée pour ${formData.people} personnes à ${formData.time} le ${formData.date}`);
  };

  return (
    <>
    <hr/>
    <section className="reserve-table py-1">
    <div className="container">
      <div className="text-center">
        <h2 className="montserrat-normal mb-2 fw-bold">Réservez une table facilement</h2>
        <p className="text-muted mb-2 montserrat-regulier  ">
          Trouvez une table dans vos restaurants préférés en quelques clics !
        </p>
        <Link href="/commande-repas/reservations/create" className="btn btn-sm montserrat-normal " style={{ backgroundColor: "#F9690E", color: "#fff" }}>
            Réserver une table
        </Link>
      </div>
    </div>
  </section>
  <hr/>

    </>
  );
}
