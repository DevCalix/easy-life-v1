<?php

namespace App\Http\Controllers\HotelReservation;

use App\Http\Controllers\Controller;
use App\Models\HotelReservation\HtChambre;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtPromotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HtPromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Récupérer les paramètres de recherche et de tri
        $search = $request->query('search');
        $sortBy = $request->query('sort_by', 'date_debut'); // Par défaut, trier par date de début
        $sortOrder = $request->query('sort_order', 'asc'); // Par défaut, ordre ascendant

        // Construire la requête de base
        $promotions = HtPromotion::with(['hotel', 'chambre'])
            ->when($search, function ($query, $search) {
                return $query->where('description', 'like', '%' . $search . '%')
                            ->orWhereHas('hotel', function ($q) use ($search) {
                                $q->where('nom', 'like', '%' . $search . '%');
                            })
                            ->orWhereHas('chambre', function ($q) use ($search) {
                                $q->where('numero_chambre', 'like', '%' . $search . '%');
                            });
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate(10); // Paginer les résultats (10 par page)

        // Retourner la vue avec les données
        return Inertia::render('HotelReservation/Promotion/PromotionIndex', [
            'promotions' => $promotions,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $hotels = HtHotel::all();
        $chambres = HtChambre::all();
        return Inertia::render('HotelReservation/Promotion/PromotionForm', [
            'hotels' => $hotels,
            'chambres' => $chambres,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'ht_hotel_id' => 'required|exists:ht_hotels,id',
            'ht_chambre_id' => 'required|exists:ht_chambres,id',
            'pourcentage_reduction' => 'required|numeric|min:0|max:100',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'description' => 'required|string|max:255',
        ]);

        HtPromotion::create($validatedData);

        return redirect()->route('promotions.index')->with('success', 'Promotion créée avec succès !');
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
        $promotion = HtPromotion::findOrFail($id);
        $hotels = HtHotel::all();
        $chambres = HtChambre::all();
        return Inertia::render('HotelReservation/Promotion/PromotionForm', [
            'promotion' => $promotion,
            'hotels' => $hotels,
            'chambres' => $chambres,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $promotion = HtPromotion::findOrFail($id);

        $validatedData = $request->validate([
            'ht_hotel_id' => 'required|exists:ht_hotels,id',
            'ht_chambre_id' => 'required|exists:ht_chambres,id',
            'pourcentage_reduction' => 'required|numeric|min:0|max:100',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'description' => 'required|string|max:255',
        ]);

        $promotion->update($validatedData);

        return redirect()->route('promotions.index')->with('success', 'Promotion mise à jour avec succès !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Récupérer la promotion par son ID
            $promotion = HtPromotion::findOrFail($id);

            // Supprimer la promotion
            $promotion->delete();

            // Rediriger avec un message de succès
            return redirect()->route('promotions.index')->with('success', 'Promotion supprimée avec succès !');
        } catch (\Exception $e) {
            // Enregistrer l'erreur dans les logs
            Log::error('Erreur lors de la suppression de la promotion : ' . $e->getMessage());

            // Rediriger avec un message d'erreur
            return redirect()->route('promotions.index')->with('error', 'Une erreur s\'est produite lors de la suppression de la promotion.');
        }
    }
}
