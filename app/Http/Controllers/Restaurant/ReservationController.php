<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\StoreReservationRequest;
use App\Models\Restaurant\Restaurant;
use App\Models\Restaurant\RestoReservation;
use App\Models\User;
use App\Notifications\Restaurant\NotificationReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Afficher la liste des réservations.
     */
    public function index()
    {
        // Récupérer toutes les réservations avec les informations du restaurant associé
        $reservations = RestoReservation::with('restaurant')->get();

        // Passer les réservations à la vue
        return Inertia::render('CommandeRepas/Reservation/ListeReservations', [
            'reservations' => $reservations,
        ]);
    }
    /**
     * Afficher le formulaire de réservation.
     */
    public function create()
    {
        $restaurants = Restaurant::all();
        return Inertia::render('CommandeRepas/Reservation/ReservationForm', [
            'restaurants' => $restaurants,
        ]);
    }

    /**
     * Enregistrer une nouvelle réservation.
     */
    public function store(StoreReservationRequest $request)
    {
        // Valider les données de la requête (géré par StoreReservationRequest)
        $validatedData = $request->validated();

        // Ajouter l'ID de l'utilisateur connecté
        $validatedData['user_id'] = Auth::id();

        // Créer la réservation
        $reservation = RestoReservation::create($validatedData);

        // Envoyer la notification aux administrateurs
        $admins = User::whereHas('admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new NotificationReservation($reservation));
        }
        // Retourner la clé de réservation et un message de succès
        return redirect()->route('reservations-table.create')->with([
            'success' => 'Réservation enregistrée avec succès !',
            'cle_reservation' => $reservation->cle_reservation,
        ]);
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
