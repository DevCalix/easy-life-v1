<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use App\Models\Global\PromoBan;
use App\Models\Global\PromoBanner;
use App\Models\Global\SectionAccueil;
use App\Models\Submenu;
use App\Models\TopVendeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GlobalController extends Controller
{

    public function index()
    {
        $banners = PromoBanner::where("statut", 1)->get();
        $ligne1 = PromoBan::where("statut", 1)->where("emplacement", "ligne_1")->get();
        $ligne2 = PromoBan::where("statut", 1)->where("emplacement", "ligne_2")->get();
        $ligne3 = PromoBan::where("statut", 1)->where("emplacement", "ligne_3")->get();
        $gauche = PromoBan::where("statut", 1)->where("emplacement", "gauche")->get();
        $droite = PromoBan::where("statut", 1)->where("emplacement", "droite")->get();

        // Récupérer les sections d'accueil actives
        $sections = SectionAccueil::query()
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
                                'image' => asset($item->image),
                                'lien_redirection' => $item->lien_redirection,
                            ];
                        })
                ];
            });

            $topVendeurs = TopVendeur::query()
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
    // dd($sections);
        return Inertia::render('Welcome', [
            'banners' => $banners,
            'ligne1' => $ligne1,
            'ligne2' => $ligne2,
            'ligne3' => $ligne3,
            'gauche' => $gauche,
            'droite' => $droite,
            'sections' => $sections,
            'topVendeurs' => $topVendeurs,
            'submenus' => Submenu::where('is_active', true)->get()->map(function ($submenu) {
    return $submenu->only(['id', 'title', 'is_active']) + ['url' => $submenu->formatted_url];
}),
            'appUrl' => config('app.url'),
        ]);
    }

    public function getPhoneNumber(){
        $contactInfo = ContactInfo::first();
        return response()->json($contactInfo);
    }

    public function editPhoneNumber()
    {
        $contactInfo = ContactInfo::first();
        return Inertia::render('Global/Contact/Edit', compact('contactInfo'));
    }

    public function updatePhoneNumber(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|string|max:20',
        ]);

        $contactInfo = ContactInfo::firstOrCreate([], []);
        $contactInfo->update(['phone_number' => $request->phone_number]);

        return redirect()->back()->with('success', 'Numéro mis à jour avec succès.');
    }


}
