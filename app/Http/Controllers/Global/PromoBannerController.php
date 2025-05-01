<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use App\Models\Global\PromoBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PromoBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banners = PromoBanner::all();
        return Inertia::render('Global/PromoBanner/Index', [
            'banners' => $banners,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Global/PromoBanner/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'promo_banner' => 'required|image',
            'redirect_url' => 'nullable|url',
        ]);


        $imagePath = $request->file('promo_banner')->store('promo/banners', 'public');

        PromoBanner::create([
            'promo_banner' => $imagePath,
            'redirect_url' => $request->redirect_url,
            'statut' => $request->statut,
        ]);

        return redirect()->route('banners.index');
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
        $banner = PromoBanner::findOrFail($id);
        return Inertia::render('Global/PromoBanner/Edit', [
            'banner' => $banner,
            'appUrl' => config('app.url'),
        ]);
    }
    /**
     * Mettre à jour l'image de la bannière.
     */
    public function updateImage(Request $request, string $id)
    {
        $request->validate([
            'promo_banner' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048', // 2MB max
        ]);

        $banner = PromoBanner::findOrFail($id);

        // Supprimer l'ancienne image si elle existe
        if ($banner->promo_banner) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $banner->promo_banner);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }



        // Enregistrer la nouvelle image
        $imagePath = $request->file('promo_banner')->store('promo/banners', 'public');
        $banner->promo_banner = $imagePath;
        $banner->save();

        return redirect()->route('banners.edit', $banner->id)->with('success', 'Image mise à jour avec succès.');
    }

    /**
     * Mettre à jour l'URL de redirection et le statut.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'redirect_url' => 'nullable|url',
            'statut' => 'nullable|boolean',
        ]);
        // dd($request->toArray());
        $banner = PromoBanner::findOrFail($id);

        // Mettre à jour les champs
        $banner->redirect_url = $request->redirect_url ?? $banner->redirect_url;
        $banner->statut = filter_var($request->statut, FILTER_VALIDATE_BOOLEAN); // Convertir en booléen
        $banner->save();

        return redirect()->route('banners.edit', $banner->id)->with('success', 'Bannière mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PromoBanner $banner)
    {
        // Supprimer l'ancienne image si elle existe
        if ($banner->promo_banner) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $banner->promo_banner);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path); // Supprimer le fichier
            } else {
                \Log::error("Le fichier n'existe pas : " . $path); // Enregistrer l'erreur
            }
        }
        $banner->delete();
        return redirect()->route('banners.index');
    }
}
