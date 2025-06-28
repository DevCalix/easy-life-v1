import React, { useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "bootstrap"; // ✅ L’important ici !
import "../../../../css/PharmacieSante/AllSpecialiste.css";

export default function AllSpecialiste({ medecins }) {
  const { flash } = usePage().props;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [flash]);

  return (
    <>
      <PharmaNavbar />
      <Head title="Liste des Médecins" />

      <section className="py-5 bg-light">
        <div className="container-fluid">
          <h2 className="text-center mb-2 fw-bold text-primary montserrat-normal">Liste des Médecins</h2>
          <p className="text-center mb-1 text-muted">Consultez la liste complète de nos médecins.</p>
          <hr className="border-2 border-success opacity-75" />

          <div className="row g-1 g-md-2 g-lg-2 g-xl-2">
            {medecins.map((medecin) => (
              <div key={medecin.id} className="col-6 col-md-4 col-lg-2-4">
                <div className="card shadow-lg border-0 rounded-4 h-100 d-flex flex-column">
                  <div className="p-3 text-center">
                    <img
                      src={medecin.image_principale || "/default-avatar.png"}
                      alt={`Photo de profil de ${medecin.nom}`}
                      className="img-fluid rounded-circle mb-3 mx-auto"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "4px solid #fff",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <h6 className="fw-bold text-dark mb-1">{medecin.nom}</h6>
                    <p className="text-muted small mb-2">{medecin.specialite}</p>
                    <p className="text-muted small mb-2">
                      <i className="bi bi-briefcase me-2"></i>
                      {medecin.nombre_d_annee_experience} ans d'expérience
                    </p>
                    <p className="text-muted small mb-3 montserrat-regulier">
                      <i className="bi bi-geo-alt me-2"></i>
                      <span className="d-inline-block text-truncate" style={{ maxWidth: "100%" }}>
                        {medecin.adresse}
                      </span>
                    </p>
                  </div>
                  <div className="mt-auto p-2 d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm rounded-pill px-1"
                      style={{ fontSize: "0.8rem" }}
                      data-bs-toggle="modal"
                      data-bs-target={`#medecinModal-${medecin.id}`}
                    >
                      A propos
                    </button>
                    <Link
                      href={`/pharmacie-sante/prendre-rendez-vous/${medecin.id}`}
                      className="btn btn-primary btn-sm rounded-pill px-2"
                    >
                      RDV
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals pour les détails des médecins */}
      {medecins.map((medecin) => (
        <div key={`modal-${medecin.id}`} className="modal fade" id={`medecinModal-${medecin.id}`} tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détails du Dr. {medecin.nom}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 text-center">
                    <img
                      src={medecin.image_principale || "/default-avatar.png"}
                      alt={`Photo de profil de ${medecin.nom}`}
                      className="img-fluid rounded-circle mb-3"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        border: "4px solid #f8f9fa",
                        boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <h4 className="fw-bold">{medecin.nom}</h4>
                    <h5 className="text-primary">{medecin.specialite}</h5>
                    <p className="text-muted">
                      <i className="bi bi-briefcase me-2"></i>
                      {medecin.nombre_d_annee_experience} ans d'expérience
                    </p>
                  </div>
                  <div className="col-md-8">
                    <div className="mb-4">
                      <h5 className="border-bottom pb-2">Informations</h5>
                      <p>
                        <i className="bi bi-geo-alt me-2 text-muted"></i>
                        <strong>Adresse :</strong> {medecin.adresse}
                      </p>
                      <p>
                        <i className="bi bi-telephone me-2 text-muted"></i>
                        <strong>Téléphone :</strong> {medecin.telephone || "Non renseigné"}
                      </p>
                      <p>
                        <i className="bi bi-envelope me-2 text-muted"></i>
                        <strong>Email :</strong> {medecin.email || "Non renseigné"}
                      </p>
                    </div>
                    <div>
                      <h5 className="border-bottom pb-2">À propos</h5>
                      <p>{medecin.a_propos || "Aucune description disponible."}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    // ✅ Fermer le modal proprement
                    const modalEl = document.getElementById(`medecinModal-${medecin.id}`);
                    const modalInstance = Modal.getInstance(modalEl);
                    if (modalInstance) {
                      modalInstance.hide();
                    }

                    // ✅ Rediriger via Inertia
                    router.visit(`/pharmacie-sante/prendre-rendez-vous/${medecin.id}`);
                  }}
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <PharmacieFooter />
    </>
  );
}
