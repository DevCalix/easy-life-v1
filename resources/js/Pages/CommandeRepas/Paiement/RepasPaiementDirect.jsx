import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PiedDePageResto from "@/Layouts/Restaurant/global/PiedDePageResto";
import NavBarResto from "@/Layouts/Restaurant/global/NavBarResto";
import axios from "axios"; // Importer Axios pour les requêtes HTTP

export default function PaiementDirect({ repas, quantity, selectedVariation, totalPrice }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerLang, setCustomerLang] = useState("fr"); // Par défaut en français
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactionRef, setTransactionRef] = useState(null);
    const [showUssdConfirmation, setShowUssdConfirmation] = useState(false);
    const [ussdCode, setUssdCode] = useState("");

    // Fonction pour vérifier le statut de la transaction
    const checkTransactionStatus = async (ref) => {
        try {
            const statusResponse = await axios.get(
                `https://my-coolpay.com/api/23b12b2c-0274-4556-b1e8-39e21b9830b0/checkStatus/${ref}`
            );

            console.log("Réponse de vérification du statut :", statusResponse.data);

            const { transaction_status, transaction_message } = statusResponse.data;

            if (transaction_status === "SUCCESS") {
                toast.success("Transaction effectuée avec succès !", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
                setShowUssdConfirmation(false); // Masquer le message de confirmation USSD

                // Enregistrer la commande uniquement en cas de succès
                await enregistrerCommande(ref);
            } else if (transaction_status === "FAILED") {
                throw new Error(transaction_message || "La transaction a échoué. Veuillez réessayer.");
            } else if (transaction_status === "CANCELLED") {
                throw new Error(transaction_message || "La transaction a été annulée.");
            } else if (transaction_status === "PENDING") {
                // Si la transaction est toujours en attente, relancer la vérification après 15 secondes
                toast.info("La transaction est toujours en attente. Veuillez patienter...", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
                setTimeout(() => checkTransactionStatus(ref), 15000);
            } else {
                // Si le statut est inconnu
                throw new Error("Statut de transaction inconnu. Veuillez contacter le support.");
            }
        } catch (error) {
            console.error("Erreur lors de la vérification du statut :", error);
            toast.error(error.message || "Erreur lors de la vérification du statut de la transaction. Veuillez réessayer.", {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
    };

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
                transaction_amount: parseFloat(totalPrice),
                transaction_currency: "XAF",
                transaction_reason: "Commande directe de repas",
                app_transaction_ref: `TRX_${Date.now()}`, // Générer une référence unique
                customer_phone_number: phoneNumber,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_lang: customerLang,
            };

            console.log("Données envoyées :", data); // Vérifier les données envoyées

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

            console.log("Réponse de l'API :", response.data); // Vérifier la réponse de l'API

            // Vérifier le statut de la réponse
            const { status, transaction_ref, action, ussd } = response.data;

            if (status === "success") {
                setTransactionRef(transaction_ref);

                // Vérifier le statut de la transaction
                if (action === "PENDING") {
                    setShowUssdConfirmation(true);
                    setUssdCode(ussd);

                    toast.info(
                        `Transaction en attente. Veuillez confirmer en composant ${ussd} sur votre téléphone.`,
                        {
                            position: "bottom-right",
                            autoClose: 10000, // Afficher pendant 10 secondes
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
            if (error.response) {
                setError(error.response.data.message || "Erreur lors de la communication avec l'API de paiement.");
                toast.error(error.response.data.message || "Erreur lors de la communication avec l'API de paiement.", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            } else if (error.request) {
                setError("L'API de paiement ne répond pas. Veuillez réessayer plus tard.");
                toast.error("L'API de paiement ne répond pas. Veuillez réessayer plus tard.", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            } else {
                setError(error.message || "Une erreur est survenue lors de la soumission. Veuillez réessayer.");
                toast.error(error.message || "Une erreur est survenue lors de la soumission. Veuillez réessayer.", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour enregistrer la commande après un paiement réussi
    const enregistrerCommande = async (transaction_ref) => {
        try {
            // Préparer les données de la commande
            const repasData = {
                id: repas.id,
                quantite: quantity,
                prix: selectedVariation ? selectedVariation.prix : repas.prix,
                variation_id: selectedVariation?.id || null,
            };

            const commandeData = {
                transaction_ref: transaction_ref,
                montant_total: totalPrice,
                nom_client: customerName,
                email_client: customerEmail,
                telephone_client: phoneNumber,
                repas: [repasData], // Mettre le repas dans un tableau pour correspondre à la structure attendue
            };

            // Envoyer les données au backend
            await router.post("/commande-repas/paiement/enregistrer-commande", commandeData, {
                onSuccess: (response) => {
                    console.log("Réponse du serveur :", response);
                    toast.success(response.props.message || "Commande enregistrée avec succès !", {
                        position: "bottom-right",
                        autoClose: 5000,
                        onClose: () => {
                            // Rediriger vers /commande-repas/accueil
                            router.visit(route('commande-repas.accueil'));
                        },
                    });
                },
                onError: (errors) => {
                    console.error("Erreurs du serveur :", errors);
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
            <Head title="Paiement Direct" />
            <ToastContainer />
            <NavBarResto />
            <div className="container py-3">
                <h1 className="text-center mb-2 fw-bold montserrat-normal">Paiement Direct</h1>

                <div className="card shadow-sm p-4">
                    {/* Affichage des détails du repas */}
                    <div className="mb-4">
                        <h5 className="fw-bold montserrat-normal">Détails de la commande :</h5>
                        <div className="d-flex align-items-center gap-3 mb-3 montserrat-normal">
                            <img
                                src={repas.photo || "/images/default-repas.jpg"}
                                alt={repas.nom}
                                className="img-fluid rounded"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                            <div>
                                <h6 className="mb-0">{repas.nom}</h6>
                            </div>
                        </div>
                        {selectedVariation && (
                            <div className="mb-3">
                                <strong>Variation :</strong> {selectedVariation.type_variation} : {selectedVariation.valeur_variation}
                            </div>
                        )}
                        <div className="mb-3">
                            <strong>Quantité :</strong> {quantity}
                        </div>
                        <div className="mb-3">
                            <strong>Prix unitaire :</strong> {selectedVariation ? selectedVariation.prix : repas.prix} XAF
                        </div>

                        <div className="mb-3 montserrat-normal">
                            <strong>Frais de Livraison :</strong> 500 XAF
                        </div>
                        <div className="mb-3 montserrat-normal">
                            <strong>Prix total :</strong> {totalPrice} XAF
                        </div>
                    </div>

                    {/* Champ pour le nom du client */}
                    <div className="mb-3 montserrat-normal">
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

                    {/* Champ pour le numéro de téléphone */}
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

                    {/* Champ pour l'adresse e-mail */}
                    <div className="mb-3 montserrat-normal">
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

                    {/* Champ pour la langue préférée */}
                    <div className="mb-3 montserrat-normal">
                        <label htmlFor="customerLang" className="form-label fw-bold">
                            Langue préférée
                        </label>
                        <select
                            className="form-select"
                            id="customerLang"
                            value={customerLang}
                            onChange={(e) => setCustomerLang(e.target.value)}
                        >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    {/* Affichage des erreurs */}
                    {error && (
                        <div className="alert alert-danger mt-3">
                            {error}
                        </div>
                    )}

                    {/* Affichage de la référence de transaction */}
                    {transactionRef && (
                        <div className="alert alert-success mt-3">
                            Référence de transaction : <strong>{transactionRef}</strong>
                        </div>
                    )}

                    {/* Affichage du message de confirmation USSD */}
                    {showUssdConfirmation && (
                        <div className="alert alert-info mt-3">
                            Veuillez confirmer la transaction en composant <strong>{ussdCode}</strong> sur votre téléphone.
                        </div>
                    )}

                    {/* Bouton pour déclencher le paiement */}
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
                <button
                    className="btn btn-secondary my-4 montserrat-normal"
                    onClick={() => router.visit('/commande-repas')}
                >
                    &larr; Retour à l'accueil
                </button>
            </div>
            <PiedDePageResto />
        </>
    );
}
