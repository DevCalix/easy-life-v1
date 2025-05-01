<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Restaurant\Repas;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Restaurant\VariationRepas;

class VariationRepasController extends Controller
{
    /**
     * Affiche le formulaire de création d'une nouvelle variation de repas.
     *
     * @param  \App\Models\Restaurant\Repas  $repas
     * @return \Illuminate\View\View
     */
    public function create(Repas $repas)
    {

        // Récupérer les variations associées au repas
        $variations = $repas->variations;
        return Inertia::render('CommandeRepas/Variations/AddVariationRepas', [
            'repas' => $repas,
            'variations' => $variations,
        ]);
    }

    public function store(Request $request, Repas $repas)
    {
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
        return redirect()->route('repas.variations.create', $repas)
            ->with('success', 'Variation ajoutée avec succès.');

    }

    /**
     * Supprimer une variation.
     */
    public function destroy(Repas $repas, VariationRepas $variation)
    {

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
        return redirect()->route('repas.variations.create', $repas)
            ->with('success', 'Variation supprimée avec succès.');
    }
}
