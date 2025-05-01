<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class EnregistrerCommandeRequest extends FormRequest
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
            'transaction_ref' => 'required|string',
            'montant_total' => 'required|numeric',
            'nom_client' => 'required|string',
            'email_client' => 'required|email',
            'telephone_client' => 'required|string',
            'produits' => 'required|array|min:1',
            'produits.*.id' => 'required|integer|exists:st_medicaments,id',
            'produits.*.quantite' => 'required|integer|min:1',
            'produits.*.prix' => 'required|numeric|min:0',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'transaction_ref.required' => 'La référence de transaction est obligatoire.',
            'montant_total.required' => 'Le montant total est obligatoire.',
            'montant_total.numeric' => 'Le montant total doit être un nombre.',
            'nom_client.required' => 'Le nom du client est obligatoire.',
            'email_client.required' => 'L\'email du client est obligatoire.',
            'email_client.email' => 'L\'email doit être valide.',
            'telephone_client.required' => 'Le téléphone du client est obligatoire.',
            'produits.required' => 'Au moins un produit est requis.',
            'produits.*.id.exists' => 'Un des produits sélectionnés n\'existe pas.',
            'produits.*.quantite.min' => 'La quantité doit être au minimum 1.',
            'produits.*.prix.min' => 'Le prix du produit doit être positif.',
        ];
    }

}
