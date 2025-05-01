<?php

namespace App\Http\Controllers\Restaurant;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Restaurant\Repas;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Restaurant\RepasCommande;
use App\Models\Restaurant\VariationRepas;
use App\Models\Restaurant\DetailCommandeRepas;
use App\Models\Restaurant\RepasCommandePanier;
use App\Notifications\Restaurant\NotificationAchatRepas;

class RestaurantPaiementController extends Controller
{
    public function afficher()
    {
        return Inertia::render('CommandeRepas/PaiementRestauPage');
    }

    // Enregistrer la commande après un paiement réussi
    public function enregistrerCommande(Request $request)
    {
        DB::beginTransaction();
        try {
            // Valider les données de la requête
            $request->validate([
                'transaction_ref' => 'required|string',
                'montant_total' => 'required|numeric',
                'nom_client' => 'required|string',
                'email_client' => 'required|email',
                'telephone_client' => 'required|string',
                'repas' => 'required|array', // Liste des repas commandés
            ]);

            // Récupérer l'utilisateur connecté (s'il existe)
            $userId = Auth::check() ? Auth::id() : null;

            // Créer la commande
            $commande = RepasCommande::create([
                'reference' => $request->transaction_ref,
                'utilisateur_id' => $userId,
                'nom_client' => $request->nom_client,
                'email_client' => $request->email_client,
                'telephone_client' => $request->telephone_client,
                'montant_total' => $request->montant_total,
                'statut' => 'payé', // Statut initial de la commande
            ]);

            // Enregistrer les détails de la commande
            foreach ($request->repas as $repas) {
                // Récupérer le repas et la variation
                $repasModel = Repas::find($repas['id']);
                $variation = $repas['variation_id'] ? VariationRepas::find($repas['variation_id']) : null;

                // Calculer le prix unitaire en fonction de la variation ou de la réduction
                $prixUnitaire = $variation
                    ? $variation->prix
                    : ($repasModel->reduction ? $repasModel->prix_reduit : $repasModel->prix);

                DetailCommandeRepas::create([
                    'commande_id' => $commande->id,
                    'repas_id' => $repas['id'],
                    'variation_id' => $repas['variation_id'],
                    'quantite' => $repas['quantite'],
                    'prix_unitaire' => $prixUnitaire,
                    'prix_total' => $prixUnitaire * $repas['quantite'],
                ]);
            }

            // Vider le panier après l'enregistrement de la commande
            if (Auth::check()) {
                RepasCommandePanier::where('user_id', Auth::id())->delete();
            } else {
                RepasCommandePanier::where('session_id', session()->getId())->delete();
            }

            DB::commit();

            // Envoyer la notification aux administrateurs
            $admins = User::whereHas('admin')->get();
            foreach ($admins as $admin) {
                $admin->notify(new NotificationAchatRepas($commande));
            }

            // Charger les détails de la commande avec les relations nécessaires
            $commande->load(['details.repas', 'details.variation']);
            // Rediriger vers la page de succès avec l'ID de la commande
            return redirect()->route('commande-repas.paiement.success', ['reference' => $commande->reference]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'error' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function afficherSuccess($reference)
    {
        try {
            // Récupérer la commande avec les détails nécessaires
            $commande = RepasCommande::with(['details.repas', 'details.variation'])
            ->where('reference', $reference)
            ->firstOrFail();
            // Retourner la vue Inertia avec les données de la commande
            return Inertia::render('CommandeRepas/Paiement/Success', [
                'commande' => $commande,
            ]);
        } catch (\Exception $e) {
            // Rediriger en cas d'erreur
            return redirect()->route('accueil.restaurant')->with('error', 'Commande introuvable.');
        }
    }

    public function paiementDirect(Request $request)
    {
        $repasData = $request->input('repas', []);
        $variationData = $request->input('selectedVariation', []);

        // Récupérer l'ID du repas et de la variation (avec vérification pour éviter l'erreur)
        $repasId = $repasData['id'] ?? null;
        $quantity = $request->input('quantity', 1); // Valeur par défaut : 1
        $variationId = $variationData['id'] ?? null;

        // Vérifier si l'ID du repas est bien fourni
        if (!$repasId) {
            return response()->json(['error' => 'Données de repas invalides'], 400);
        }
        // Récupérer les détails du repas et de la variation
        $repas = Repas::with('variations')->findOrFail($repasId);
        $selectedVariation = $variationId ? VariationRepas::find($variationId) : null;

        // Calculer le prix de base (variation ou repas)
        $prixBase = $selectedVariation ? $selectedVariation->prix : $repas->prix;

        // Appliquer la réduction si le repas est en promotion
        $prixReduit = $repas->reduction && $repas->prix_reduit
            ? $repas->prix_reduit
            : $prixBase;

        // Si une variation est sélectionnée, appliquer la réduction au prix de la variation
        if ($selectedVariation && $repas->reduction && $repas->prix_reduit) {
            $prixReduit = $selectedVariation->prix * (1 - ($repas->reduction / 100));
        }

        // Calculer le prix total
        $fraisLivraison = 500;
        $totalP = $quantity * $prixReduit;
        $totalPrice = $fraisLivraison + $totalP;

        // Retourner la vue Inertia avec les données
        return Inertia::render('CommandeRepas/Paiement/RepasPaiementDirect', [
            'repas' => $repas,
            'quantity' => $quantity,
            'selectedVariation' => $selectedVariation,
            'totalPrice' => $totalPrice,
        ]);
    }

}
