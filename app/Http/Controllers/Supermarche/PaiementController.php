<?php

namespace App\Http\Controllers\Supermarche;

use App\Http\Controllers\Controller;
use App\Models\Supermarche\Commande;
use App\Models\Supermarche\Panier;
use App\Models\Supermarche\Produit;
use App\Models\Supermarche\Variation;
use App\Models\User;
use App\Notifications\Supermarche\NotificationAchatProduit;
use App\Notifications\Supermarche\NotificationAchatWhatsApp;
use App\Services\TwilioService;
use App\Services\WhatsAppService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class PaiementController extends Controller
{

    public function mettreEnSession(Request $request){
        // Valider les données de la requête
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite' => 'required|integer|min:1',
            'variation_id' => 'nullable|exists:variations,id',
            'prix' => 'required|numeric',
            'nom_produit' => 'required|string',
            'image_produit' => 'required|string',
        ]);

        // Stocker les données de la commande en session
        $commande = [
            'produit_id' => $request->produit_id,
            'quantite' => $request->quantite,
            'variation_id' => $request->variation_id,
            'prix' => $request->prix,
            'nom_produit' => $request->nom_produit,
            'image_produit' => $request->image_produit,
        ];

        session(['commande_directe' => $commande]);

        // Rediriger vers la page de paiement
        return redirect()->route('sp-direct.paiement');
    }
    public function PayerDirect()
    {
       // Récupérer les données de la commande depuis la session
       $commande = session('commande_directe');

       if (!$commande) {
           abort(404, "Aucune commande trouvée.");
       }
    //    dd($commande);
        // Rediriger vers la page de paiement avec les données de la commande
        return Inertia::render('Supermarche/Paiement/CommandeDirecte', [
            'commande' => $commande,
        ]);
    }

    // Afficher la page de paiement
    public function afficherPaiement()
    {
        // Récupérer le panier
        if (Auth::check()) {
            $panier = Panier::with(['produit', 'variation'])
                ->where('user_id', Auth::id())
                ->get();
        } else {
            $sessionId = Session::getId();
            $panier = Panier::with(['produit', 'variation'])
                ->where('session_id', $sessionId)
                ->get();
        }

        // Calculer le total du panier
        $sousTotal = $panier->reduce(function ($total, $item) {
            return $total + ($item->prix_unitaire * $item->quantite);
        }, 0);

        // Ajouter les frais de livraison (500 FCFA)
        $fraisLivraison = 500;
        $totalPanier = $sousTotal + $fraisLivraison;

        // Retourner la vue Inertia avec le totalPanier
        return Inertia::render('Supermarche/PaiementPage', [
            'panier' => $panier,
            'sousTotal' => $sousTotal,
            'fraisLivraison' => $fraisLivraison,
            'totalPanier' => $totalPanier,
        ]);
    }

    // Enregistrer la commande après un paiement réussi
    public function enregistrerCommande(Request $request)
    {
        $commande = $request->validate([
            'transaction_ref' => 'required|string|unique:commandes,reference',
            'montant_total' => 'required|numeric',
            'nom_client' => 'required|string',
            'email_client' => 'required|email',
            'telephone_client' => 'required|string',
            'produits' => 'required|array',
            'produits.*.id' => 'required|integer|exists:produits,id',
            'produits.*.quantite' => 'required|integer|min:1',
            'produits.*.prix' => 'required|numeric|min:0',
        ]);
        // dd($commande);
        try {
            // Création de la commande
            $commande = Commande::create([
                'reference' => $request->transaction_ref, // 🔥 Utilisation de transaction_ref
                'utilisateur_id' => auth()->check() ? auth()->id() : null, // Utilisateur connecté ou null
                'nom_client' => $request->nom_client,
                'email_client' => $request->email_client,
                'telephone_client' => $request->telephone_client,
                'montant_total' => $request->montant_total,
                'statut' => 'payé',
            ]);

            // Ajout des produits à la commande
            foreach ($request->produits as $produit) {
                $commande->produits()->attach($produit['id'], [
                    'quantite' => $produit['quantite'],
                    'prix_unitaire' => $produit['prix'],
                    'prix_total' => $produit['quantite'] * $produit['prix'],
                ]);
            }

            // Suppression des produits du panier après commande
            if (auth()->check()) {
                Panier::where('user_id', auth()->id())->delete();
            } else {
                Panier::where('session_id', session()->getId())->delete();
            }

            // Envoyer la notification aux administrateurs
            $admins = User::whereHas('admin')->get();
            foreach ($admins as $admin) {
                $admin->notify(new NotificationAchatProduit($commande));
            }

            // $whatsAppService = new WhatsAppService();

            // $message = "✅ *Chers partenaires, nous voulons vous informer qu’une nouvelle commande a été confirmée.* !\n\n"
            //         . "👤 Nom : {$commande->nom_client}\n"
            //         . "📞 Téléphone : {$commande->telephone_client}\n"
            //         . "💰 Montant : {$commande->montant_total} FCFA\n"
            //         . "🧾 Référence : {$commande->reference} \n\n"
            //         . "🙏*Merci de toujours nous faire confiance * !!!";

            // // Envoi de test vers un numéro fixe
            // $whatsAppService->sendMessage('+22995029745', $message);
            // Renvoyer une réponse Inertia
            return Inertia::render('Supermarche/Paiement/Success', [
                'success' => true,
                'message' => 'Commande enregistrée avec succès.',
                'commande' => $commande,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Supermarche/Paiement/Error', [
                'success' => false,
                'message' => 'Erreur lors de l\'enregistrement de la commande.',
                'error' => $e->getMessage(),
            ]);
        }
    }




}
