<?php

namespace App\Http\Controllers\Managers\Supermarche;

use App\Http\Controllers\Controller;
use App\Http\Requests\Supermarche\VariationImageRequest;
use App\Models\Supermarche\Produit;
use App\Models\Supermarche\Variation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpVariationController extends Controller
{
    public function store(VariationImageRequest $request, $id)
{
    $produit = Produit::findOrFail($id);
    try {
        // Valider les données
        $validated = $request->validate([
            'type_variation' => 'required|string|max:255',
            'valeur_variation' => 'required|string|max:255',
            'prix_additionnel' => 'required|numeric|min:0',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // Limite de 2MB par image
        ]);

        // Créer la variation
        $variation = $produit->variations()->create([
            'type_variation' => $validated['type_variation'],
            'valeur_variation' => $validated['valeur_variation'],
            'prix_additionnel' => $validated['prix_additionnel'],
        ]);


        // Gérer le stockage des images si présentes
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('supermache/produits/variations', 'public'); // Stocker dans le dossier "variations"
                $variation->images()->create(['url' => $path]);
            }
        }

        // Retourner une réponse de succès
        return redirect()->back()->with('success', 'Variation ajoutée avec succès.');
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Renvoyer les erreurs de validation à Inertia
        throw $e;
    } catch (\Exception $e) {
        // Gérer les autres erreurs
        return redirect()->back()->with('error', 'Une erreur est survenue lors de l\'ajout de la variation.');
    }
}

    /**
     * Display the specified resource.
     */
    public function show($id)
    {   
        $produit = Produit::findOrFail($id);    

        // Charger les variations avec leurs images associées
        $variations = $produit->variations()->with('images')->get();

        return Inertia::render('Managers/Supermarche/Produits/AddVariationsForm', [
            'produitId' => $produit->id,
            'variations' => $variations,
            'appUrl' => config('app.url'),
        ]);

    }

public function destroy(Variation $variation)
    {
        // Supprime toutes les images associées
        foreach ($variation->images as $image) {
            try {
                // Transforme l'URL enregistrée en chemin relatif au disque public
                $relativePath = str_replace('storage/', '', $image->url);

                // Debug : Vérifie le chemin
                \Log::info('Chemin relatif pour suppression : ' . $relativePath);

                // Vérifie si le fichier existe
                if (\Storage::disk('public')->exists($relativePath)) {
                    // Supprime le fichier physique
                    \Storage::disk('public')->delete($relativePath);
                    \Log::info('Fichier supprimé avec succès : ' . $relativePath);
                } else {
                    \Log::warning('Fichier non trouvé dans le stockage : ' . $relativePath);
                }

                // Supprime l'enregistrement de la base de données
                $image->delete();
                \Log::info('Image supprimée de la base de données avec succès (ID : ' . $image->id . ').');
            } catch (\Exception $e) {
                // Log de l'erreur
                \Log::error('Erreur lors de la suppression de l\'image (ID : ' . $image->id . ') : ' . $e->getMessage());
            }
        }


        // Supprime la variation
        $variation->delete();

        return redirect()->back()->with('success', 'Variation supprimée avec succès.');
    }
}
