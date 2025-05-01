import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import { Head, usePage } from "@inertiajs/react";

const Success = () => {
    const { commande } = usePage().props;

    if (!commande) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <>
            <Head title="Paiement Success"/>
            <NavBarResto/>
            <div className="container mt-3">
                <div className="card shadow-lg p-2">
                    <h2 className="text-center text-success montserrat-normal">Commande réussie !</h2>
                    <p className="text-center montserrat-normal">Merci pour votre commande, <span className="fw-bold">{commande.nom_client}</span>.</p>
                    <hr />

                    {/* Informations de la commande */}
                    <div className="row">
                        <div className="col-md-6 montserrat-normal">
                            <h6 className="montserrat-normal fw-bold text-danger">Informations de la commande</h6>
                            <p><strong>Référence :</strong> {commande.reference}</p>
                            <p><strong>Statut :</strong> {commande.statut}</p>
                            <p><strong>Date :</strong> {new Date(commande.created_at).toLocaleString()}</p>
                        </div>
                        <div className="col-md-6 montserrat-normal">
                            <h6 className="montserrat-normal fw-bold text-danger">Informations du client</h6>
                            <p><strong>Nom :</strong> {commande.nom_client}</p>
                            <p><strong>Email :</strong> {commande.email_client}</p>
                            <p><strong>Téléphone :</strong> {commande.telephone_client}</p>
                        </div>
                    </div>

                    <hr />

                    {/* Détails des repas commandés */}
                    <h6 className="montserrat-normal fw-bold text-danger">Détails de la commande</h6>
                    <table className="table table-bordered montserrat-normal">
                        <thead>
                            <tr>
                                <th>Repas</th>
                                <th>Variation</th>
                                <th>Quantité</th>
                                <th>Prix unitaire</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commande.details.map((detail) => (
                                <tr key={detail.id}>
                                    <td>{detail.repas?.nom}</td>
                                    <td>
                                        {detail.variation
                                            ? `${detail.variation.valeur_variation}`
                                            : 'Aucune variation'
                                        }
                                    </td>
                                    <td>{detail.quantite}</td>
                                    <td>{detail.prix_unitaire} FCFA</td>
                                    <td>{detail.prix_total} FCFA</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Montant total */}
                    <div className="text-end montserrat-normal">
                        <h6 className="montserrat-normal text-danger"><strong>Montant total :</strong> {commande.montant_total} FCFA</h6>
                    </div>

                    {/* Bouton de retour à l'accueil */}
                    <div className="text-center mt-4">
                        <a href="/commande-repas" className="btn btn-primary">Retour à l'accueil</a>
                    </div>
                </div>
            </div>
            <PiedDePageResto/>
        </>
    );
};

export default Success;
