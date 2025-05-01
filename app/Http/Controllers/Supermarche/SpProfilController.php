<?php

namespace App\Http\Controllers\Supermarche;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Supermarche\Commande;

class SpProfilController extends Controller
{
    public function stProfil(Request $request)
    {
        $user = $request->user();
        $commandes = Commande::where('utilisateur_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Formater les produits pour chaque commande
        // $commandes = Commande::all();
        return Inertia::render('Supermarche/Profil/SpProfil', [
            'user' => $user,
            'commandes' => $commandes,

        ]);
    }
}
