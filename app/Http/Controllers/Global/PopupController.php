<?php

namespace App\Http\Controllers\Global;

use App\Http\Controllers\Controller;
use App\Models\Global\Popup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PopupController extends Controller
{
    /**
     * Affiche la liste des popups.
     */
    public function index()
    {
        $popups = Popup::all();
        return Inertia::render('Global/Popup/IndexPopup', [
            'popups' => $popups,
            'appUrl' => config('app.url'),
        ]);
    }

    /**
     * Affiche le formulaire de création d'un popup.
     */
    public function create()
    {
        return Inertia::render('Global/Popup/CreatePopup');
    }

    /**
     * Enregistre un nouveau popup.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'cover_popup' => 'nullable|file|mimes:jpg,jpeg,webp,png',
            'delay' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'redirect_url' => 'nullable|url',
        ]);

        $mediaPath = null;
        if ($request->hasFile('cover_popup')) {
            $mediaPath = $request->file('cover_popup')->store('popups', 'public');
        }

        Popup::create([
            'title' => $request->title,
            'message' => $request->message,
            'cover_popup' => $mediaPath,
            'delay' => $request->delay,
            'is_active' => $request->is_active,
            'redirect_url' => $request->redirect_url,
        ]);

        return redirect()->route('popups.index')->with('success', 'Popup créé avec succès.');
    }

    /**
     * Supprime un popup.
     */
    public function destroy(Popup $popup)
    {
        // Supprimer l'ancienne image si elle existe
        if ($popup->cover_popup) {
            // Retirer le préfixe "/storage/" du chemin
            $path = str_replace('/storage/', '', $popup->cover_popup);

            // Vérifier si le fichier existe
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            } else {
                \Log::error("Le fichier n'existe pas : " . $path);
            }
        }
        $popup->delete();
        return redirect()->route('popups.index')->with('success', 'Popup supprimé avec succès.');
    }

    public function showPopup()
    {
        $popup = Popup::where('is_active', true)->first();
        return response()->json($popup);
    }


}
