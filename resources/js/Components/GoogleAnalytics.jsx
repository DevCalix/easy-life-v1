import { useEffect } from "react";

const GoogleAnalytics = ({ currentPage }) => {
    const isProduction = import.meta.env.PROD;

    useEffect(() => {
        if (!isProduction) return; // N'exécute rien en local

        // Ajouter le script Google Analytics au <head> si ce n'est pas déjà fait
        if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=G-SGQQE7QSM7"]`)) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-SGQQE7QSM7';
            document.head.appendChild(script);

            script.onload = () => {
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    window.dataLayer.push(arguments);
                }
                gtag('js', new Date());
                gtag('config', 'G-SGQQE7QSM7', {
                    page_path: currentPage,
                });
            };
        } else {
            // Met à jour le chemin de la page pour chaque navigation
            window.gtag('config', 'G-SGQQE7QSM7', {
                page_path: currentPage,
            });
        }
    }, [currentPage]); // Réagit uniquement aux changements de la page actuelle

    return null; // Ne rien afficher
};

export default GoogleAnalytics;
