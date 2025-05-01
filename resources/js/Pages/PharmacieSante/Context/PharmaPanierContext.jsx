import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PharmaPanierContext = createContext();

export const PharmaPanierProvider = ({ children, initialPanier }) => {
    const [panier, setPanier] = useState(Array.isArray(initialPanier) ? initialPanier : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Calculer le total du panier
    const totalPanier = panier.reduce((acc, item) => {
        const prix = item?.variation ? parseFloat(item.variation.prix) : parseFloat(item.medicament.prix);
        const quantite = item.quantite || 0;
        return acc + (prix * quantite);
    }, 0);
    // Afficher les erreurs avec toast
    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [error]);



    // Récupérer le panier depuis l'API
    const recupererPanier = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("/pharmacie-sante/panier");

            if (response.data && response.data.panier) {
                setPanier(response.data.panier); // Mettre à jour l'état avec les données formatées
            } else {
                setPanier([]); // Si la réponse est invalide, initialiser un panier vide
            }
        } catch (err) {
            console.error("Erreur lors de la récupération du panier :", err);
            // setError("Impossible de récupérer le panier.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Récupérer le panier au montage du composant
    useEffect(() => {
        if (!initialPanier || initialPanier.length === 0) {
            recupererPanier();
        }
    }, [recupererPanier, initialPanier]);

    // Ajouter un médicament au panier
    const ajouterAuPanier = useCallback(async (medicamentData) => {
        try {
            setError(null);
            setLoading(true);
            const response = await axios.post("/pharmacie-sante/panier/ajouter", medicamentData);
            console.log(medicamentData);

            if (response.data && response.data.panier) {
                setPanier(response.data.panier);
            }
        } catch (err) {
            console.error("Erreur lors de l'ajout au panier :", err.response?.data || err.message);
            setError(err.response?.data?.error || "Impossible d'ajouter le médicament au panier.");
            throw err; // Propager l'erreur pour la gestion dans le composant
        } finally {
            setLoading(false);
        }
    }, []);

    const mettreAJourQuantite = useCallback(async (id, quantite) => {
        try {
            setError(null);
            setLoading(true);

            // Envoyer la requête pour mettre à jour la quantité
            const response = await axios.put(`/pharmacie-sante/panier/mettre-a-jour-quantite/${id}`, {
                quantite: quantite,
            });

            if (response.data && response.data.panier) {
                setPanier(response.data.panier); // Mettre à jour l'état du panier
            }
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la quantité :", err.response?.data || err.message);
            setError(err.response?.data?.error || "Impossible de mettre à jour la quantité.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Supprimer un médicament du panier
    const supprimerDuPanier = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`/pharmacie-sante/panier/supprimer/${id}`); // Endpoint spécifique à la pharmacie

            if (response.data && response.data.panier) {
                setPanier(response.data.panier); // Mettre à jour l'état avec les nouvelles données
            }
        } catch (err) {
            console.error("Erreur lors de la suppression du panier :", err);
            setError("Impossible de supprimer le médicament du panier.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Vider le panier
    const viderPanier = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.post("/pharmacie-sante/panier/vider");

            if (response.data && response.data.panier) {
                setPanier(response.data.panier); // Mettre à jour l'état avec les nouvelles données
            }
        } catch (err) {
            console.error("Erreur lors du vidage du panier :", err);
            setError("Impossible de vider le panier.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Mettre à jour le panier manuellement
    const mettreAJourPanier = useCallback((nouveauPanier) => {
        setPanier(nouveauPanier);
    }, []);

    // Valeurs fournies par le contexte
    const value = {
        panier,
        ajouterAuPanier,
        totalPanier,
        supprimerDuPanier,
        viderPanier,
        mettreAJourPanier,
        mettreAJourQuantite,
        loading,
        error,
        setError,
        recupererPanier,
    };

    return (
        <PharmaPanierContext.Provider value={value}>
            {children}
        </PharmaPanierContext.Provider>
    );
};

export const usePharmaPanier = () => useContext(PharmaPanierContext);
