<?php

namespace App\Http\Controllers\Managers\Restau;

use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\StoreReservationRequest;
use App\Models\Restaurant\Restaurant;
use App\Models\Restaurant\RestoReservation;
use App\Models\User;
use App\Notifications\Restaurant\NotificationReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationMgsController extends Controller
{
    /**
     * Afficher la liste des réservations.
     */
    public function index()
    {
        $user = auth()->user();

        // Récupérer tous les store_id dont l'utilisateur est gestionnaire
        $restauIds = $user->services()
            ->where('service_type', Restaurant::class)
            ->pluck('service_id');

        // Récupérer uniquement les reservations avec les informations du restaurant associé
        $reservations = RestoReservation::with('restaurant')
            ->whereIn('restaurant_id', $restauIds)
            ->get();
        // Récupérer toutes les réservations avec les informations du restaurant associé
        // $reservations = RestoReservation::with('restaurant')->get();

        // Passer les réservations à la vue
        return Inertia::render('Managers/Restaurant/Reservation/ListeReservations', [
            'reservations' => $reservations,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = RestoReservation::findOrFail($id);
        $reservation->delete();

        return redirect()->back()->with('success', 'Réservation supprimée avec succès !');
    }

    /**
 * Valider une réservation.
 */
    public function valider($id)
    {
        $reservation = RestoReservation::findOrFail($id);

        // Mettre à jour le statut de la réservation
        $reservation->statut = 'validée';
        $reservation->save();

        return redirect()->back()->with('success', 'Réservation validée avec succès !');
    }
}
