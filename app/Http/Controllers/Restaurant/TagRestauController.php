<?php

namespace App\Http\Controllers\Restaurant;

use Illuminate\Http\Request;
use App\Models\Restaurant\Tagrepas;
use App\Http\Controllers\Controller;

class TagRestauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tagrepas::all();
        return response()->json($tags); // Retourne un tableau de tags
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
        // Valider les données de la requête
        $request->validate([
            'nom' => 'required|string|max:255|unique:tagrepas,nom',
        ]);

        // Créer le tag
        // dd($request);
        $tag = Tagrepas::create([
            'nom' => $request->nom,
        ]);

        // Retourner le tag créé avec un statut HTTP 201 (Created)
        return response()->json($tag, 201);
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
