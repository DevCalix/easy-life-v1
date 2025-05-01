<?php

namespace App\Http\Controllers\HotelReservation;

use \Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\HotelReservation\StoreHtReservationRequest;
use App\Models\Admin;
use App\Models\HotelReservation\HtChambre;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtReservation;
use App\Models\User;
use App\Notifications\HtReservation\HtReservationNotification;
use App\Notifications\Restaurant\NotificationReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class HtReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer toutes les réservations avec les relations nécessaires
        $reservations = HtReservation::with(['hotel', 'chambre', 'utilisateur'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Retourner la vue Inertia avec les réservations
        return Inertia::render('HotelReservation/Reservation/ReservationsIndex', [
            'reservations' => $reservations,
        ]);
    }


    // Afficher le formulaire de réservation
    public function create(Request $request)
    {
        // Récupérer l'ID de l'hôtel et de la chambre depuis la requête
        $hotelId = $request->query('hotel_id');
        $chambreId = $request->query('chambre_id');
        // dd($request->toArray());
        // Récupérer les détails de l'hôtel et de la chambre
        $hotel = HtHotel::findOrFail($hotelId);
        $chambre = HtChambre::findOrFail($chambreId);

        return Inertia::render('HotelReservation/Reservation/ReservationForm', [
            'hotel' => $hotel,
            'chambre' => $chambre,
        ]);
    }

    /**
     * Enregistre une nouvelle réservation.
     *
     * @param StoreHtReservationRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreHtReservationRequest $request)
    {
        // dd($request->toArray());
        // Valider les données et récupérer les données validées
        $validatedData = $request->validated();
        // Associer l'utilisateur connecté si disponible
        if (auth()->check()) {
            $validatedData['user_id'] = auth()->id();
        }

        // Gérer l'upload du fichier "piece_identite" (si présent)
        if ($request->hasFile('piece_identite')) {
            $path = $request->file('piece_identite')->store('reservation-hotel/pieces_identite', 'public');
            $validatedData['piece_identite'] = $path;
        }

        do {
            $reservationKey = 'RES-' . uniqid();
        } while (HtReservation::where('reservation_key', $reservationKey)->exists());

        $validatedData['reservation_key'] = $reservationKey;

        // Créer la réservation
        $reservation = HtReservation::create($validatedData);

        // Envoyer la notification aux admins (asynchrone)
        $this->notifyAdmins($reservation);

        return redirect()->back()
        ->with([
            'success' => 'Réservation effectué avec succès !',
            'reservation_key' => $reservationKey, // Inclure la clé de réservation
        ]);
    }

    protected function notifyAdmins(HtReservation $reservation)
    {
        try {
            $admins = Admin::with('user')->get()->pluck('user');

            // Version optimisée avec queue
            Notification::send($admins, (new HtReservationNotification($reservation))
                ->onQueue('notifications'));

        } catch (\Exception $e) {
            Log::error('Erreur notification réservation hôtel : ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function showStatus($reservationKey)
    {
        // Récupérer la réservation par sa clé
        $reservation = HtReservation::where('reservation_key', $reservationKey)
        ->with('hotel', 'chambre')
        ->firstOrFail();

        // dd($reservation);
        // Retourner la vue avec les détails de la réservation
        return Inertia::render('HotelReservation/Reservation/ReservationStatus', [
            'reservation' => $reservation,
        ]);
    }

    public function showCheckStatusForm()
    {
        return Inertia::render('HotelReservation/Reservation/CheckReservationStatus');
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
