<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSectionAccueilRequest;
use App\Http\Requests\UpdateSectionRequest;
use App\Models\Global\SectionAccueil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Récupérer uniquement les sections qui ont au moins un élément
        $sectionsWithItems = SectionAccueil::query()
            ->select('section')
            ->groupBy('section')
            ->havingRaw('COUNT(*) > 0')
            ->orderBy('section')
            ->get()
            ->map(function ($section) {
                return [
                    'key' => $section->section,
                    'name' => SectionAccueil::sectionsDisponibles()[$section->section] ?? $section->section,
                    'items' => SectionAccueil::where('section', $section->section)
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'nom_produit' => $item->nom_produit,
                                'prix' => number_format($item->prix, 0, ',', ' '),
                                'prix_promotion' => $item->prix_promotion ? number_format($item->prix_promotion, 0, ',', ' ') : null,
                                'pourcentage_promotion' => $item->pourcentage_promotion ? round($item->pourcentage_promotion) : null,
                                'image' => $item->image,
                                'lien_redirection' => $item->lien_redirection,
                                'created_at' => $item->created_at->format('d/m/Y'),
                            ];
                        })
                ];
            });

        return inertia('Global/SectionAccueil/IndexSectionAccueil', [
            'sections' => $sectionsWithItems,
            'appUrl' => config('app.url'),
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $sectionsDisponibles = SectionAccueil::sectionsDisponibles();
        return Inertia::render('Global/SectionAccueil/CreateSectionAccueil', [
            'sectionsDisponibles' => $sectionsDisponibles,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectionAccueilRequest $request)
    {
        $validated = $request->validated();

        try {
            // Gestion de l'upload de l'image
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('sections-accueil', 'public');
                $validated['image'] = $imagePath;
            }

            // Calcul cohérent des promotions
            if ($validated['prix_promotion'] && !$validated['pourcentage_promotion']) {
                $validated['pourcentage_promotion'] = (($validated['prix'] - $validated['prix_promotion']) / $validated['prix']) * 100;
            }

            // Création de la section
            $section = SectionAccueil::create($validated);

            return redirect()->route('section.index')
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
    public function edit($id)
    {
        // Récupérer l'élément à modifier
        $sectionItem = SectionAccueil::findOrFail($id);

        // Charger les sections disponibles
        $sectionsDisponibles = SectionAccueil::sectionsDisponibles();

        // Retourner la vue Inertia avec les données nécessaires
        return Inertia::render('Global/SectionAccueil/EditSectionAccueil', [
            'sectionItem' => $sectionItem,
            'sectionsDisponibles' => $sectionsDisponibles,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSectionRequest $request, $id)
    {
        $section = SectionAccueil::findOrFail($id);
        $validated = $request->validated();


            // Calcul cohérent des promotions
            if ($validated['prix_promotion'] && !$validated['pourcentage_promotion']) {
                $validated['pourcentage_promotion'] = (($validated['prix'] - $validated['prix_promotion']) / $validated['prix']) * 100;
            }

            // Mise à jour de la section
            $section->update($validated);

            return redirect()->route('section.index')
                ->with('success', 'Section mise à jour avec succès!');

    }

    public function updateImage(Request $request, string $id)
    {
        $section = SectionAccueil::findOrFail($id);

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($section->image && Storage::disk('public')->exists($section->image)) {
                Storage::disk('public')->delete($section->image);
            }

            // Stocker la nouvelle image
            $imagePath = $request->file('image')->store('sections-accueil', 'public');
            $section->update(['image' => $imagePath]);
        }

        return redirect()->route('section.index')
            ->with('success', 'Image mise à jour avec succès!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $section = SectionAccueil::findOrFail($id);

        // Supprimer l'image associée si elle existe
        if ($section->image && Storage::disk('public')->exists($section->image)) {
            Storage::disk('public')->delete($section->image);
        }

        // Supprimer la section
        $section->delete();

        return redirect()->route('section.index')
            ->with('success', 'Section supprimée avec succès!');
    }
}
