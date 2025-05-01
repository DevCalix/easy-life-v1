<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class StPharmacieRequest extends FormRequest
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
            'heures_ouverture' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'lien_carte' => 'nullable|url|max:255',
            'image_principale' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max
            'note' => 'nullable|numeric|min:0|max:5',
            'pharmacie_de_garde' => 'nullable|boolean',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom de la pharmacie est obligatoire.',
            'adresse.required' => 'L\'adresse de la pharmacie est obligatoire.',
            'heures_ouverture.required' => 'Les heures d\'ouverture sont obligatoires.',
            'telephone.required' => 'Le numéro de téléphone est obligatoire.',
            'lien_carte.url' => 'Le lien de la carte doit être une URL valide.',
            'image_principale.image' => 'Le fichier doit être une image.',
            'image_principale.mimes' => 'L\'image doit être de type : jpeg, png, jpg ou gif.',
            'image_principale.max' => 'L\'image ne doit pas dépasser 2 Mo.',
            'image_principale.required' => 'L\'image principale est obligatoire.',
            'note.numeric' => 'La note doit être un nombre.',
            'note.min' => 'La note ne peut pas être inférieure à 0.',
            'note.max' => 'La note ne peut pas dépasser 5.',
            'pharmacie_de_garde.boolean' => 'Le champ pharmacie de garde doit être vrai ou faux.',
        ];
    }
}
