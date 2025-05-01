<?php

namespace App\Http\Controllers\Managers\Restau;

use App\Http\Controllers\Controller;
use App\Models\Restaurant\Repas;
use App\Models\Restaurant\VariationRepas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VarMgsController extends Controller
{
    /**
     * Affiche le formulaire de création d'une nouvelle variation de repas.
     *
     * @param  \App\Models\Restaurant\Repas  $repas
     * @return \Illuminate\View\View
     */
    public function create($repasId)
    {
        $repas = Repas::where('repasId', $repasId)->firstOrFail();
        
        // Récupérer les variations associées au repas
        $variations = $repas->variations;
        return Inertia::render('Managers/Repas/AddVariationRepas', [
            'repas' => $repas,
            'variations' => $variations,
        ]);
    }

    public function store(Request $request, $repasId)
    {
        $repas = Repas::where('repasId', $repasId)->firstOrFail();
        // dd($repas);
        // Valider les données du formulaire
        $request->validate([
            'type_variation' => 'required|string|max:255', // Nouveau champ : type de variation
            'valeur_variation' => 'required|string|max:255', // Nouveau champ : valeur de variation
            'prix' => 'required|numeric|min:0',
            'image_variation' => 'nullable|image|max:2048', // Validation pour l'image
        ]);

        // Gérer l'upload de l'image
        $imagePath = null;
        if ($request->hasFile('image_variation')) {
            $imagePath = $request->file('image_variation')->store('commande-repas/images/variations', 'public');
        }

        // Créer la variation
        $repas->variations()->create([
            'type_variation' => $request->type_variation,
            'valeur_variation' => $request->valeur_variation,
            'prix' => $request->prix,
            'image_variation' => $imagePath, // Sauvegarde du chemin de l'image
        ]);

        // Rediriger avec un message de succès
        return redirect()->route('mgs-repas.variations.create', $repas->repasId)
            ->with('success', 'Variation ajoutée avec succès.');

    }

    /**
     * Supprimer une variation.
     */
    public function destroy($repasId, $variationId)
    {
        $repas = Repas::where('repasId', $repasId)->firstOrFail();
        $variation = VariationRepas::findOrFail($variationId);
        // dd($variation);
        // Supprimer l'image associée si elle existe
        if ($variation->image_variation) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $variation->image_variation);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer la variation
        $variation->delete();
        // Rediriger avec un message de succès
        return redirect()->route('mgs-repas.variations.create', $repas->repasId)
            ->with('success', 'Variation supprimée avec succès.');
    }
}
