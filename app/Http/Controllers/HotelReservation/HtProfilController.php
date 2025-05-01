<?php

namespace App\Http\Controllers\HotelReservation;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\HotelReservation\HtReservation;

class HtProfilController extends Controller
{
    // Afficher le profil de l'utilisateur avec ses réservations
    public function show()
    {
        // Récupérer l'utilisateur connecté
        $user = Auth::user();

        // Récupérer les réservations de l'utilisateur avec les relations nécessaires
        $reservations = HtReservation::where('user_id', $user->id)
            ->with(['hotel', 'chambre'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('HotelReservation/Profil/HtProfil', [
            'user' => $user,
            'reservations' => $reservations,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function htProfilEdit(Request $request): Response
    {
        return Inertia::render('HotelReservation/Profil/htUpdateProfileInformation', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
