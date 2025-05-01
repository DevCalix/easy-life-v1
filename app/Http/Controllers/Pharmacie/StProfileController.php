<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PharmacieSante\StCommande;
use App\Models\PharmacieSante\StRdvMedical;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class StProfileController extends Controller
{
    public function stProfil(Request $request)
    {
        $user = $request->user();
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

        // Récupérer les rendez-vous de l'utilisateur avec le médecin associé
        $rendezVous = StRdvMedical::where('user_id', $user->id)
        ->with('medecin') // Charger les informations du médecin
        ->orderBy('date', 'desc')
        ->get();


        // Vérifier si l'utilisateur est un médecin
        $isMedecin = $user->medecin !== null;
        // dd($isMedecin);
        return Inertia::render('PharmacieSante/Profil/StProfile', [
            'user' => $user,
            'commandes' => $commandes,
            'rendezVous' => $rendezVous,
            'isMedecin' => $isMedecin,
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
