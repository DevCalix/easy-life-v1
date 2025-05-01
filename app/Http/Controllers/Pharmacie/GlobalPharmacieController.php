<?php

namespace App\Http\Controllers\Pharmacie;

use App\Http\Controllers\Controller;
use App\Models\Global\PromoBan;
use App\Models\PharmacieSante\StCategorie;
use App\Models\PharmacieSante\StHopital;
use App\Models\PharmacieSante\StMedecin;
use App\Models\PharmacieSante\StMedicament;
use App\Models\PharmacieSante\StPharmacie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GlobalPharmacieController extends Controller
{
    public function index(){
        // Récupérer les pharmacies de garde
        $pharmacieDeGarde = StPharmacie::where('pharmacie_de_garde', true)->get();
        $pharmacie = StPharmacie::where('pharmacie_de_garde', true)->get();
        $pharmacies = StPharmacie::All();
        $categories = StCategorie::with('medicaments')->get();
        $medecins = StMedecin::limit(3)->get();

        // Récupérer les médicaments urgents
        $medicamentsUrgents = StMedicament::where('medicament_urgent', true)->get();

        $ligne1 = PromoBan::where("statut", 1)->where("emplacement", "ligne_1")->get();
        $ligne2 = PromoBan::where("statut", 1)->where("emplacement", "ligne_2")->get();
        $ligne3 = PromoBan::where("statut", 1)->where("emplacement", "ligne_3")->get();
        $gauche = PromoBan::where("statut", 1)->where("emplacement", "gauche")->get();
        $droite = PromoBan::where("statut", 1)->where("emplacement", "droite")->get();
        return Inertia::render('PharmacieSante/PharmacieAccueil',[
            'pharmacieDeGarde' => $pharmacieDeGarde,
            'pharmacies' => $pharmacies,
            'medicamentsUrgents' => $medicamentsUrgents,
            'categories' => $categories,
            'medecins' => $medecins,
            'ligne1' => $ligne1,
            'ligne2' => $ligne2,
            'ligne3' => $ligne3,
            'gauche' => $gauche,
            'droite' => $droite,
        ]);
    }

    public function urgenceSante(){
        $hopitals = StHopital::all();
        return Inertia::render('PharmacieSante/Hopitaux/HospitalsPage',[
            'hopitals' => $hopitals,
        ]);
    }
    public function allUrgents(){
        $medicamentsUrgents = StMedicament::where('medicament_urgent', true)->get();
        return Inertia::render('PharmacieSante/Clients/ToutLesMedicamentsUrgents',[
            'medicamentsUrgents' => $medicamentsUrgents,
        ]);
    }

    // Afficher les détails d'un médicament
    public function detailsMedicaments($slug)
    {
        // Récupérer le médicament avec ses relations
        $medicament = StMedicament::with(['images', 'variations', 'pharmacie','categories'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Récupérer les catégories du médicament
        $categories = $medicament->categories->pluck('id');

        // Récupérer les médicaments similaires (mêmes catégories, excluant le médicament actuel)
        $medicamentsSimilaires = StMedicament::whereHas('categories', function ($query) use ($categories) {
            $query->whereIn('st_categorie_id', $categories);
        })
            ->where('id', '!=', $medicament->id) // Exclure le médicament actuel
            ->with(['images', 'pharmacie']) // Charger les relations nécessaires
            ->limit(4) // Limiter à 4 médicaments similaires
            ->get();

        // Retourner la vue Inertia avec les données du médicament
        return Inertia::render('PharmacieSante/Clients/MedicamentDetail', [
            'medicament' => $medicament,
            'medicamentsSimilaires' => $medicamentsSimilaires,
        ]);
    }

    // Afficher toutes les pharmacies de garde
    public function pharmaciesDeGarde()
    {
        // Récupérer toutes les pharmacies de garde
        $pharmaciesDeGarde = StPharmacie::where('pharmacie_de_garde', true)
            ->with('images')
            ->get();

        // Retourner la vue Inertia avec les données
        return Inertia::render('PharmacieSante/Clients/PharmaciesDeGarde', [
            'pharmaciesDeGarde' => $pharmaciesDeGarde,
        ]);
    }
    // Afficher toutes les pharmacies de garde
    public function pharmaciesProche()
    {
        // Récupérer toutes les pharmacies de garde
        $pharmacies = StPharmacie::All();
        // Retourner la vue Inertia avec les données
        return Inertia::render('PharmacieSante/Clients/PharmaciesProches', [
            'pharmacies' => $pharmacies,
        ]);
    }

    // Afficher les médicaments d'une catégorie spécifique
    public function medicamentsParCategorie($slug)
    {
        // Récupérer la catégorie par son slug
        $categorie = StCategorie::where('slug', $slug)
            ->with(['medicaments' => function ($query) {
                $query->with('images', 'pharmacie');
            }])
            ->firstOrFail();

        // Retourner la vue Inertia avec les données
        return Inertia::render('PharmacieSante/Clients/MedicamentsParCategorie', [
            'categorie' => $categorie,
        ]);
    }

    public function rechercherMedicaments(Request $request)
    {
        $query = $request->input('q');

        $medicaments = StMedicament::where('nom', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->with(['images', 'pharmacie'])
            ->paginate(10); // Pagination pour limiter les résultats

        return Inertia::render('PharmacieSante/Clients/RechercheMedicaments', [
            'medicaments' => $medicaments,
            'query' => $query,
        ]);
    }

    public function suggestionsMedicaments(Request $request)
    {
        $query = $request->input('q');

        // Récupérer les suggestions de médicaments disponibles en pharmacie
        $suggestions = StMedicament::where('nom', 'LIKE', "%{$query}%")
            ->orderByRaw("CASE WHEN nom LIKE '{$query}%' THEN 1 ELSE 2 END") // Trier par pertinence
            ->select('id', 'nom')
            ->limit(5)
            ->get();

        return response()->json($suggestions);
    }

    public function allSpecialiste(){
        $medecins = StMedecin::all(); // Récupérer tous les médecins
        return Inertia::render('PharmacieSante/Medecin/allSpecialiste', [
            'medecins' => $medecins,
        ]);
    }

    // Afficher les détails d'une pharmacie
    public function infoPharmacie($id)
    {
        // Récupérer la pharmacie avec ses relations
        $pharmacie = StPharmacie::with(['medicaments', 'images', 'stocks', 'avis', 'metas'])->findOrFail($id);

        // Récupérer les médicaments associés à cette pharmacie
        $medicaments = StMedicament::where('st_pharmacie_id', $id)->get();

        return Inertia::render('PharmacieSante/Pharmacie/InfoPharmacie', [
            'pharmacie' => $pharmacie,
            'medicaments' => $medicaments,
        ]);
    }

}
