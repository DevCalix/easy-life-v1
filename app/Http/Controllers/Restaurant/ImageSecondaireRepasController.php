<?php

namespace App\Http\Controllers\Restaurant;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Restaurant\Repas;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Restaurant\ImageSecondaireRepas;

class ImageSecondaireRepasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Afficher le formulaire d'ajout d'images secondaires.
     */
    public function create(Repas $repas)
    {
        // Chargez les images secondaires associées au repas
        $repas->load('imagesSecondairesRepas');
        return Inertia::render('CommandeRepas/ImagesSecondaires/CreateImagesSecondaires', [
            'repas' => $repas,
            'imagesSecondaires' => $repas->imagesSecondairesRepas, // Passer les images secondaires existantes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Repas $repas)
    {
        $request->validate([
            'url_images.*' => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:2048', // Valider chaque image
        ]);

        // Enregistrer chaque image
        foreach ($request->file('url_images') as $file) {
            $path = $file->store('commande-repas/repas/images-secondaires', 'public'); // Stocker l'image dans le dossier public
            $repas->imagesSecondairesRepas()->create([
                'url_image' => $path,
            ]);
        }


        return redirect()->back()->with('success', 'Image secondaire ajoutée avec succès.');
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
     * Supprimer une image secondaire.
     *
     * @param  int  $repasId
     * @param  int  $imageId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($repasId, $imageId)
    {
        // Trouver l'image secondaire
        $image = ImageSecondaireRepas::findOrFail($imageId);

        // Vérifier que l'image appartient bien au repas spécifié
        if ($image->repas_id != $repasId) {
            return redirect()->back()->with('error', 'Image non trouvée ou non associée à ce repas.');
        }

        // Supprimer le fichier image du stockage
        // Supprimer l'ancienne image si elle existe
        if ($image->url_image) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $image->url_image);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }

        // Supprimer l'enregistrement de la base de données
        $image->delete();

        return redirect()->back()->with('success', 'Image secondaire supprimée avec succès.');
    }
}
