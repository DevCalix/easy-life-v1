import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Créer le contexte
const PanierContext = createContext();

// Provider pour le contexte
export const PanierProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Charger le panier depuis la session ou la base de données
    useEffect(() => {
        const chargerPanier = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/supermarche/panier");

                if (response.data.success) {
                    setPanier(response.data.panier);
                } else {
                    throw new Error(response.data.message || "Erreur lors du chargement du panier.");
                }
            } catch (error) {
                console.error("Erreur lors du chargement du panier :", error);
                setError("Erreur lors du chargement du panier. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        };

        chargerPanier();
    }, []);

    // Ajouter un produit au panier
    const ajouterAuPanier = async (produitData) => {

        try {
            setLoading(true);
            const response = await axios.post("/supermarche/panier/ajouter", produitData);

            if (response.data.success) {
                // Recharger le panier après une mise à jour
                const panierResponse = await axios.get("/supermarche/panier");
                if (panierResponse.data.success) {
                    setPanier(panierResponse.data.panier);
                }
                setError(null);
            } else {
                throw new Error(response.data.message || "Erreur lors de l'ajout au panier.");
            }
        } catch (err) {
            console.error("Erreur lors de l'ajout au panier :", err);
            setError(err.response?.data?.errors || "Impossible d'ajouter le produit au panier.");
        } finally {
            setLoading(false);
        }
    };

    const modifierQuantite = async (id, nouvelleQuantite) => {
        try {
            setLoading(true);
            const response = await axios.put(`/supermarche/panier/modifier/${id}`, {
                quantite: nouvelleQuantite,
            });

            if (response.data.success) {

                // Recharger le panier après une mise à jour
                const panierResponse = await axios.get("/supermarche/panier");
                if (panierResponse.data.success) {
                    setPanier(panierResponse.data.panier);
                }
            } else {
                throw new Error(response.data.message || "Erreur lors de la modification de la quantité.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification de la quantité :", error);
            setError("Une erreur s'est produite lors de la modification de la quantité.");
        } finally {
            setLoading(false);
        }
    };

    // Supprimer un produit du panier
    const supprimerDuPanier = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`/supermarche/panier/supprimer/${id}`);

            if (response.data.success) {
                // Mettre à jour l'état du panier avec les nouvelles données
                // Recharger le panier après une mise à jour
                const panierResponse = await axios.get("/supermarche/panier");
                if (panierResponse.data.success) {
                    setPanier(panierResponse.data.panier);
                }
                setError(null);
            } else {
                throw new Error(response.data.message || "Erreur lors de la suppression du panier.");
            }
        } catch (err) {
            console.error("Erreur lors de la suppression du panier :", err);
            setError("Impossible de supprimer le produit du panier.");
        } finally {
            setLoading(false);
        }
    };

    // Vider le panier
    const viderPanier = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/supermarche/panier/vider");

            if (response.data.success) {
                // Mettre à jour l'état du panier avec un tableau vide
                setPanier([]);
            } else {
                throw new Error(response.data.message || "Erreur lors du vidage du panier.");
            }
        } catch (err) {
            console.error("Erreur lors du vidage du panier :", err);
            setError("Impossible de vider le panier.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PanierContext.Provider
            value={{
                panier,
                ajouterAuPanier,
                modifierQuantite,
                supprimerDuPanier,
                viderPanier,
                loading,
                error,
                setError,
            }}
        >
            {children}
        </PanierContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const usePanier = () => useContext(PanierContext);
