<?php

namespace App\Http\Requests\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class StoreRepasRequest extends FormRequest
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
            'restaurant_id' => 'required|exists:restaurants,id', // Doit exister dans la table restaurants
            'categorie_repas_id' => 'required|exists:categorie_repas,id', // Doit exister dans la table categorie_repas
            'nom' => 'required|string|max:255', // Nom obligatoire, maximum 255 caractères
            'description' => 'nullable|string', // Description facultative
            'prix' => 'required|numeric|min:0', // Prix obligatoire, doit être un nombre positif
            'reduction' => 'nullable|numeric|min:0|max:100', // Réduction facultative, entre 0 et 100
            'prix_reduit' => 'nullable|numeric|min:0', // Prix réduit facultatif, doit être un nombre positif
            'rating' => 'nullable|numeric|min:0|max:5', // Note facultative, entre 0 et 5
            'est_populaire' => 'nullable|boolean', // Champ booléen facultatif
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Photo facultative, doit être une image valide
            'tags' => 'nullable|array', // Tags facultatifs, doit être un tableau
            'tags.*' => 'exists:tagrepas,id', // Chaque tag doit exister dans la table tagrepas
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'restaurant_id.required' => 'Le restaurant est obligatoire.',
            'restaurant_id.exists' => 'Le restaurant sélectionné est invalide.',
            'categorie_repas_id.required' => 'La catégorie de repas est obligatoire.',
            'categorie_repas_id.exists' => 'La catégorie de repas sélectionnée est invalide.',
            'nom.required' => 'Le nom du repas est obligatoire.',
            'nom.max' => 'Le nom du repas ne doit pas dépasser 255 caractères.',
            'prix.required' => 'Le prix est obligatoire.',
            'prix.numeric' => 'Le prix doit être un nombre.',
            'prix.min' => 'Le prix ne peut pas être négatif.',
            'reduction.numeric' => 'La réduction doit être un nombre.',
            'reduction.min' => 'La réduction ne peut pas être négative.',
            'reduction.max' => 'La réduction ne peut pas dépasser 100%.',
            'prix_reduit.numeric' => 'Le prix réduit doit être un nombre.',
            'prix_reduit.min' => 'Le prix réduit ne peut pas être négatif.',
            'rating.numeric' => 'La note doit être un nombre.',
            'rating.min' => 'La note ne peut pas être négative.',
            'rating.max' => 'La note ne peut pas dépasser 5.',
            'photo.image' => 'Le fichier doit être une image.',
            'photo.mimes' => 'Le fichier doit être de type :jpeg, :png, :jpg ou :gif.',
            'photo.max' => 'La taille de l\'image ne doit pas dépasser 2 Mo.',
            'tags.array' => 'Les tags doivent être un tableau.',
            'tags.*.exists' => 'Un ou plusieurs tags sélectionnés sont invalides.',
        ];
    }
}
