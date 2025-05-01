import React from "react";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import { Head, Link } from "@inertiajs/react";

const InfoPharmacie = ({ pharmacie, medicaments }) => {

    // Trouver la méta dont la clé est "whatsapp"
    const whatsappMeta = pharmacie.metas.find(meta => meta.cle === "whatsapp");
    // Construire le lien WhatsApp si une valeur est trouvée
    const predefinedMessage = encodeURIComponent(`Bonjour, je suis intéressé par vos produits. Pouvez-vous m'en dire plus ?`);
    const whatsappLink = whatsappMeta ? `https://wa.me/${whatsappMeta.valeur}?text=${predefinedMessage}` : "#";
    
  return (
    <>
      <Head title={`${pharmacie.nom} - Détails`} />
      <PharmaNavbar />

      <div className="container my-5">
        {/* Section 1: Détails de la pharmacie */}
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Image de la pharmacie */}
                <div className="col-md-4">
                  <img
                    src={pharmacie.image_principale}
                    alt={pharmacie.nom}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover", minHeight: "300px" }}
                  />
                </div>

                {/* Informations sur la pharmacie */}
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h2 className="fw-bold mb-3 montserrat-normal">{pharmacie.nom}</h2>

                    <p className="mb-2">
                      <i className="bi bi-geo-alt-fill text-primary me-2 montserrat-normal"></i>
                      <strong>Adresse :</strong> {pharmacie.adresse}
                    </p>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-telephone-fill me-2 text-primary fs-5"></i>
                        <a href={`tel:${pharmacie.telephone}`} className="text-decoration-none fw-bold text-dark">
                            {pharmacie.telephone}
                        </a>


                        {whatsappMeta ? (
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-success m-3">
                                <i className="bi bi-whatsapp"></i>
                            </a>
                        ) : (
                        ''
                        )}

                    </div>

                    <p className="mb-2 montserrat-normal">
                      <i className="bi bi-clock-fill text-warning me-2"></i>
                      <strong>Horaires :</strong> {pharmacie.heures_ouverture}
                    </p>

                    <p className="mb-2">
                      <span className="badge bg-primary p-2 montserrat-normal">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        {pharmacie.note} / 5
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Médicaments disponibles */}
        <div className="row">
          <div className="col-md-12">
            <h3 className="fw-bold text-center mb-4 montserrat-normal">Médicaments disponibles</h3>

            <div className="row row-cols-2 row-cols-lg-4 g-4">
                {medicaments.map((medicament, index) => (
                    <div className="col" key={index}>
                    <div className="card h-100 shadow-sm border-1 rounded-4 overflow-hidden position-relative">

                        {/* Badge "O" pour les médicaments nécessitant une ordonnance */}
                        {medicament.ordonnance_requise == true && (
                        <span className="badge bg-danger position-absolute" style={{ top: "10px", left: "10px", fontSize: "14px" }}>
                            O
                        </span>
                        )}

                        {/* Image du médicament */}
                        <img
                        src={medicament.image_principale}
                        alt={medicament.nom}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        />

                        {/* Corps de la carte */}
                        <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold text-truncate montserrat-normal">{medicament.nom}</h5>

                        {/* Prix du médicament */}
                        <p className="text-success fw-bold my-2">
                            <i className="bi bi-cash-coin me-2 montserrat-normal"></i>{medicament.prix} FCFA
                        </p>

                        {/* Bouton d'achat */}
                        <Link
                            href={`/pharmacie-sante/medicaments/details/${medicament.slug}`}
                            className="btn btn-outline-primary btn-sm w-100 mt-auto montserrat-normal"
                        >
                            <i className="bi bi-cart-plus"></i> Acheter
                        </Link>
                        </div>
                    </div>
                    </div>
                ))}
            </div>


          </div>
        </div>
      </div>

      <PharmacieFooter />
    </>
  );
};

export default InfoPharmacie;
