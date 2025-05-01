import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";

export default function AbonnementVip() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactionRef, setTransactionRef] = useState(null);
    const [showUssdConfirmation, setShowUssdConfirmation] = useState(false);
    const [ussdCode, setUssdCode] = useState("");

    // Fonction pour gérer la soumission du formulaire
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
            // Données à envoyer à l'API de paiement
            const data = {
                transaction_amount: 1000, // Montant fixe de 1000 FCFA
                transaction_currency: "XAF",
                transaction_reason: "Abonnement VIP 30 jours",
                app_transaction_ref: `VIP_${Date.now()}`, // Générer une référence unique
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
            // Simuler une transaction réussie
            const transaction_ref = `TEST_${Date.now()}`;

            toast.success("Paiement simulé avec succès !", {
                position: "bottom-right",
                autoClose: 3000,
            });

            // Appel direct à la fonction d'enregistrement
            await enregistrerAbonnementVIP(transaction_ref);
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            setError("Une erreur est survenue lors de la soumission.");
            toast.error("Une erreur est survenue lors de la soumission.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        } finally {
            setLoading(false);
        }
    };



    // Fonction pour vérifier le statut de la transaction
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
                await enregistrerAbonnementVIP(transaction_ref);
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

    // Fonction pour enregistrer l'abonnement VIP
    const enregistrerAbonnementVIP = async (transaction_ref) => {
        try {
            const abonnementData = {
                transaction_ref: transaction_ref,
                montant: 1000,
                nom_client: customerName,
                email_client: customerEmail,
                telephone_client: phoneNumber,
            };

            await router.post("/pharmacie-sante/abonnement-vip/enregistrer", abonnementData, {
                preserveState: false,
                onSuccess: (page) => {
                    console.log("Réponse Laravel :", page);
                    toast.success("Abonnement VIP activé avec succès !", {
                        position: "bottom-right",
                        autoClose: 5000,
                        onClose: () => {
                            router.visit(route("accueil.pharmacie"));
                        },
                    });
                },
                onError: (errors) => {
                    console.error("Erreurs retournées par Laravel :", errors);
                    toast.error("Erreur lors de l'activation de l'abonnement VIP. Vérifiez les logs.", {
                        position: "bottom-right",
                        autoClose: 5000,
                    });
                },
            });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'abonnement VIP :", error);
            toast.error("Erreur lors de l'enregistrement de l'abonnement VIP. Veuillez réessayer.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
    };


    return (
        <>
            <Head title="Abonnement VIP" />
            <ToastContainer />
            <PharmaNavbar />

            <div className="container py-5">
                <h1 className="text-center mb-2 fw-bold montserrat-normal">Abonnement VIP</h1>
                <p className="text-center mb-4 text-muted">
                    Profitez d'avantages exclusifs en devenant abonné VIP pour seulement 1000 FCFA.
                </p>

                <div className="card shadow-sm p-4">
                    {/* Détails de l'abonnement */}
                    <div className="mb-3 montserrat-normal">
                        <h6 className="fw-bold">Avantages :</h6>
                        <ul>
                            <li>Accès à des médecins spécialistes</li>
                            <li>Rendez-vous médicaux prioritaires</li>
                            <li>Remises exclusives sur les médicaments</li>
                        </ul>
                        <h6 className="fw-bold">Durée :</h6>
                        <p>30 jours</p>
                        <h6 className="fw-bold">Prix :</h6>
                        <h6 className="text-danger fw-bold">1000 XOF</h6>
                    </div>

                    {/* Formulaire de paiement */}
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label fw-bold">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerName"
                            placeholder="Entrer votre nom complet"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label fw-bold">
                            Numéro de téléphone
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Entrer le numéro de téléphone"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="customerEmail" className="form-label fw-bold">
                            Adresse e-mail
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="customerEmail"
                            placeholder="Entrer votre adresse e-mail"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                    </div>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    {showUssdConfirmation && (
                        <div className="alert alert-info mt-3">
                            Veuillez confirmer la transaction en composant <strong>{ussdCode}</strong> sur votre téléphone.
                        </div>
                    )}

                    <button
                        className="btn btn-primary w-100 py-2 mt-3"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            "Payer maintenant"
                        )}
                    </button>
                </div>
            </div>

            <PharmacieFooter />
        </>
    );
}
