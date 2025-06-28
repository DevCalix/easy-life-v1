<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Submenu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $submenus = Submenu::latest()->get();

        return Inertia::render('Admin/SousMenu/CreateSubmenu', [
            'submenus' => $submenus,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Submenus/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    // Stocke un nouveau sous-menu
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|string|max:255|unique:submenus,url',
            'is_active' => 'required|boolean',
        ]);

        Submenu::create($validated);

        return redirect()->back()->with('success', 'Sous-menu créé avec succès');
    }

    // Affiche le formulaire d'édition
    public function edit($id)
    {
        $submenu = Submenu::findOrFail($id);

        return Inertia::render('Admin/SousMenu/EditSubmenu', [
            'submenu' => $submenu,
        ]);
    }

    // Met à jour un sous-menu
    public function update(Request $request, $id)
    {
        $submenu = Submenu::findOrFail($id);

        // Valide les données du formulaire
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|string|max:255|unique:submenus,url,'.$submenu->id,
            'is_active' => 'required|boolean',
        ]);

        $submenu->update($validated);

        return redirect()->route('sous-menu.index')->with('success', 'Sous-menu mis à jour avec succès');
    }

    // Supprime un sous-menu
    public function destroy($id)
    {
        $submenu = Submenu::findOrFail($id);

        $submenu->delete();
        return redirect()->back()->with('success', 'Sous-menu supprimé avec succès');
    }
}
