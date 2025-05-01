<?php

namespace App\Http\Controllers\Supermarche;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Supermarche\Produit;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Supermarche\ImageSecondaire;

class ImageController extends Controller
{
    public function showAddSecondaryImagesForm(Produit $produit)
    {
        $images = $produit->imagesSecondaires->map(function ($image) {
            return [
                'id' => $image->id,
                'url' => Storage::url($image->url),
            ];
        });
        return Inertia::render('Supermarche/Produits/AddSecondaryImageForm', [
            'produitId' => $produit->id,
            'imagesSecondaires' => $images,
            'appUrl' => config('app.url'),
        ]);
    }

    public function storeImages(Request $request, Produit $produit)
    {
        $request->validate([
            'image_secondaires' => 'required|array',
            'image_secondaires.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $newImages = [];

        foreach ($request->file('image_secondaires') as $file) {
            $imagePath = $file->store('supermache/produits/image_secondaires', 'public');
            $image = ImageSecondaire::create([
                'produit_id' => $produit->id,
                'url' => $imagePath,
            ]);
            $newImages[] = [
                'id' => $image->id,
                'url' => asset("storage/{$image->url}"),
            ];
        }

        session()->flash('success', 'Les images secondaires ont été ajoutées.');
        session()->flash('newImages', $newImages);

        return Inertia::location(route('produits.ajouter-images', $produit->id));
    }


    public function destroy(ImageSecondaire $imageSecondaire)
    {
        try {
            // Transforme l'URL enregistrée en chemin relatif au disque public
            $relativePath = str_replace('storage/', '', $imageSecondaire->url);

            // Debug : Vérifie le chemin
            \Log::info('Chemin relatif pour suppression : ' . $relativePath);

            // Vérifie si le fichier existe
            if (Storage::disk('public')->exists($relativePath)) {
                // Supprime le fichier physique
                Storage::disk('public')->delete($relativePath);
                \Log::info('Fichier supprimé avec succès : ' . $relativePath);
            } else {
                \Log::warning('Fichier non trouvé dans le stockage : ' . $relativePath);
            }

            // Supprime l'enregistrement de la base de données
            $imageSecondaire->delete();

            // Retourne un message de succès
            return redirect()->back()->with('success', 'Image supprimée avec succès.');
        } catch (\Exception $e) {
            // Log de l'erreur
            \Log::error('Erreur lors de la suppression de l\'image : ' . $e->getMessage());

            // Retourne un message d'erreur
            return redirect()->back()->with('error', 'Une erreur s\'est produite lors de la suppression de l\'image.');
        }
    }

}
