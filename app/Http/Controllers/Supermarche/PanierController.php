<?php

namespace App\Http\Controllers\Supermarche;

use Log;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Supermarche\Panier;
use App\Models\Supermarche\Produit;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Supermarche\Variation;
use Illuminate\Support\Facades\Session;

class PanierController extends Controller
{
    public function afficher()
{
    try {
        if (Auth::check()) {
            // Utilisateur connecté : récupérer le panier de l'utilisateur

            $panier = Panier::with(['produit', 'variation'])
                ->where('user_id', Auth::id())
                ->get();
        } else {
            // Utilisateur non connecté : récupérer le panier de la session
            $sessionId = Session::getId(); // Récupérer l'ID de session
            $panier = Panier::with(['produit', 'variation'])
                ->where('session_id', $sessionId)
                ->get();
        }

        return response()->json([
            'success' => true,
            'panier' => $panier,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors du chargement du panier.',
        ], 500);
    }
}
    // Ajouter un produit au panier
    public function ajouter(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1',
            'variation_id' => 'nullable|exists:variations,id',
        ]);

        try {
            // Récupérer le produit et la variation
            $produit = Produit::findOrFail($request->produit_id);
            $variation = $request->variation_id ? Variation::findOrFail($request->variation_id) : null;

            // Calculer le prix unitaire (tenant compte de la réduction)
            $prixUnitaire = $variation ? $variation->prix_additionnel : $produit->prix;
            if ($produit->pourcentage_reduction) {
                $prixUnitaire *= (1 - $produit->pourcentage_reduction / 100);
            }

            // Calculer le prix total
            $prixTotal = $prixUnitaire * $request->quantite;

            // Ajouter ou mettre à jour le panier
            if (Auth::check()) {
                $panierItem = Panier::where('user_id', Auth::id())
                    ->where('produit_id', $request->produit_id)
                    ->where('variation_id', $request->variation_id)
                    ->first();
            } else {
                $panierItem = Panier::where('session_id', Session::getId())
                    ->where('produit_id', $request->produit_id)
                    ->where('variation_id', $request->variation_id)
                    ->first();
            }

            if ($panierItem) {
                $panierItem->quantite += $request->quantite;
                $panierItem->prix_total += $prixTotal;
                $panierItem->save();
            } else {
                Panier::create([
                    'user_id' => Auth::id(),
                    'session_id' => Session::getId(),
                    'produit_id' => $request->produit_id,
                    'variation_id' => $request->variation_id,
                    'quantite' => $request->quantite,
                    'prix_unitaire' => $prixUnitaire,
                    'prix_total' => $prixTotal,
                ]);
            }

            // Retourner le panier mis à jour
            $panier = Auth::check()
                ? Panier::where('user_id', Auth::id())->get()
                : Panier::where('session_id', Session::getId())->get();

            return response()->json([
                'success' => true,
                'panier' => $panier,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de l\'ajout au panier.',
            ], 500);
        }
    }

    // Supprimer un produit du panier
    public function supprimer($id)
    {
        try {
            $panierItem = Panier::findOrFail($id);
            $panierItem->delete();

            $panier = Auth::check()
                ? Panier::where('user_id', Auth::id())->get()
                : Panier::where('session_id', Session::getId())->get();

            return response()->json([
                'success' => true,
                'panier' => $panier,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de la suppression du panier.',
            ], 500);
        }
    }

    // Vider le panier
    public function vider()
    {
        try {
            if (Auth::check()) {
                Panier::where('user_id', Auth::id())->delete();
            } else {
                Panier::where('session_id', Session::getId())->delete();
            }

            return response()->json([
                'success' => true,
                'panier' => [],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors du vidage du panier.',
            ], 500);
        }
    }

    public function modifierQuantite(Request $request, $id)
    {
        $request->validate([
            'quantite' => 'required|integer|min:1',
        ]);

        try {
            $panierItem = Panier::findOrFail($id);
            $panierItem->quantite = $request->quantite;
            $panierItem->prix_total = $panierItem->prix_unitaire * $request->quantite;
            $panierItem->save();

            // Retourner le panier mis à jour
            $panier = Auth::check()
                ? Panier::where('user_id', Auth::id())->get()
                : Panier::where('session_id', Session::getId())->get();

            return response()->json([
                'success' => true,
                'panier' => $panier,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Une erreur s\'est produite lors de la modification de la quantité.',
            ], 500);
        }
    }

    public function afficherPanier()
    {

            if (Auth::check()) {
                // Utilisateur connecté : récupérer le panier de l'utilisateur

                $panier = Panier::with(['produit', 'variation'])
                    ->where('user_id', Auth::id())
                    ->get();
            } else {
                // Utilisateur non connecté : récupérer le panier de la session
                $sessionId = Session::getId(); // Récupérer l'ID de session
                $panier = Panier::with(['produit', 'variation'])
                    ->where('session_id', $sessionId)
                    ->get();
            }

            return Inertia::render('Supermarche/CartPage',[
                'panier' => $panier,
                'appUrl' => config('app.url'),
            ]);


    }
}

