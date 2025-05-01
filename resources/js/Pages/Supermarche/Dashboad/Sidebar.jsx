import React from "react";
import { Link } from "@inertiajs/react";

const Sidebar = () => {
    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
            <h4 className="mb-4">Dashboard</h4>
            <ul className="nav flex-column">
                <li className="nav-item mb-3">
                    <Link href="/supermarche/produits" className="nav-link text-white">
                        <i className="bi bi-box me-2"></i> Produits
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link href="/supermarche/categories" className="nav-link text-white">
                        <i className="bi bi-tags me-2"></i> Catégories
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link href="/supermarche/commandes" className="nav-link text-white">
                        <i className="bi bi-cart me-2"></i> Commandes
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <Link href="/supermarche/panier" className="nav-link text-white">
                        <i className="bi bi-basket me-2"></i> Panier
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
