<?php

namespace App\Http\Requests\HotelReservation;

use Illuminate\Foundation\Http\FormRequest;

class StoreHtReservationRequest extends FormRequest
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
            'ht_hotel_id' => 'required|exists:ht_hotels,id',
            'ht_chambre_id' => 'required|exists:ht_chambres,id',
            'date_arrivee' => 'required|date|after_or_equal:today',
            'date_depart' => 'required|date|after:date_arrivee',
            'nombre_personnes' => 'required|integer|min:1',
            'prix' => 'required|numeric|min:0',
            'numero_piece' => 'required|string|max:255',
            'piece_identite' => 'nullable|file|mimes:pdf,jpg,png,webp|max:2048', // Fichier optionnel (PDF, JPG, PNG)
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:20',
            'raison_sejour' => 'nullable|string',

        ];
    }

    /**
     * Messages d'erreur personnalisés.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'ht_hotel_id.required' => 'L\'hôtel est obligatoire.',
            'ht_hotel_id.exists' => 'L\'hôtel sélectionné n\'existe pas.',
            'ht_chambre_id.required' => 'La chambre est obligatoire.',
            'ht_chambre_id.exists' => 'La chambre sélectionnée n\'existe pas.',
            'date_arrivee.required' => 'La date d\'arrivée est obligatoire.',
            'date_arrivee.after_or_equal' => 'La date d\'arrivée doit être aujourd\'hui ou une date ultérieure.',
            'date_depart.required' => 'La date de départ est obligatoire.',
            'date_depart.after' => 'La date de départ doit être après la date d\'arrivée.',
            'nombre_personnes.required' => 'Le nombre de personnes est obligatoire.',
            'nombre_personnes.min' => 'Le nombre de personnes doit être d\'au moins 1.',
            'prix_total.required' => 'Le prix total est obligatoire.',
            'prix_total.min' => 'Le prix total ne peut pas être négatif.',
            'numero_piece.required' => 'Le numéro de pièce d\'identité est obligatoire.',
            'piece_identite.file' => 'Le fichier doit être un fichier valide.',
            'piece_identite.mimes' => 'Le fichier doit être de type PDF, JPG ou PNG.',
            'piece_identite.max' => 'Le fichier ne doit pas dépasser 2 Mo.',
            'nom.required' => 'Le nom est obligatoire.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être une adresse email valide.',
            'telephone.required' => 'Le téléphone est obligatoire.',
            'statut.in' => 'Le statut doit être "en_attente", "confirmee" ou "annulee".',
        ];
    }
}
