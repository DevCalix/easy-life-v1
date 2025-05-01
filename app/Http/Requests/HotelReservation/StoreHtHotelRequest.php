<?php

namespace App\Http\Requests\HotelReservation;

use Illuminate\Foundation\Http\FormRequest;

class StoreHtHotelRequest extends FormRequest
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
            'type_etablissement' => 'nullable|string|max:255',
            'adresse' => 'required|string|max:255',
            'numero_appartement_etage' => 'nullable|string|max:255',
            'ville' => 'required|string|max:255',
            'pays_region' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'description' => 'nullable|string',
            'equipements' => 'nullable|array',
            'services' => 'nullable|array',
            'repas_offerts' => 'nullable|array',
            'parking' => 'nullable|boolean',
            'horaires_arrivee_de' => 'nullable',
            'horaires_arrivee_a' => 'nullable',
            'horaires_depart_de' => 'nullable',
            'horaires_depart_a' => 'nullable',
            'accepte_enfants' => 'nullable|boolean',
            'accepte_animaux' => 'nullable|boolean',
            'fumer' => 'nullable|boolean',
            'note' => 'nullable|numeric|min:0|max:5',
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom de l\'hôtel est obligatoire.',
            'adresse.required' => 'L\'adresse de l\'hôtel est obligatoire.',
            'ville.required' => 'La ville de l\'hôtel est obligatoire.',
            'pays_region.required' => 'Le pays ou la région de l\'hôtel est obligatoire.',
            'telephone.required' => 'Le téléphone de l\'hôtel est obligatoire.',
            'email.required' => 'L\'email de l\'hôtel est obligatoire.',
            'email.email' => 'L\'email doit être une adresse email valide.',
            'note.numeric' => 'La note doit être un nombre.',
            'note.min' => 'La note ne peut pas être inférieure à 0.',
            'note.max' => 'La note ne peut pas être supérieure à 5.',
            'image_principale.image' => 'Le fichier doit être une image.',
            'image_principale.mimes' => 'L\'image doit être au format jpeg, png, jpg, gif ou webp.',
            'image_principale.max' => 'L\'image ne doit pas dépasser 2 Mo.',
            'horaires_arrivee_de.date_format' => 'L\'heure d\'arrivée (de) doit être au format HH:MM.',
            'horaires_arrivee_a.date_format' => 'L\'heure d\'arrivée (à) doit être au format HH:MM.',
            'horaires_depart_de.date_format' => 'L\'heure de départ (de) doit être au format HH:MM.',
            'horaires_depart_a.date_format' => 'L\'heure de départ (à) doit être au format HH:MM.',
        ];
    }
}
