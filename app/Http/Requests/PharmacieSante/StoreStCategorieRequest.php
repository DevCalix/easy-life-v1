<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class StoreStCategorieRequest extends FormRequest
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
            'nom' => 'required|string|max:255|unique:st_categories,nom',
            'description' => 'nullable|string',
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom de la catégorie est obligatoire.',
            'nom.unique' => 'Ce nom de catégorie est déjà utilisé.',
            'image_principale.image' => 'Le fichier doit être une image.',
            'image_principale.mimes' => 'L\'image doit être de type : jpeg, png, jpg ou gif.',
            'image_principale.max' => 'L\'image ne doit pas dépasser 2 Mo.',
        ];
    }
}
