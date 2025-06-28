<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use App\Http\Requests\TopVendeurRequest;
use App\Http\Requests\UpdateTopVendeurRequest;
use App\Models\TopVendeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TopVendeurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sectionsWithItems = TopVendeur::query()
            ->select('section')
            ->groupBy('section')
            ->havingRaw('COUNT(*) > 0')
            ->orderBy('section')
            ->get()
            ->map(function ($section) {
                return [
                    'key' => $section->section,
                    'name' => TopVendeur::sectionsDisponibles()[$section->section] ?? $section->section,
                    'items' => TopVendeur::where('section', $section->section)
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'nom' => $item->nom,
                                'description' => $item->description,
                                'image' => $item->image,
                                'lien_redirection' => $item->lien_redirection,
                                'created_at' => $item->created_at->format('d/m/Y'),
                            ];
                        })
                ];
            });

        return inertia('Global/SectionAccueil/IndexTopVendeur', [
            'sections' => $sectionsWithItems,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $sectionsDisponibles = TopVendeur::sectionsDisponibles();
        return Inertia::render('Global/SectionAccueil/createTopVendeur', [
            'sectionsDisponibles' => $sectionsDisponibles,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TopVendeurRequest $request)
    {
        $validated = $request->validated();
        try {
            // Gestion de l'upload de l'image
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('top-vendeur', 'public');
                $validated['image'] = $imagePath;
            }

            // Création de la section
            $section = TopVendeur::create($validated);
            return redirect()->route('top-vendeur.index')
                ->with('success', 'Section créée avec succès!');

        } catch (\Exception $e) {
            // En cas d'erreur, on supprime l'image uploadée si elle existe
            if (isset($imagePath) && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            return back()->withInput()
                ->with('error', 'Une erreur est survenue: ' . $e->getMessage());
        }
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
        // Récupérer l'élément à modifier
        $sectionItem = TopVendeur::findOrFail($id);

        // Charger les sections disponibles
        $sectionsDisponibles = TopVendeur::sectionsDisponibles();

        // Retourner la vue Inertia avec les données nécessaires
        return Inertia::render('Global/SectionAccueil/EditTopVendeur', [
            'sectionItem' => $sectionItem,
            'sectionsDisponibles' => $sectionsDisponibles,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTopVendeurRequest $request, string $id)
    {
        $section = TopVendeur::findOrFail($id);
        $validated = $request->validated();

            // Mise à jour de la section
            $section->update($validated);

            return redirect()->route('top-vendeur.index')
                ->with('success', 'Section mise à jour avec succès!');

    }

    public function updateImage(Request $request, string $id)
    {
        $section = TopVendeur::findOrFail($id);

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($section->image && Storage::disk('public')->exists($section->image)) {
                Storage::disk('public')->delete($section->image);
            }

            // Stocker la nouvelle image
            $imagePath = $request->file('image')->store('top-vendeur', 'public');
            $section->update(['image' => $imagePath]);
        }

        return redirect()->route('top-vendeur.index')
            ->with('success', 'Image mise à jour avec succès!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $section = TopVendeur::findOrFail($id);

        // Supprimer l'image associée si elle existe
        if ($section->image && Storage::disk('public')->exists($section->image)) {
            Storage::disk('public')->delete($section->image);
        }

        // Supprimer la section
        $section->delete();

        return redirect()->route('top-vendeur.index')
            ->with('success', 'Section supprimée avec succès!');
    }
}
