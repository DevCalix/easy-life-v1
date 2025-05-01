<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Restaurant\Repas;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\Restaurant\VariationRepas;
use App\Models\Restaurant\RepasCommandePanier;

class RestaurantPanierController extends Controller
{
    // Afficher le panier
    public function afficher()
    {
        try {
            $query = RepasCommandePanier::with(['repas', 'variation']);

            if (Auth::check()) {
                $query->where('user_id', Auth::id());
            } else {
                $query->where('session_id', Session::getId());
            }

            $panier = $query->get();

            // Formater les données du panier
            $panierFormate = $panier->map(function ($item) {
                if (!$item->repas) {
                    return null;
                }

                // Déterminer le prix en fonction de la réduction
                $prixRepas = $item->repas->reduction > 0
                    ? $item->repas->prix_reduit // Utiliser le prix réduit si une réduction existe
                    : $item->repas->prix; // Sinon, utiliser le prix normal

                // Combiner type_variation et valeur_variation pour former le nom de la variation
                $nomVariation = $item->variation
                    ? $item->variation->type_variation . ' : ' . $item->variation->valeur_variation
                    : null;

                return [
                    'id' => $item->id,
                    'quantite' => $item->quantite,
                    'repas' => [
                        'id' => $item->repas->id,
                        'nom' => $item->repas->nom,
                        'prix' => $item->variation ? $item->variation->prix : $prixRepas, // Utiliser le prix réduit ou normal
                        'image' => $item->repas->photo,
                        'reduction' => $item->repas->reduction, // Ajouter la réduction pour affichage
                        'prix_reduit' => $item->repas->prix_reduit, // Ajouter le prix réduit pour affichage
                    ],
                    'variation' => $item->variation
                        ? [
                            'id' => $item->variation->id,
                            'nom' => $nomVariation, // Utiliser le nom combiné
                            'prix' => $item->variation->prix,
                            'type_variation' => $item->variation->type_variation,
                            'valeur_variation' => $item->variation->valeur_variation,
                        ]
                        : null,
                ];
            })->filter(); // Filtrer les éléments null

            // Calculer le nombre de produits uniques
            $produitsUniques = $panier->groupBy(function ($item) {
                return $item->repas_id . '-' . $item->variation_id;
            })->count();

            // Renvoyer une réponse JSON
            return response()->json([
                'panier' => $panierFormate,
                'nombreProduitsUniques' => $produitsUniques, // Ajouter le nombre de produits uniques
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du panier : ' . $e->getMessage());
            return response()->json([
                'panier' => [],
                'error' => 'Une erreur s\'est produite lors de la récupération du panier.',
            ], 500);
        }
    }

    // Ajouter un repas au panier
    public function ajouter(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'repas_id' => 'required|exists:repas,id',
                'quantite' => 'required|integer|min:1',
                'variation_id' => 'nullable|exists:variation_repas,id',
            ]);

            $userId = Auth::check() ? Auth::id() : null;
            $sessionId = Auth::check() ? null : Session::getId();

            // Récupérer le repas et vérifier s'il est en promotion
            $repas = Repas::find($request->repas_id);
            $prixUnitaire = $repas->reduction ? $repas->prix_reduit : $repas->prix;

            // Si une variation est sélectionnée, utiliser son prix
            if ($request->variation_id) {
                $variation = VariationRepas::find($request->variation_id);
                $prixUnitaire = $variation->prix;
            }

            // Vérifier si l'élément existe déjà dans le panier
            $panierItem = RepasCommandePanier::where([
                'user_id' => $userId,
                'session_id' => $sessionId,
                'repas_id' => $request->repas_id,
                'variation_id' => $request->variation_id,
            ])->first();

            if ($panierItem) {
                // Si l'élément existe, mettre à jour la quantité
                $panierItem->quantite += $request->quantite;
                $panierItem->save();
            } else {
                // Sinon, créer un nouvel élément
                $panierItem = RepasCommandePanier::create([
                    'user_id' => $userId,
                    'session_id' => $sessionId,
                    'repas_id' => $request->repas_id,
                    'variation_id' => $request->variation_id,
                    'quantite' => $request->quantite,
                    'prix_unitaire' => $prixUnitaire, // Enregistrer le prix unitaire
                ]);
            }

            DB::commit();
            return response()->json([
                'panier' => $this->afficher()->getData()->panier,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de l\'ajout au panier : ' . $e->getMessage());
            return response()->json([
                'error' => 'Une erreur s\'est produite lors de l\'ajout au panier.',
            ], 500);
        }
    }

    // Supprimer un repas du panier
    public function supprimer($id)
    {
        try {
            $panierItem = Auth::check()
                ? RepasCommandePanier::where('id', $id)->where('user_id', Auth::id())->first()
                : RepasCommandePanier::where('id', $id)->where('session_id', Session::getId())->first();

            if (!$panierItem) {
                return response()->json([
                    'error' => 'Élément du panier introuvable.',
                ], 404);
            }

            $panierItem->delete();
            return response()->json([
                'panier' => $this->afficher()->getData()->panier,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression du panier : ' . $e->getMessage());
            return response()->json([
                'error' => 'Une erreur s\'est produite lors de la suppression du panier.',
            ], 500);
        }
    }

    // Vider le panier
    public function vider()
    {
        try {
            if (Auth::check()) {
                RepasCommandePanier::where('user_id', Auth::id())->delete();
            } else {
                RepasCommandePanier::where('session_id', Session::getId())->delete();
            }

            return response()->json([
                'panier' => [],
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors du vidage du panier : ' . $e->getMessage());
            return response()->json([
                'error' => 'Une erreur s\'est produite lors du vidage du panier.',
            ], 500);
        }
    }

    // Afficher la page du panier avec Inertia
    public function afficherPanier()
    {
        try {
            $query = RepasCommandePanier::with(['repas', 'variation']);

            if (Auth::check()) {
                $query->where('user_id', Auth::id());
            } else {
                $query->where('session_id', Session::getId());
            }

            $panier = $query->get();

            // Formater les données du panier
            $panierFormate = $panier->map(function ($item) {
                if (!$item->repas) {
                    return null;
                }

                // Déterminer le prix en fonction de la réduction
                $prixRepas = $item->repas->reduction > 0
                    ? $item->repas->prix_reduit // Utiliser le prix réduit si une réduction existe
                    : $item->repas->prix; // Sinon, utiliser le prix normal

                // Combiner type_variation et valeur_variation pour former le nom de la variation
                $nomVariation = $item->variation
                    ? $item->variation->type_variation . ' : ' . $item->variation->valeur_variation
                    : null;

                return [
                    'id' => $item->id,
                    'quantite' => $item->quantite,
                    'repas' => [
                        'id' => $item->repas->id,
                        'nom' => $item->repas->nom,
                        'prix' => $item->variation ? $item->variation->prix : $prixRepas, // Utiliser le prix réduit ou normal
                        'image' => $item->repas->photo,
                        'reduction' => $item->repas->reduction, // Ajouter la réduction pour affichage
                        'prix_reduit' => $item->repas->prix_reduit, // Ajouter le prix réduit pour affichage
                    ],
                    'variation' => $item->variation
                        ? [
                            'id' => $item->variation->id,
                            'nom' => $nomVariation, // Utiliser le nom combiné
                            'prix' => $item->variation->prix,
                            'type_variation' => $item->variation->type_variation,
                            'valeur_variation' => $item->variation->valeur_variation,
                        ]
                        : null,
                ];
            })->filter(); // Filtrer les éléments null

            // Calculer le total du panier
            $totalPanier = $panierFormate->reduce(function ($carry, $item) {
                return $carry + ($item['repas']['prix'] * $item['quantite']);
            }, 0);

            // Retourner la réponse Inertia avec les données du panier
            return Inertia::render('CommandeRepas/RepasCommandePanier', [
                'panier' => $panierFormate,
                'totalPanier' => $totalPanier,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du panier : ' . $e->getMessage());
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de la récupération du panier.');
        }
    }

    // Dans RestaurantPanierController.php

    public function mettreAJourQuantite(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'quantite' => 'required|integer|min:1', // La quantité doit être un entier positif
            ]);

            // Récupérer l'élément du panier
            $panierItem = Auth::check()
                ? RepasCommandePanier::where('id', $id)->where('user_id', Auth::id())->firstOrFail()
                : RepasCommandePanier::where('id', $id)->where('session_id', Session::getId())->firstOrFail();

            // Mettre à jour la quantité
            $panierItem->quantite = $request->quantite;
            $panierItem->save();

            DB::commit();

            // Retourner le panier mis à jour
            return response()->json([
                'panier' => $this->afficher()->getData()->panier,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de la mise à jour de la quantité : ' . $e->getMessage());
            return response()->json([
                'error' => 'Une erreur s\'est produite lors de la mise à jour de la quantité.',
            ], 500);
        }
    }

}
