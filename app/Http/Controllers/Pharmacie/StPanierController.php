<?php

namespace App\Http\Controllers\Pharmacie;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\PharmacieSante\StPanier;
use App\Models\PharmacieSante\StCommande;
use App\Models\PharmacieSante\StMedicament;
use App\Models\PharmacieSante\StOrdonnance;
use App\Models\PharmacieSante\StDetailCommande;
use App\Models\PharmacieSante\StVariationMedicament;
use App\Notifications\Supermarche\NotificationAchatProduit;
use App\Http\Requests\PharmacieSante\EnregistrerCommandeRequest;
use App\Notifications\PharmacieSante\NotificationAchatPharmacie;

class StPanierController extends Controller
{
    // Afficher le panier
    public function index()
    {
        try {
            $panier = StPanier::with(['medicament', 'variation'])
                ->where('user_id', Auth::id())
                ->get();

            // Formater les données du panier
            $panierFormate = $panier->map(function ($item) {
                if (!$item->medicament) {
                    return null;
                }

                // Combiner type_variation et valeur_variation pour former le nom de la variation
                $nomVariation = $item->variation
                    ? $item->variation->type_variation . ' : ' . $item->variation->valeur_variation
                    : null;

                return [
                    'id' => $item->id,
                    'quantite' => $item->quantite,
                    'medicament' => [
                        'id' => $item->medicament->id,
                        'nom' => $item->medicament->nom,
                        'prix' => $item->variation ? $item->variation->prix : $item->medicament->prix,
                        'image' => $item->medicament->image_principale,
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
                return $carry + ($item['medicament']['prix'] * $item['quantite']);
            }, 0);

            // Calculer le nombre de produits uniques
            $produitsUniques = $panier->groupBy(function ($item) {
                return $item->medicament->id . '-' . $item->variation_id;
            })->count();

            return response()->json([
                'panier' => $panierFormate,
                'totalPanier' => $totalPanier,
                'totalPanier' => $totalPanier,
                'nombreProduitsUniques' => $produitsUniques,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du panier : ' . $e->getMessage());
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de la récupération du panier.');
        }
    }

    // Ajouter un médicament au panier
    public function ajouter(Request $request)
    {
        Log::info('Données reçues pour l\'ajout au panier :', $request->all());
        DB::beginTransaction();
        try {
            $request->validate([
                'st_medicament_id' => 'required|exists:st_medicaments,id',
                'quantite' => 'required|integer|min:1',
                'st_variation_medicament_id' => 'nullable|exists:st_variation_medicaments,id',
                'prix_unitaire' => 'required|numeric', // Ajoutez cette validation
            ]);

            $userId = Auth::id();
            $medicament = StMedicament::findOrFail($request->st_medicament_id);
            // Vérifier si l'élément existe déjà dans le panier
            $panierItem = StPanier::where([
                'user_id' => $userId,
                'st_medicament_id' => $request->st_medicament_id,
                'st_variation_medicament_id' => $request->st_variation_medicament_id,
            ])->first();

            if ($panierItem) {
                // Si l'élément existe, mettre à jour la quantité
                $panierItem->quantite += $request->quantite;
                $panierItem->save();
            } else {
                // Sinon, créer un nouvel élément
                $panierItem = StPanier::create([
                    'user_id' => $userId,
                    'st_medicament_id' => $request->st_medicament_id,
                    'st_variation_medicament_id' => $request->st_variation_medicament_id,
                    'quantite' => $request->quantite,
                    'prix_unitaire' => $request->prix_unitaire,
                    'total' => $request->quantite * $request->prix_unitaire,
                    'ordonnance_requise' => $medicament->ordonnance_requise, // Vérification si ordonnance requise
                    'ordonnance_upload' => false,
                ]);
            }

            DB::commit();
            return response()->json([
                'panier' => $this->index()->getData()->panier,
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
                'error' => $e->getMessage(), // Retournez le message d'erreur
            ], 500);
        }
    }

    // Supprimer un médicament du panier
    public function supprimer($id)
    {
        try {
            $panierItem = StPanier::where('id', $id)
                ->where('user_id', Auth::id())
                ->first();

            if (!$panierItem) {
                return response()->json([
                    'error' => 'Élément du panier introuvable.',
                ], 404);
            }

            $panierItem->delete();
            return response()->json([
                'panier' => $this->index()->getData()->panier,
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
            StPanier::where('user_id', Auth::id())->delete();
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

    // Afficher la page du panier
    public function afficherPanier()
    {
        try {
            // Récupérer le panier de l'utilisateur connecté
            $panier = StPanier::with(['medicament', 'variation'])
                ->where('user_id', Auth::id())
                ->get();

            // Formater les données du panier
            $panierFormate = $panier->map(function ($item) {
                if (!$item->medicament) {
                    return null;
                }

                // Combiner type_variation et valeur_variation pour former le nom de la variation
                $nomVariation = $item->variation
                    ? $item->variation->type_variation . ' : ' . $item->variation->valeur_variation
                    : null;

                return [
                    'id' => $item->id,
                    'quantite' => $item->quantite,
                    'medicament' => [
                        'id' => $item->medicament->id,
                        'nom' => $item->medicament->nom,
                        'prix' => $item->variation ? $item->variation->prix : $item->medicament->prix,
                        'image' => $item->medicament->image_principale,
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
                return $carry + ($item['medicament']['prix'] * $item['quantite']);
            }, 0);

            // Calculer le nombre de produits uniques
            $produitsUniques = $panier->groupBy(function ($item) {
                return $item->medicament->id . '-' . $item->variation_id;
            })->count();

            // Retourner la vue avec les données formatées
            return Inertia::render('PharmacieSante/Clients/MonPanier', [
                'panier' => $panierFormate,
                'totalPanier' => $totalPanier,
                'nombreProduitsUniques' => $produitsUniques,
            ]);

        } catch (\Exception $e) {
            // En cas d'erreur, rediriger avec un message d'erreur
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de la récupération du panier.');
        }
    }

    // Afficher la page de paiement
    public function afficherPaiement()
    {
        try {
            $userId = Auth::id();

            // Récupérer le panier de l'utilisateur avec les médicaments
            $panier = StPanier::with(['medicament', 'variation'])
                ->where('user_id', $userId)
                ->get();

            // Identifier les médicaments nécessitant une ordonnance
            $medicamentsAvecOrdonnance = $panier->filter(function ($item) {
                return $item->medicament && $item->medicament->ordonnance_requise;
            });

            // Extraire les IDs des médicaments nécessitant une ordonnance
            $medicamentIds = $medicamentsAvecOrdonnance->pluck('medicament.id');

            // Vérifier les ordonnances déjà uploadées pour ces médicaments
            $ordonnances = StOrdonnance::where('user_id', $userId)
                ->whereIn('st_medicament_id', $medicamentIds)
                ->pluck('st_medicament_id');

            // Trouver les médicaments manquants
            $medicamentsManquants = $medicamentsAvecOrdonnance->filter(function ($item) use ($ordonnances) {
                return !$ordonnances->contains($item->medicament->id);
            });

            // Si des médicaments manquent une ordonnance, rediriger vers le formulaire d'upload
            if ($medicamentsManquants->isNotEmpty()) {
                return redirect()->route('ordonnance.upload')->with('error', 'Vous devez uploader une ordonnance pour certains médicaments.');
            }

            // Calculer le total du panier
            $totalPanierHF = $panier->reduce(function ($carry, $item) {
                $prix = $item->variation ? $item->variation->prix : $item->medicament->prix;
                return $carry + ($prix * $item->quantite);
            }, 0);
            // Ajouter les frais de livraison
            $fraisLivraison = 500; // Frais de livraison fixes
            $totalPanierAvecLivraison = $totalPanierHF + $fraisLivraison;

            // Rendre la vue de paiement
            return Inertia::render('PharmacieSante/Clients/StPaiement', [
                'panier' => $panier,
                'totalPanier' => $totalPanierAvecLivraison,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération du panier pour le paiement : ' . $e->getMessage());
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de la récupération du panier.');
        }
    }


    // Enregistrer la commande après un paiement réussi
    public function enregistrerCommande(EnregistrerCommandeRequest $request)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validated(); // Récupérer les données validées

            // Calcul du prix total
            $prixTotal = array_reduce($validatedData['produits'], function ($total, $produit) {
                return $total + ($produit['quantite'] * $produit['prix']);
            }, 0);

            // Création de la commande
            $commande = StCommande::create([
                'user_id' => Auth::id(),
                'transaction_ref' => $validatedData['transaction_ref'],
                'montant_total' => $validatedData['montant_total'],
                'nom_client' => $validatedData['nom_client'],
                'email_client' => $validatedData['email_client'],
                'telephone_client' => $validatedData['telephone_client'],
                'statut' => 'en cours',
                'produits' => $validatedData['produits'], // Casté en array automatiquement
            ]);

            // Enregistrement des détails de la commande
            foreach ($validatedData['produits'] as $produit) {
                StDetailCommande::create([
                    'st_commande_id' => $commande->id,
                    'st_medicament_id' => $produit['id'],
                    'quantite' => $produit['quantite'],
                    'prix' => $produit['prix'],
                ]);
            }



            // Suppression du panier de l'utilisateur
            StPanier::where('user_id', Auth::id())->delete();

            DB::commit();

            // Envoyer la notification aux administrateurs
            $admins = User::whereHas('admin')->get();
            foreach ($admins as $admin) {
                $admin->notify(new NotificationAchatPharmacie($commande));
            }

            $commandeDetails = StDetailCommande::where('st_commande_id', $commande->id)
            ->with('medicament')
            ->get();

            return Inertia::render('PharmacieSante/Paiement/Success', [
                'message' => 'Commande enregistrée avec succès !',
                'commande' => [
                    'id' => $commande->id,
                    'transaction_ref' => $commande->transaction_ref,
                    'statut' => $commande->statut,
                    'nom_client' => $commande->nom_client,
                    'email_client' => $commande->email_client,
                    'telephone_client' => $commande->telephone_client,
                    'montant_total' => $commande->montant_total,
                    'details' => $commandeDetails,
                ],
            ]);

            // return response()->json([
            //     'message' => 'Commande enregistrée avec succès !',
            //     'commande_id' => $commande->id,
            // ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur enregistrement commande : ' . $e->getMessage());

            return response()->json([
                'error' => 'Une erreur est survenue lors de l\'enregistrement de la commande.',
            ], 500);
        }
    }

    // Afficher la page de paiement pour un achat direct avec vérification d'ordonnance
    public function afficherPaiementDirect(Request $request)
{
    try {
        // Récupérer les données du médicament depuis la requête
        $medicamentId = $request->input('st_medicament_id');
        $variationId = $request->input('st_variation_medicament_id');
        $quantite = $request->input('quantite', 1);
        $prixUnitaire = $request->input('prix_unitaire');

        // Récupérer les détails du médicament
        $medicament = StMedicament::findOrFail($medicamentId);

        // Vérifier si une ordonnance est requise
        if ($medicament->ordonnance_requise) {
            $userId = Auth::id();

            // Vérifier si une ordonnance a déjà été uploadée pour ce médicament
            $ordonnanceExistante = StOrdonnance::where('user_id', $userId)
                ->where('st_medicament_id', $medicamentId)
                ->exists();

            // Si aucune ordonnance n'a été uploadée, rediriger vers le formulaire d'upload
            if (!$ordonnanceExistante) {
                // Stocker les données du médicament dans la session
                session()->put('direct_medicament_data', [
                    'st_medicament_id' => $medicamentId,
                    'st_variation_medicament_id' => $variationId,
                    'quantite' => $quantite,
                    'prix_unitaire' => $prixUnitaire,
                    'nom_medicament' => $medicament->nom,
                ]);

                return redirect()->route('ordonnance.direct.upload')->with('error', 'Une ordonnance est requise pour ce médicament.');
            }
        }

        // Récupérer les détails de la variation si elle existe
        $variation = $variationId ? StVariationMedicament::find($variationId) : null;

        // Calculer le montant total
        $sousTotal = $quantite * $prixUnitaire;
        $fraisLivraison = 500; // Frais de livraison fixes
        $totalPanier = $sousTotal + $fraisLivraison;

        // Rendre la vue de paiement
        return Inertia::render('PharmacieSante/Clients/StPaiementDirect', [
            'medicament' => $medicament,
            'variation' => $variation,
            'quantite' => $quantite,
            'prixUnitaire' => $prixUnitaire,
            'sousTotal' => $sousTotal, // Ajouter le sous-total
            'fraisLivraison' => $fraisLivraison, // Ajouter les frais de livraison
            'totalPanier' => $totalPanier, // Total avec frais de livraison
        ]);
    } catch (\Exception $e) {
        Log::error('Erreur lors de la récupération des détails du médicament pour l\'achat direct : ' . $e->getMessage());
        return redirect()->back()->with('error', 'Une erreur s\'est produite lors de la préparation du paiement.');
    }
}

    // Dans StPanierController.php

    public function mettreAJourQuantite(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'quantite' => 'required|integer|min:1', // La quantité doit être un entier positif
            ]);

            // Récupérer l'élément du panier
            $panierItem = StPanier::where('id', $id)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            // Mettre à jour la quantité
            $panierItem->quantite = $request->quantite;
            $panierItem->total = $panierItem->prix_unitaire * $request->quantite; // Recalculer le total
            $panierItem->save();

            DB::commit();

            // Retourner le panier mis à jour
            return response()->json([
                'panier' => $this->index()->getData()->panier,
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
