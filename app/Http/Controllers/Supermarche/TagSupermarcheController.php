<?php

namespace App\Http\Controllers\Supermarche;

use Illuminate\Http\Request;
use App\Models\Supermarche\Tag;
use App\Http\Controllers\Controller;

class TagSupermarcheController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Tag::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données entrantes
        $validated = $request->validate([
            'nom' => 'required|string|max:255|unique:categories,nom',
        ]);

        // Création de la catégorie (le slug est généré automatiquement par le modèle)
        $tag = Tag::create([
            'nom' => $validated['nom'],
        ]);

        // Retourner la catégorie créée en JSON
        return response()->json($tag);
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
        //
    }
}
