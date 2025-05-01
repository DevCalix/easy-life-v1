<?php

namespace App\Http\Requests\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class StoreRestaurantRequest extends FormRequest
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
            'coordonnees_map' => 'nullable|string',
            'numero_telephone' => 'required|string|max:20',
            'horaires_ouverture' => 'nullable|string',
            'rating' => 'nullable|integer|between:1,5',
            'photo_restaurant' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048', // 2MB max
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom du restaurant est obligatoire.',
            'adresse.required' => 'L\'adresse du restaurant est obligatoire.',
            'numero_telephone.required' => 'Le numéro de téléphone est obligatoire.',
            'rating.integer' => 'Le rating doit être un entier.',
            'rating.between' => 'Le rating doit être compris entre 1 et 5.',
            'photo_restaurant.image' => 'Le fichier doit être une image.',
            'photo_restaurant.mimes' => 'Les formats autorisés sont : jpeg, jpg, png, webp.',
            'photo_restaurant.max' => 'L\'image ne doit pas dépasser 2 Mo.',
        ];
    }
}
