<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminSetupController extends Controller
{
    // Afficher le formulaire pour devenir administrateur
    public function showForm()
    {
        return Inertia::render('Admin/DevenirAdminForm');
    }

    // Traiter la soumission du formulaire
    public function processForm(Request $request)
    {
        // Valider le code secret
        $request->validate([
            'code_secret' => ['required', 'string'],
        ]);

        // Vérifier si l'utilisateur est déjà admin
        if (Auth::user()->isAdmin()) {
            return redirect()->back()->withErrors([
                'code_secret' => 'Vous êtes déjà administrateur.'
            ]);
        }

        // Vérifier si le code secret est correct
        if ($request->code_secret === config('app.admin_secret_code')) {
            // Créer un enregistrement dans la table `admins`
            Admin::create([
                'user_id' => Auth::id(),
            ]);

            return redirect()->route('dashboard')->with('success', 'Vous êtes maintenant administrateur.');
        }

        // Rediriger avec un message d'erreur si le code est incorrect
        return redirect()->back()->withErrors([
            'code_secret' => 'Code secret incorrect.'
        ]);
    }
}
