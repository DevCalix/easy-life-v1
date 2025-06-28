<?php

namespace App\Http\Controllers\Pharmacie;

use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StAbonneVip;
use App\Models\PharmacieSante\StCommande;
use App\Models\PharmacieSante\StRdvMedical;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StProfileController extends Controller
{
    public function stProfil(Request $request)
    {
        // Récupérer l'abonnement VIP s'il existe
        $user = $request->user();
        $abonnementVip = StAbonneVip::where('user_id', $user->id)->first();
        $commandes = StCommande::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->with(['details.medicament']) // Charger les détails de la commande et les médicaments associés
            ->paginate(10);

        // Formater les produits pour chaque commande
        $commandes->getCollection()->transform(function ($commande) {
            $commande->produits = $commande->details->map(function ($detail) {
                return [
                    'id' => $detail->medicament->id,
                    'nom' => $detail->medicament->nom,
                    'quantite' => $detail->quantite,
                    'prix' => $detail->prix,

                ];
            });
            return $commande;
        });

        // Récupérer les rendez-vous où l'utilisateur est soit le patient, soit le médecin
$rendezVous = StRdvMedical::where(function ($query) use ($user) {
    $query->where('user_id', $user->id);
    if ($user->medecin) {
        $query->orWhere('st_medecin_id', $user->medecin->id);
    }
})
->with(['user', 'medecin'])
->orderBy('date', 'desc')
->get();


        // dd($rendezVous);
        // Vérifier si l'utilisateur est un médecin
        $isMedecin = $user->medecin !== null;
        // dd($rendezVous);
        return Inertia::render('PharmacieSante/Profil/StProfile', [
            'user' => $user,
            'currentUser' => $user,
            'commandes' => $commandes,
            'rendezVous' => $rendezVous,
            'isMedecin' => $isMedecin,
            'abonnementVip' => $abonnementVip ? [
                'type' => $abonnementVip->type_abonnement,
               'expire_at' => $abonnementVip->expire_at ? Carbon::parse($abonnementVip->expire_at)->format('d/m/Y') : null,

                'estActif' => $abonnementVip->estActif()
                ] : null
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function stProfilEdit(Request $request): Response
    {
        return Inertia::render('PharmacieSante/Profil/StUpdateProfileInformation', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

}
