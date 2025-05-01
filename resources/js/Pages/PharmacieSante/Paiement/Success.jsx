import { usePage } from "@inertiajs/react";

const Success = () => {
    const { commande } = usePage().props;

    if (!commande) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-success">Commande réussie !</h2>
                <p className="text-center">Merci pour votre achat, {commande.nom_client}.</p>
                <hr />
                <h4>Détails de la commande</h4>
                <p><strong>Référence de transaction :</strong> {commande.transaction_ref}</p>
                <p><strong>Statut :</strong> {commande.statut}</p>
                <p><strong>Email :</strong> {commande.email_client}</p>
                <p><strong>Téléphone :</strong> {commande.telephone_client}</p>
                <p><strong>Montant total :</strong> {commande.montant_total} FCFA</p>
                <hr />
                <h4>Produits commandés</h4>
                <ul className="list-group">
                    {commande.details.map((detail) => (
                        <li key={detail.id} className="list-group-item d-flex justify-content-between">
                            <span>{detail.medicament?.nom} (x{detail.quantite})</span>
                            <span>{detail.prix * detail.quantite} FCFA</span>
                        </li>
                    ))}
                </ul>
                <div className="text-center mt-4">
                    <a href="/pharmacie-sante" className="btn btn-primary">Retour à l'accueil</a>
                </div>
            </div>
        </div>
    );
};

export default Success;
