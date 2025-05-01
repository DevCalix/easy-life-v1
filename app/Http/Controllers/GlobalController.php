<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use App\Models\Global\PromoBan;
use App\Models\Global\PromoBanner;
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
        return Inertia::render('Welcome', [
            'banners' => $banners,
            'ligne1' => $ligne1,
            'ligne2' => $ligne2,
            'ligne3' => $ligne3,
            'gauche' => $gauche,
            'droite' => $droite,
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
