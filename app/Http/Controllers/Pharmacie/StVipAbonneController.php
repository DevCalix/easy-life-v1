<?php

namespace App\Http\Controllers\Pharmacie;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\PharmacieSante\StAbonneVip;
use App\Notifications\PharmacieSante\NotificationAbonnementVip;

class StVipAbonneController extends Controller
{
    // Afficher la page d'abonnement VIP
    public function showAbonnementPage()
    {
        return Inertia::render('PharmacieSante/Clients/AbonnementVip');
    }
    public function enregistrerAbonnement(Request $request)
    {
        $request->validate([
            'transaction_ref' => 'required|string',
            'montant' => 'required|numeric',
            'nom_client' => 'required|string',
            'email_client' => 'required|email',
            'telephone_client' => 'required|string',
        ]);
        // Vérifie si l'utilisateur est authentifié
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
        }

        // Crée ou met à jour l'abonnement de l'utilisateur
        $abonnement = StAbonneVip::updateOrCreate(
            ['user_id' => $user->id],
            ['expire_at' => Carbon::now()->addDays(30)]
        );

        $clientVip = $user->name;
        // Envoyer la notification aux administrateurs
        $admins = User::whereHas('admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new NotificationAbonnementVip($abonnement, $clientVip));
        }

        return redirect()->intended(route('abonnement.vip'))->with('success', 'Votre abonnement VIP a été activé avec succès !');
    }
}
