<?php

namespace App\Http\Controllers\HotelReservation;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtChambre;
use App\Models\HotelReservation\HtPromotion;

class GlobalHotelReservationController extends Controller
{
    public function index(){
        // Récupérer les hôtels avec leurs chambres
        $hotels = HtHotel::with('chambres')->get();

        // Formater les données pour les logements
        $accommodations = $hotels->map(function ($hotel) {
            return [
                'id' => $hotel->id,
                'name' => $hotel->nom,
                'image' => $hotel->image_principale,
                'description' => $hotel->description,
                'price' => $hotel->chambres->min('prix_par_nuit') . ' FCFA / nuit',
            ];
        });
        // Récupérer les 10 meilleurs hôtels avec les meilleures notes
        $topHotels = HtHotel::orderBy('note', 'desc') // Trier par note décroissante
        ->take(10) // Limiter à 10 résultats
        ->get();
        // Récupérer les chambres associées à ces hôtels
        $topChambres = HtChambre::whereIn('ht_hotel_id', $topHotels->pluck('id'))
        ->with('hotel') // Charger la relation "hotel"
        ->get();

        // Récupérer les promotions actives (date de fin postérieure à la date actuelle)
        $promotions = HtPromotion::where('date_fin', '>', Carbon::now()) // Promotions actives
        ->with(['hotel', 'chambre']) // Charger les relations
        ->get();

        return Inertia::render('HotelReservation/HotelReservationAccueil', [
            'topHotels' => $topHotels,
            'topChambres' => $topChambres,
            'promotions' => $promotions,
            'accommodations' => $accommodations,
        ]);
    }

    public function nosHotels($id)
    {

        // Récupérer l'hôtel avec ses relations
        $hotel = HtHotel::with(['chambres', 'avis.utilisateur', 'promotions', 'equipements', 'services', 'images', 'metas'])
            ->findOrFail($id);
            // dd($hotel);
        return Inertia::render('HotelReservation/VueGlobal/HotelDetails', [
            'hotel' => $hotel,
        ]);
    }

    /**
     * Affiche les détails d'une chambre.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function chambreDetails($id)
    {
        // Récupérer la chambre avec ses relations
        $chambre = HtChambre::with([
            'hotel', // Informations de l'hôtel
            'images', // Images secondaires
            'equipements', // Équipements de la chambre
            'promotions', // Promotions actives
        ])->findOrFail($id);

        // Passer les données à la vue Inertia
        return Inertia::render('HotelReservation/VueGlobal/ChambreDetails', [
            'chambre' => $chambre,
        ]);
    }

    /**
     * Affiche les détails d'une promotion.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function promoDetails($id)
    {
        // Récupérer la promotion avec ses relations
        $promotion = HtPromotion::with(['hotel', 'chambre.images', 'chambre.equipements'])
            ->findOrFail($id);

        // Passer les données à la vue Inertia
        return Inertia::render('HotelReservation/VueGlobal/PromotionDetails', [
            'promotion' => $promotion,
        ]);
    }

    public function search(Request $request)
    {
        // Récupérer les paramètres de recherche
        $destination = $request->input('destination');
        $nombreChambres = $request->input('nombreChambres', 1);
        $nombrePersonnes = $request->input('nombrePersonnes', 1);

        // Effectuer la recherche
        $hotels = HtHotel::where('ville', 'like', '%' . $destination . '%')
            ->orWhere('pays_region', 'like', '%' . $destination . '%')
            ->orWhere('nom', 'like', '%' . $destination . '%')
            ->with(['chambres' => function($query) use ($nombrePersonnes) {
                $query->where('capacite', '>=', $nombrePersonnes);
            }])
            ->with('equipements') // Charger les équipements
            ->with('services')    // Charger les services
            ->get();

        // Retourner les résultats à la vue
        return Inertia::render('HotelReservation/VueGlobal/SearchResults', [
            'hotels' => $hotels,
            'destination' => $destination,
            'nombreChambres' => $nombreChambres,
            'nombrePersonnes' => $nombrePersonnes,
        ]);
    }

    // Méthode pour afficher les chambres disponibles
    public function chambresDisponibles($id)
    {
        // Récupérer les chambres disponibles pour l'hôtel spécifié
        $chambres = HtChambre::where('ht_hotel_id', $id)
            ->where('est_disponible', true) // Filtrer les chambres disponibles
            ->with('hotel') // Charger les détails de l'hôtel
            ->get();

        // Retourner la vue avec les chambres disponibles
        return Inertia::render('HotelReservation/VueGlobal/ChambresDisponibles', [
            'chambres' => $chambres,
        ]);
    }
    // Méthode pour afficher aide et assistance
    public function aideEtAssistance()
    {
        return Inertia::render('HotelReservation/VueGlobal/AideEtAssistance');
    }
}
