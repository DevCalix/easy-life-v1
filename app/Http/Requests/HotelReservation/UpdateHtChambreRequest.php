<?php

namespace App\Http\Requests\HotelReservation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHtChambreRequest extends FormRequest
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
            'ht_hotel_id' => 'required|exists:ht_hotels,id', // L'hôtel doit exister
            'numero_chambre' => 'required|string|max:255',
            'type' => 'required|string|max:255', // Type de chambre
            'prix_par_nuit' => 'required|numeric|min:0', // Prix par nuit (positif)
            'capacite' => 'required|integer|min:1', // Capacité (au moins 1 personne)
            'lits_disponibles' => 'required|integer|min:1', // Lits disponibles (au moins 1)
            'description' => 'nullable|string', // Description (optionnelle)
            'est_disponible' => 'required|boolean', // Disponibilité (true/false)
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // Image (optionnelle)
            'equipements' => 'nullable|array', // Tableau d'IDs des équipements (optionnel)
            'equipements.*' => 'exists:ht_equipements,id', // Vérifie que chaque ID d'équipement existe
        ];
    }

    public function messages(): array
    {
        return [
            'ht_hotel_id.required' => 'Le champ hôtel est obligatoire.',
            'ht_hotel_id.exists' => 'L\'hôtel sélectionné n\'existe pas.',
            'numero_chambre.required' => 'Le numéro de chambre est obligatoire.',
            'type.required' => 'Le type de chambre est obligatoire.',
            'prix_par_nuit.required' => 'Le prix par nuit est obligatoire.',
            'prix_par_nuit.numeric' => 'Le prix par nuit doit être un nombre.',
            'prix_par_nuit.min' => 'Le prix par nuit ne peut pas être négatif.',
            'capacite.required' => 'La capacité est obligatoire.',
            'capacite.integer' => 'La capacité doit être un nombre entier.',
            'capacite.min' => 'La capacité doit être d\'au moins 1 personne.',
            'lits_disponibles.required' => 'Le nombre de lits disponibles est obligatoire.',
            'lits_disponibles.integer' => 'Le nombre de lits disponibles doit être un nombre entier.',
            'lits_disponibles.min' => 'Le nombre de lits disponibles doit être d\'au moins 1.',
            'est_disponible.required' => 'La disponibilité est obligatoire.',
            'est_disponible.boolean' => 'La disponibilité doit être "disponible" ou "non disponible".',
            'image_principale.image' => 'Le fichier doit être une image.',
            'image_principale.mimes' => 'L\'image doit être de type : jpeg, png, jpg ou gif.',
            'image_principale.max' => 'L\'image ne doit pas dépasser 2 Mo.',
            'equipements.array' => 'Les équipements doivent être fournis sous forme de tableau.',
            'equipements.*.exists' => 'Un ou plusieurs équipements sélectionnés n\'existent pas.',
        ];
    }
}
