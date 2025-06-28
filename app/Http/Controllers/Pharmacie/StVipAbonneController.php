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
            'type_abonnement' => 'required|string|in:generaliste,specialiste',
        ]);
        // Vérifie si l'utilisateur est authentifié
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
        }

        // Crée ou met à jour l'abonnement de l'utilisateur
            $abonnement = StAbonneVip::updateOrCreate(
            ['user_id' => $user->id],
            [
                'expire_at' => Carbon::now()->addDays(30),
                'type_abonnement' => $request->type_abonnement,
                'rdv_restants' => 2,
            ]
        );

        $clientVip = $user->name;
        // Envoyer la notification aux administrateurs
        $admins = User::whereHas('admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new NotificationAbonnementVip($abonnement, $clientVip));
        }

        return redirect()->intended(route('abonnement.confirmation'))->with('success', 'Votre abonnement VIP a été activé avec succès !');
    }

    public function showConfirmationPage(Request $request)
    {
        $type = StAbonneVip::where('user_id', Auth::id())
            ->value('type_abonnement');
        $expiration = StAbonneVip::where('user_id', Auth::id())
            ->value('expire_at');
        // Formater la date si elle existe
        $formattedExpiration = $expiration
            ? Carbon::parse($expiration)->format('d/m/Y')
            : null;

        return Inertia::render('PharmacieSante/Clients/AbonnementConfirmation', [
            'type' => $type,
            'expiration' => $formattedExpiration,
        ]);
    }
}
