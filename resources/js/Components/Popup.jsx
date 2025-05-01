import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/global/popup.css';

const Popup = () => {
    const [popup, setPopup] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const hasSeenPopupRecently = () => {
        const popupSeen = localStorage.getItem('popupSeen');
        if (!popupSeen) return false;

        const expirationDate = new Date(popupSeen);
        const now = new Date();

        return now < expirationDate;
    };

    useEffect(() => {
        if (!hasSeenPopupRecently()) {
            axios.get('/active-popup')
                .then((response) => {
                    if (response.data) {
                        setPopup(response.data);
                        setTimeout(() => {
                            setIsVisible(true);
                            setTimeout(() => {
                                setIsVisible(false);
                                const expirationDate = new Date();
                                expirationDate.setMinutes(expirationDate.getMinutes() + 10);
                                localStorage.setItem('popupSeen', expirationDate.toISOString());
                            }, 10000);
                        }, response.data.delay);
                    }
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération du popup :', error);
                });
        }
    }, []);

    const handleClose = (e) => {
        e.stopPropagation(); // Empêche la propagation de l'événement au parent
        setIsVisible(false);
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 10);
        localStorage.setItem('popupSeen', expirationDate.toISOString());
    };

    const handlePopupClick = () => {
        if (popup.redirect_url) {
            window.location.href = popup.redirect_url;
        }
    };

    if (!popup || !isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content" onClick={handlePopupClick}>
                <button className="popup-close" onClick={handleClose}>
                    &times;
                </button>

                {popup.cover_popup && (
                    <img
                        src={popup.cover_popup}
                        alt="Popup Cover"
                        className="popup-image"
                    />
                )}
            </div>
        </div>
    );
};

export default Popup;
