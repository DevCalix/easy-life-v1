import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
// import DashboardNavbar from '@/Layouts/Supermarche/admin/DashboardNavbar';
import AdminLayout from '@/Layouts/Admin/AdminLayout';

const ProductIndex = () => {
    const { produits } = usePage().props;

    // États pour les filtres
    const [filterNom, setFilterNom] = useState('');
    const [filterCategorie, setFilterCategorie] = useState('');
    const [filterStore, setFilterStore] = useState('');

    // Fonction pour filtrer les produits avec protection contre null/undefined
    const filteredProduits = produits.filter((produit) => {
        if (!produit || !produit.nom) return false;

        const matchesNom = produit.nom.toLowerCase().includes(filterNom.toLowerCase());

        const matchesCategorie = filterCategorie
            ? (produit.categories || []).some(c => c?.nom === filterCategorie)
            : true;

        const matchesStore = filterStore
            ? produit.store?.nom === filterStore
            : true;

        return matchesNom && matchesCategorie && matchesStore;
    });

    // Options uniques pour les catégories et les stores avec protection
    const categoriesUniques = [
        ...new Set(
            produits.flatMap(p =>
                (p.categories || [])
                    .map(c => c?.nom)
                    .filter(Boolean)
            )
        )
    ];

    const storesUniques = [
        ...new Set(
            produits
                .map(p => p.store?.nom)
                .filter(Boolean)
        )
    ];

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
            Inertia.delete(route('produits.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AdminLayout>
            {/* <DashboardNavbar /> */}
            <div className="container py-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className='montserrat-normal fw-bold'>Liste des Produits</h1>
                    <Link href="/supermarche/produits/create" className="btn btn-primary">
                        Ajouter un Produit
                    </Link>
                </div>

                {/* Filtres */}
                <div className="row mb-4">
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Filtrer par nom"
                            value={filterNom}
                            onChange={(e) => setFilterNom(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={filterCategorie}
                            onChange={(e) => setFilterCategorie(e.target.value)}
                        >
                            <option value="">Toutes les catégories</option>
                            {categoriesUniques.map((categorie, index) => (
                                <option key={index} value={categorie}>
                                    {categorie}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select
                            className="form-control"
                            value={filterStore}
                            onChange={(e) => setFilterStore(e.target.value)}
                        >
                            <option value="">Tous les stores</option>
                            {storesUniques.map((store, index) => (
                                <option key={index} value={store}>
                                    {store}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tableau des produits */}
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Statut</th>
                                <th>Store</th>
                                <th>Catégories</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProduits.length > 0 ? (
                                filteredProduits.map((produit, index) => (
                                    <tr key={produit.id}>
                                        <td>{index + 1}</td>
                                        <td>{produit.nom}</td>
                                        <td>{produit.prix} FCFA</td>
                                        <td>{produit.statut || 'N/A'}</td>
                                        <td>{produit.store?.nom || 'N/A'}</td>
                                        <td>
                                            {(produit.categories || [])
                                                .map(c => c?.nom)
                                                .filter(Boolean)
                                                .join(', ') || 'Aucune'}
                                        </td>
                                        <td>
                                            <Link
                                                href={`/supermarche/produits/${produit.id}/edit`}
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                Éditer
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(produit.id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        Aucun produit trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProductIndex;
