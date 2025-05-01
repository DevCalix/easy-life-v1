<?php

namespace App\Http\Requests\Supermarche;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'coordonnees_map' => 'nullable|string|max:255',
            'numero_telephone' => 'required|string|max:20',
            'horaires_ouverture' => 'nullable|string|max:255',
            'photo_store' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'rating' => 'required|numeric|min:1|max:5', // Validation pour le champ rating
        ];
    }

    /**
     * Messages personnalisés pour les erreurs de validation.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom du magasin est obligatoire.',
            'adresse.required' => 'L’adresse du magasin est obligatoire.',
            'numero_telephone.required' => 'Le numéro de téléphone est obligatoire.',
            'photo_store.image' => 'Le fichier doit être une image.',
            'photo_store.mimes' => 'Les formats d’image acceptés sont : jpeg, png, jpg, gif, webp.',
            'photo_store.max' => 'La taille de l’image ne doit pas dépasser 2 Mo.',
            'rating.required' => 'La note du magasin est obligatoire.', // Message personnalisé pour le rating
            'rating.numeric' => 'La note doit être un nombre entier.', // Message pour un type incorrect
            'rating.min' => 'La note doit être comprise entre 1 et 5.', // Message pour la valeur min
            'rating.max' => 'La note ne peut pas dépasser 5.', // Message pour la valeur max
        ];
    }
}
