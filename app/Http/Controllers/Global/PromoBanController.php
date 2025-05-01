<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use App\Models\Global\PromoBan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PromoBanController extends Controller
{
    /**
     * Affiche la liste des bannières promotionnelles sous forme de grille
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Validation des paramètres de recherche
        $request->validate([
            'search' => 'nullable|string|max:255',
        ]);
        // $promoBans = PromoBan::all();
        // dd($promoBans);
        // Récupération des bannières avec pagination et recherche
        $promoBans = PromoBan::query()
            ->when($request->search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('emplacement', 'like', "%{$search}%")
                          ->orWhere('lien', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(30) 
            ->withQueryString();

        return Inertia::render('Global/PromoBan/IndexPromoBan', [
            'promoBans' => $promoBans,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Méthode pour activer/désactiver une bannière
     *
     * @param PromoBan $promoBan
     * @return \Illuminate\Http\RedirectResponse
     */
    public function toggle(PromoBan $promoBan)
    {
        $promoBan->update(['statut' => !$promoBan->statut]);

        return back()->with([
            'success' => $promoBan->statut
                ? 'Bannière activée avec succès'
                : 'Bannière désactivée avec succès'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $banners = PromoBan::all();
        return Inertia::render('Global/PromoBan/CreatePromoBan', [
            'banners' => $banners,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'lien' => 'nullable|url',
            'emplacement' => 'required|string|max:255',
            'statut' => 'boolean',
        ]);

        // Traitement de l'image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('promo_bans', 'public');
            $validated['image'] = $path;
        }

        // Création de la bannière
        PromoBan::create($validated);

        return redirect()->route('banniere.index')
            ->with('success', 'Bannière promotionnelle ajoutée avec succès!');
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $banner = PromoBan::findOrFail($id);
        // Supprimer l'ancienne image si elle existe
        if ($banner->image) {
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
        return redirect()->route('banniere.index')
            ->with('success', 'Bannière supprimée avec succès!');
    }
}
