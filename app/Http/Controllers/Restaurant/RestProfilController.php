<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Restaurant\RestoReservation;

class RestProfilController extends Controller
{
    public function stProfil(Request $request)
    {
        $user = $request->user();
        $reservations = RestoReservation::where('user_id', $user->id)
            ->with('restaurant') // Charge la relation `restaurant`
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        // Formater les produits pour chaque commande
        // dd($reservations);
        return Inertia::render('CommandeRepas/Profil/RestProfil', [
            'user' => $user,
            'reservations' => $reservations,
        ]);
    }
}
