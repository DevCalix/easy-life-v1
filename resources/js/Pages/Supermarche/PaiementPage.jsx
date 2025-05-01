import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarketNavbar from "@/Layouts/Supermarche/global/MarketNavbar";
import MarketFooter from "@/Layouts/Supermarche/global/MarketFooter";
import { usePanier } from "./Context/PanierContext";
import axios from "axios";

export default function PaiementPage({ panier, sousTotal, fraisLivraison, totalPanier }) {
    const { viderPanier } = usePanier();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactionRef, setTransactionRef] = useState(null);
    const [showUssdConfirmation, setShowUssdConfirmation] = useState(false);
    const [ussdCode, setUssdCode] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        // Validation des champs
        if (!phoneNumber || !customerName || !customerEmail) {
            setError("Veuillez remplir tous les champs obligatoires.");
            toast.error("Veuillez remplir tous les champs obligatoires.", {
                position: "bottom-right",
                autoClose: 5000,
            });
            setLoading(false);
            return;
        }

        try {
            // Extraire les produits du panier
            const produits = panier.map((item) => ({
                id: item.produit.id,
                nom: item.produit.nom,
                quantite: item.quantite,
                prix: item.variation ? item.variation.prix_additionnel : item.produit.prix,
            }));

            // Créer une description des produits achetés
            const produitsDescription = produits.map(
                (item) => `${item.quantite}x ${item.nom}`
            ).join(", ");

            // Données à envoyer à l'API de paiement
            const data = {
                transaction_amount: parseFloat(totalPanier),
                transaction_currency: "XAF",
                transaction_reason: `Achat de produits : ${produitsDescription}`,
                app_transaction_ref: `TRX_${Date.now()}`, // Générer une référence unique
                customer_phone_number: phoneNumber,
                customer_name: customerName,
                customer_email: customerEmail,
            };

            // Appeler l'API de paiement
            const response = await axios.post(
                "https://my-coolpay.com/api/23b12b2c-0274-4556-b1e8-39e21b9830b0/payin",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const { status, transaction_ref, action, ussd } = response.data;

            if (status === "success") {
                setTransactionRef(transaction_ref);

                if (action === "PENDING") {
                    setShowUssdConfirmation(true);
                    setUssdCode(ussd);

                    toast.info(
                        `Transaction en attente. Veuillez confirmer en composant ${ussd} sur votre téléphone.`,
                        {
                            position: "bottom-right",
                            autoClose: 10000,
                        }
                    );

                    // Vérifier le statut de la transaction après 15 secondes
                    setTimeout(() => checkTransactionStatus(transaction_ref), 15000);
                } else {
                    throw new Error("Statut de transaction inconnu.");
                }
            } else {
                throw new Error("Erreur lors de l'initialisation de la transaction.");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            setError(error.message || "Une erreur est survenue lors de la soumission. Veuillez réessayer.");
            toast.error(error.message || "Une erreur est survenue lors de la soumission. Veuillez réessayer.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleSubmitTest = async () => {
        setLoading(true);
        setError(null);

        // Validation des champs
        if (!phoneNumber || !customerName || !customerEmail) {
            setError("Veuillez remplir tous les champs obligatoires.");
            toast.error("Veuillez remplir tous les champs obligatoires.", {
                position: "bottom-right",
                autoClose: 5000,
            });
            setLoading(false);
            return;
        }

        try {
            // Simuler une référence de transaction factice
            const transaction_ref = `TRX_${Date.now()}`;

            // Simuler un paiement réussi et enregistrer la commande directement
            await enregistrerCommande(transaction_ref);

        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            setError(error.message || "Une erreur est survenue lors de la soumission. Veuillez réessayer.");
            toast.error(error.message || "Une erreur est survenue lors de la soumission. Veuillez réessayer.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour vérifier le statut de la transaction
    const checkTransactionStatus = async (transaction_ref) => {
        try {
            const response = await axios.get(
                `https://my-coolpay.com/api/23b12b2c-0274-4556-b1e8-39e21b9830b0/checkStatus/${transaction_ref}`
            );

            const { transaction_status } = response.data;

            if (transaction_status === "SUCCESS") {
                toast.success("Paiement confirmé avec succès !", {
                    position: "bottom-right",
                    autoClose: 5000,
                });

                // Enregistrer la commande après un paiement réussi
                await enregistrerCommande(transaction_ref);
            } else {
                // Réessayer après 10 secondes si la transaction n'est pas encore confirmée
                setTimeout(() => checkTransactionStatus(transaction_ref), 10000);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du statut :", error);
            toast.error("La transaction n'a pas été confirmée. Veuillez réessayer.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
    };

    const enregistrerCommande = async (transaction_ref) => {
        try {
            const produits = panier.map((item) => {
                const prixBase = item.variation ? item.variation.prix_additionnel : item.produit.prix;
                const prixFinal = item.produit.pourcentage_reduction
                    ? prixBase * (1 - item.produit.pourcentage_reduction / 100)
                    : prixBase;

                return {
                    id: item.produit.id,
                    quantite: item.quantite,
                    prix: parseFloat(prixFinal.toFixed(2)),
                };
            });

            const commandeData = {
                transaction_ref: transaction_ref,
                montant_total: totalPanier,
                nom_client: customerName,
                email_client: customerEmail,
                telephone_client: phoneNumber,
                produits: produits,
            };

            await router.post("/supermarche/paiement/enregistrer-commande", commandeData, {
                onSuccess: (response) => {
                    if (response.props.success) {
                        toast.success(`Merci ${customerName} pour votre achat ! Votre commande #${response.props.commande.reference} a été enregistrée.`, {
                            position: "bottom-right",
                            autoClose: 5000,
                            onClose: () => {
                                viderPanier();
                                router.visit(route("supermarche.accueil"));
                            },
                        });
                    } else {
                        toast.error("Erreur lors de l'enregistrement de la commande. Veuillez réessayer.", {
                            position: "bottom-right",
                            autoClose: 5000,
                        });
                    }
                },
                onError: () => {
                    toast.error("Erreur lors de l'enregistrement de la commande. Veuillez réessayer.", {
                        position: "bottom-right",
                        autoClose: 5000,
                    });
                },
            });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la commande :", error);
            toast.error("Erreur lors de l'enregistrement de la commande. Veuillez réessayer.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <>
            <Head title="Paiement" />
            <ToastContainer />
            <MarketNavbar />

            <div className="container py-5">
                <h1 className="text-center mb-3 fw-bold montserrat-normal">Paiement du panier</h1>
                <div className="card shadow-sm p-4">
                    <div className="mb-3">
                        <h5 className="fw-bold montserrat-normal">Détails du panier :</h5>
                        <div className="d-flex justify-content-between montserrat-normal">
                            <span>Sous-total :</span>
                            <span>{sousTotal.toLocaleString()} XAF</span>
                        </div>
                        <div className="d-flex justify-content-between montserrat-normal">
                            <span>Frais de livraison :</span>
                            <span>{fraisLivraison.toLocaleString()} XAF</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between fw-bold montserrat-normal">
                            <span>Total :</span>
                            <span>{totalPanier.toLocaleString()} XAF</span>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label fw-bold">Nom complet</label>
                        <input type="text" className="form-control" id="customerName" placeholder="Entrer votre nom complet" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label fw-bold">Numéro de téléphone</label>
                        <input type="tel" className="form-control" id="phoneNumber" placeholder="Entrer le numéro de téléphone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerEmail" className="form-label fw-bold">Adresse e-mail</label>
                        <input type="email" className="form-control" id="customerEmail" placeholder="Entrer votre adresse e-mail" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {showUssdConfirmation && (
                        <div className="alert alert-info mt-3">
                            Veuillez confirmer la transaction en composant <strong>{ussdCode}</strong> sur votre téléphone.
                        </div>
                    )}

                    <button className="btn btn-success w-100 py-2 mt-3" onClick={handleSubmit} disabled={loading}>
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Payer maintenant"}
                    </button>
                </div>
            </div>
            <MarketFooter />
        </>
    );
}
