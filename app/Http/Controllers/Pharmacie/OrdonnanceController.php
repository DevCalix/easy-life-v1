<?php

namespace App\Http\Controllers\Pharmacie;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\PharmacieSante\StPanier;
use App\Models\PharmacieSante\StMedicament;
use App\Models\PharmacieSante\StOrdonnance;

class OrdonnanceController extends Controller
{
    // Afficher le formulaire d'upload des ordonnances
    public function uploadForm()
    {
        $userId = Auth::id();

        // Récupérer les médicaments nécessitant une ordonnance dans le panier
        $panier = StPanier::with(['medicament'])
            ->where('user_id', $userId)
            ->get();

        $medicamentsAvecOrdonnance = $panier->filter(function ($item) {
            return $item->medicament->ordonnance_requise;
        });

        // Vérifier les ordonnances déjà uploadées
        $ordonnances = StOrdonnance::where('user_id', $userId)
            ->whereIn('st_medicament_id', $medicamentsAvecOrdonnance->pluck('st_medicament_id'))
            ->pluck('st_medicament_id');

        // Identifier les médicaments manquants
        $medicamentsManquants = $medicamentsAvecOrdonnance->whereNotIn('st_medicament_id', $ordonnances);
    //    dd($medicamentsManquants->values());
        return Inertia::render('PharmacieSante/Clients/UploadOrdonnance', [
            'medicamentsManquants' => $medicamentsManquants->values(),
        ]);

    }
    public function uploadFormDirect()
    {
        $userId = Auth::id();

        // Récupérer les données du médicament pour le paiement direct
        $directMedicamentData = session('direct_medicament_data', null);

        if ($directMedicamentData) {
            $medicamentId = $directMedicamentData['st_medicament_id'];

            // Vérifier si l'ordonnance existe pour ce médicament
            $ordonnanceExistante = StOrdonnance::where('user_id', $userId)
                ->where('st_medicament_id', $medicamentId)
                ->exists();

            if ($ordonnanceExistante) {
                return redirect()->route('pharmacie.paiement.direct')->with('success', 'Ordonnance déjà uploadée.');
            }

            // Récupérer les détails du médicament
            $medicament = StMedicament::with('variations')->find($medicamentId);

            return Inertia::render('PharmacieSante/Clients/UploadOrdonnanceDirect', [
                'medicament' => $medicament,
                'directData' => $directMedicamentData,
            ]);
        }

        return redirect()->route('accueil.pharmacie')->with('error', 'Aucun médicament à traiter pour l\'ordonnance.');
    }


    // Enregistrer les ordonnances uploadées
    public function upload(Request $request)
    {
        // dd($request->ordonnances);
        $request->validate([
            'ordonnances' => 'required|array',
            'ordonnances.*.st_medicament_id' => 'required|exists:st_medicaments,id|integer',
            'ordonnances.*.fichier_ordonnance' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:2048',
        ]);

        $userId = Auth::id();
        // dd($request->toArray());
        try {
            foreach ($request->ordonnances as $ordonnance) {
                // Enregistrer le fichier d'ordonnance
                $path = $ordonnance['fichier_ordonnance']->store('ordonnances', 'public');

                // Créer une nouvelle entrée dans la table StOrdonnance
                StOrdonnance::create([
                    'user_id' => $userId,
                    'st_medicament_id' => $ordonnance['st_medicament_id'],
                    'fichier_ordonnance' => $path,
                ]);
            }

            return redirect()->route('pharmacie.paiement')->with('success', 'Ordonnances uploadées avec succès !');
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'upload des ordonnances : ' . $e->getMessage());
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de l\'upload des ordonnances.');
        }
    }
    // Enregistrer les ordonnances uploadées
    public function uploadDirect(Request $request)
    {


        $request->validate([
            'st_medicament_id' => 'required|exists:st_medicaments,id|integer',
            'fichier_ordonnance' => 'required|file|mimes:pdf,jpg,jpeg,png,webp|max:2048',
        ]);
        // dd($request->all());
        $userId = Auth::id();

        try {
            // Enregistrer le fichier d'ordonnance
            $path = $request->file('fichier_ordonnance')->store('ordonnances', 'public');

            // Créer une nouvelle entrée dans la table StOrdonnance
            StOrdonnance::create([
                'user_id' => $userId,
                'st_medicament_id' => $request->st_medicament_id,
                'fichier_ordonnance' => $path,
            ]);

            // Récupérer les données du médicament stockées dans la session
        $medicamentData = session()->get('direct_medicament_data');

        // Rediriger vers la page de paiement avec les données nécessaires
        return redirect()->route('pharmacie.paiement.direct', [
            'st_medicament_id' => $medicamentData['st_medicament_id'],
            'st_variation_medicament_id' => $medicamentData['st_variation_medicament_id'],
            'quantite' => $medicamentData['quantite'],
            'prix_unitaire' => $medicamentData['prix_unitaire'],
        ])->with('success', 'Ordonnance uploadée avec succès !');
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'upload de l\'ordonnance : ' . $e->getMessage());
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de l\'upload de l\'ordonnance.');
        }
    }

}
