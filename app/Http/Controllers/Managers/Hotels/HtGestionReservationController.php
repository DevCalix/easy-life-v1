<?php

namespace App\Http\Controllers\Managers\Hotels;

use App\Http\Controllers\Controller;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtReservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HtGestionReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        // 1. Récupérer les IDs des hôtels dont l'utilisateur est propriétaire
        $hotelIds = $user->services()
            ->where('service_type', HtHotel::class)
            ->pluck('service_id');

        // 2. Récupérer les réservations pour ces hôtels
        $reservations = HtReservation::with([
                'hotel:id,nom',
                'chambre:id,ht_hotel_id,numero_chambre',
                'utilisateur:id,name,email'
            ])
            // Filtre sur l'hôtel
            ->whereIn('ht_hotel_id', $hotelIds)
            // Filtre supplémentaire pour s'assurer que la chambre appartient bien à l'hôtel
            ->whereHas('chambre', function($query) use ($hotelIds) {
                $query->whereIn('ht_hotel_id', $hotelIds);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Managers/Hotels/Reservation/ReservationsIndex', [
            'reservations' => $reservations,
        ]);
    }


    public function checkStatus(Request $request)
    {
        // Valider la clé de réservation
        $request->validate([
            'reservation_key' => 'required|string|max:255',
        ]);

        // Récupérer la réservation par la clé
        $reservation = HtReservation::where('reservation_key', $request->reservation_key)
            ->with(['hotel', 'chambre']) // Charger les relations
            ->first();

        // Si la réservation n'existe pas, retourner une erreur
        if (!$reservation) {
            return redirect()->back()->with('error', 'Aucune réservation trouvée avec cette clé.');
        }

        // dd($reservation);
        // Retourner la vue avec les détails de la réservation
        return Inertia::render('HotelReservation/Reservation/ReservationStatus', [
            'reservation' => $reservation,
        ]);
    }

    public function validateReservation(Request $request, $id)
    {
        $reservation = HtReservation::findOrFail($id);
        // Vérifier que la réservation est en attente
        if ($reservation->statut !== "en_attente") {
            return response()->json(['error' => 'La réservation ne peut pas être validée.'], 400);
        }

        // Mettre à jour le statut de la réservation
        $reservation->statut = "validée";
        $reservation->save();

        // Retourner une réponse de succès
        return redirect()->back()->with('success', 'Réservation validée avec succès !');

    }
}
