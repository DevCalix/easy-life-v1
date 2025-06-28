import React, { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PharmaNavbar from "@/Layouts/PharmacieSante/PharmaNavbar";
import PharmacieFooter from "@/Layouts/PharmacieSante/PharmacieFooter";
import axios from "axios";

export default function AbonnementVip() {

        useEffect(() => {
    // Supprimer les backdrop Bootstrap restés actifs
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach((backdrop) => backdrop.remove());
    // S’assurer que le body n’a plus la classe modal-open
    document.body.classList.remove('modal-open');
    }, []);

    // Configuration des abonnements
    const ABONNEMENTS = {
        generaliste: {
            prix: 3500,
            label: "Généraliste",
            description: "Accès aux médecins généralistes",
            avantages: [
                "2 Consultations par mois",
                "10% sur nos pharmacies partenaires",
            ]
        },
        specialiste: {
            prix: 7000,
            label: "Spécialiste",
            description: "Accès aux médecins spécialistes",
            avantages: [
                "2 Consultations par mois",
                "15% sur nos pharmacies partenaires"
            ]
        }
    };

    const [formData, setFormData] = useState({
        phoneNumber: "",
        customerName: "",
        customerEmail: "",
        typeAbonnement: "generaliste"
    });

    const [loading, setLoading] = useState(false);
    const [testLoading, setTestLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transactionRef, setTransactionRef] = useState(null);
    const [showUssdConfirmation, setShowUssdConfirmation] = useState(false);
    const [ussdCode, setUssdCode] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validatePhoneNumber = (phone) => {
        const regex = /^(77|65|66|67|68|69|62|78|76|70|75)[0-9]{7}$/;
        return regex.test(phone);
    };

    const validateForm = () => {
        if (!formData.phoneNumber || !formData.customerName || !formData.customerEmail) {
            setError("Veuillez remplir tous les champs obligatoires.");
            toast.error("Veuillez remplir tous les champs obligatoires.");
            return false;
        }

        if (!validatePhoneNumber(formData.phoneNumber)) {
            setError("Numéro de téléphone invalide. Utilisez un format 77xxxxxxx");
            toast.error("Numéro de téléphone invalide");
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const abonnement = ABONNEMENTS[formData.typeAbonnement];

            const paymentData = {
                transaction_amount: abonnement.prix,
                transaction_currency: "XAF",
                transaction_reason: `Abonnement VIP ${formData.typeAbonnement}`,
                app_transaction_ref: `VIP_${Date.now()}`,
                customer_phone_number: formData.phoneNumber,
                customer_name: formData.customerName,
                customer_email: formData.customerEmail
            };

            const response = await axios.post(
                "https://my-coolpay.com/api/23b12b2c-0274-4556-b1e8-39e21b9830b0/payin",
                paymentData,
                { headers: { "Content-Type": "application/json" } }
            );

            const { status, transaction_ref, action, ussd } = response.data;

            if (status === "success") {
                setTransactionRef(transaction_ref);

                if (action === "PENDING") {
                    setShowUssdConfirmation(true);
                    setUssdCode(ussd);

                    toast.info(
                        `Confirmez le paiement en composant ${ussd} sur votre téléphone`,
                        { autoClose: 10000 }
                    );

                    setTimeout(() => verifyPayment(transaction_ref), 15000);
                }
            } else {
                throw new Error("Échec de l'initialisation du paiement");
            }
        } catch (error) {
            console.error("Erreur paiement:", error);
            setError(error.response?.data?.message || "Erreur lors du paiement");
            toast.error(error.response?.data?.message || "Erreur lors du paiement");
        } finally {
            setLoading(false);
        }
    };

    // Fonction de test bypassant le paiement
    const handleSubmitTest = async () => {
        if (!validateForm()) return;

        setTestLoading(true);
        setError(null);

        try {
            // Génère une référence de test
            const testRef = `TEST_${Date.now()}`;

            toast.info("Mode test - bypass du paiement", { autoClose: 3000 });

            // Appel direct à l'enregistrement
            await saveSubscription(testRef);
        } catch (error) {
            console.error("Erreur test:", error);
            setError("Erreur lors du test d'enregistrement");
            toast.error("Erreur lors du test d'enregistrement");
        } finally {
            setTestLoading(false);
        }
    };

    const verifyPayment = async (ref) => {
        try {
            const response = await axios.get(
                `https://my-coolpay.com/api/23b12b2c-0274-4556-b1e8-39e21b9830b0/checkStatus/${ref}`
            );

            if (response.data.transaction_status === "SUCCESS") {
                await saveSubscription(ref);
            } else {
                setTimeout(() => verifyPayment(ref), 10000);
            }
        } catch (error) {
            console.error("Erreur vérification:", error);
            toast.error("Erreur lors de la vérification du paiement");
        }
    };

    const saveSubscription = async (ref) => {
        try {
            const abonnementData = {
                transaction_ref: ref,
                montant: ABONNEMENTS[formData.typeAbonnement].prix,
                nom_client: formData.customerName,
                email_client: formData.customerEmail,
                telephone_client: formData.phoneNumber,
                type_abonnement: formData.typeAbonnement
            };

            await router.post(
                "/pharmacie-sante/abonnement-vip/enregistrer",
                abonnementData,
                {
                    onSuccess: () => {
                        toast.success("Abonnement activé avec succès !");
                        setTimeout(() => {
                            router.visit(route("abonnement.confirmation"));
                        }, 3000);

                    },
                    onError: (errors) => {
                        toast.error("Erreur lors de l'enregistrement");
                        console.error("Erreurs:", errors);
                    }
                }
            );
        } catch (error) {
            console.error("Erreur enregistrement:", error);
            toast.error("Erreur technique lors de l'enregistrement");
        }
    };

    return (
        <>
            <Head title="Abonnement VIP" />
            <ToastContainer position="bottom-right" />
            <PharmaNavbar />

            <div className="container py-2">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-2">
                            <h1 className="fw-bold text-primary">Abonnement VIP</h1>
                            <p className="lead">Accédez à des services médicaux premium</p>
                            <hr className="border-2 border-primary opacity-75 mb-4" />
                        </div>

                        <div className="card shadow-sm border-0 overflow-hidden">
                            <div className="card-body p-2">
                                <h4 className="fw-bold mb-4">Choisissez votre abonnement</h4>

                                <div className="row g-3 mb-4">
                                    {Object.entries(ABONNEMENTS).map(([key, abonnement]) => (
                                        <div key={key} className="col-md-6">
                                            <div
                                                className={`card h-100 cursor-pointer ${formData.typeAbonnement === key ? 'border-primary border-2' : 'border-light'}`}
                                                onClick={() => setFormData({...formData, typeAbonnement: key})}
                                            >
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <h5 className={`fw-bold ${formData.typeAbonnement === key ? 'text-primary' : ''}`}>
                                                            {abonnement.label}
                                                        </h5>
                                                        {formData.typeAbonnement === key && (
                                                            <span className="badge bg-primary">Sélectionné</span>
                                                        )}
                                                    </div>
                                                    <h3 className={`my-3 ${formData.typeAbonnement === key ? 'text-primary' : ''}`}>
                                                        {abonnement.prix.toLocaleString()} FCFA
                                                    </h3>
                                                    <p className="text-muted small mb-3">{abonnement.description}</p>
                                                    <ul className="ps-3">
                                                        {abonnement.avantages.map((item, i) => (
                                                            <li key={i} className="mb-1 small">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h4 className="fw-bold mb-4">Informations personnelles</h4>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Nom complet</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="customerName"
                                            value={formData.customerName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="customerEmail"
                                            value={formData.customerEmail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Téléphone</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="77xxxxxxx"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Type d'abonnement</label>
                                        <input
                                            type="text"
                                            className="form-control bg-light"
                                            value={ABONNEMENTS[formData.typeAbonnement].label}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {error && <div className="alert alert-danger mt-4">{error}</div>}

                                {showUssdConfirmation && (
                                    <div className="alert alert-info mt-4">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Composez <strong>{ussdCode}</strong> pour confirmer le paiement de {ABONNEMENTS[formData.typeAbonnement].prix.toLocaleString()} FCFA
                                    </div>
                                )}

                                <div className="d-grid gap-3 mt-4">
                                    <button
                                        className="btn btn-primary w-100 py-3 fw-bold"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Paiement en cours...
                                            </>
                                        ) : (
                                            `Payer ${ABONNEMENTS[formData.typeAbonnement].prix.toLocaleString()} FCFA`
                                        )}
                                    </button>

                                    {/* <button
                                        className="btn btn-outline-secondary w-100 py-3"
                                        onClick={handleSubmitTest}
                                        disabled={testLoading}
                                    >
                                        {testLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Test en cours...
                                            </>
                                        ) : (
                                            "Tester l'enregistrement (sans paiement)"
                                        )}
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PharmacieFooter />
        </>
    );
}
