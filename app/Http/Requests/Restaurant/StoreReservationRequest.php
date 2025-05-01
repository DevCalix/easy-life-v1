<?php

namespace App\Http\Requests\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
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
            'restaurant_id' => 'required|exists:restaurants,id',
            'nom_client' => 'required|string|max:255',
            'numero_telephone' => 'required|string|max:20',
            'date_reservation' => 'required|date',
            'heure_reservation' => 'required|date_format:H:i',
            'nombre_personnes' => 'required|integer|min:1',
            'commentaire' => 'nullable|string',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages()
    {
        return [
            'restaurant_id.required' => 'Le champ restaurant est obligatoire.',
            'restaurant_id.exists' => 'Le restaurant sélectionné est invalide.',
            'nom_client.required' => 'Le champ nom complet est obligatoire.',
            'nom_client.string' => 'Le champ nom complet doit être une chaîne de caractères.',
            'nom_client.max' => 'Le champ nom complet ne doit pas dépasser 255 caractères.',
            'numero_telephone.required' => 'Le champ numéro de téléphone est obligatoire.',
            'numero_telephone.string' => 'Le champ numéro de téléphone doit être une chaîne de caractères.',
            'numero_telephone.max' => 'Le champ numéro de téléphone ne doit pas dépasser 20 caractères.',
            'date_reservation.required' => 'Le champ date de réservation est obligatoire.',
            'date_reservation.date' => 'Le champ date de réservation doit être une date valide.',
            'heure_reservation.required' => 'Le champ heure de réservation est obligatoire.',
            'heure_reservation.date_format' => 'Le champ heure de réservation doit être au format HH:MM.',
            'nombre_personnes.required' => 'Le champ nombre de personnes est obligatoire.',
            'nombre_personnes.integer' => 'Le champ nombre de personnes doit être un entier.',
            'nombre_personnes.min' => 'Le champ nombre de personnes doit être au moins 1.',
            'commentaire.string' => 'Le champ commentaire doit être une chaîne de caractères.',
        ];
    }
}
