<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class StMedicamentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Règles de validation pour les champs du formulaire.
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max
            'prix' => 'required|numeric|min:0',
            'ordonnance_requise' => 'nullable|boolean',
            'medicament_urgent' => 'nullable|boolean',
            'st_pharmacie_id' => 'required|exists:st_pharmacies,id',
            'categories' => 'nullable|array', // Pour les catégories associées
            'categories.*' => 'exists:st_categories,id', // Vérifie que chaque catégorie existe
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom du médicament est obligatoire.',
            'prix.required' => 'Le prix du médicament est obligatoire.',
            'prix.numeric' => 'Le prix doit être un nombre.',
            'prix.min' => 'Le prix ne peut pas être négatif.',
            'st_pharmacie_id.required' => 'La pharmacie est obligatoire.',
            'st_pharmacie_id.exists' => 'La pharmacie sélectionnée est invalide.',
            'categories.*.exists' => 'Une ou plusieurs catégories sélectionnées sont invalides.',
        ];
    }
}
