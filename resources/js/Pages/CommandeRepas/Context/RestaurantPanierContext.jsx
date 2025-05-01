import React, { createContext, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios"; // Utilisation d'axios pour les appels API
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RestaurantPanierContext = createContext();

export const RestaurantPanierProvider = ({ children, initialPanier }) => {
    const [panier, setPanier] = useState(Array.isArray(initialPanier) ? initialPanier : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            const response = await axios.get("/commande-repas/panier"); // Appel API

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

    const ajouterAuPanier = useCallback(async (repasData) => {

        try {
            setError(null);
            setLoading(true);

            const response = await axios.post("/commande-repas/panier/ajouter", repasData);

            if (response.data && response.data.panier) {
                setPanier(response.data.panier); // Mettre à jour l'état avec les nouvelles données

            }
        } catch (err) {
            console.error("Erreur lors de l'ajout au panier :", err);
            setError("Impossible d'ajouter le repas au panier.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Supprimer un repas du panier
    const supprimerDuPanier = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`/commande-repas/panier/supprimer/${id}`); // Appel API

            if (response.data && response.data.panier) {
                setPanier(response.data.panier); // Mettre à jour l'état avec les nouvelles données
            }
        } catch (err) {
            console.error("Erreur lors de la suppression du panier :", err);
            setError("Impossible de supprimer le repas du panier.");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Vider le panier
    const viderPanier = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.post("/commande-repas/panier/vider"); // Appel API

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

    const mettreAJourQuantite = useCallback(async (id, quantite) => {
        try {
            setError(null);
            setLoading(true);

            // Envoyer la requête pour mettre à jour la quantité
            const response = await axios.put(`/commande-repas/panier/mettre-a-jour-quantite/${id}`, {
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

    // Valeurs fournies par le contexte
    const value = {
        panier,
        ajouterAuPanier,
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
        <RestaurantPanierContext.Provider value={value}>
            {children}
        </RestaurantPanierContext.Provider>
    );
};

export const useRestaurantPanier = () => useContext(RestaurantPanierContext);
