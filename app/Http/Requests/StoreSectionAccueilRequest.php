<?php

namespace App\Http\Requests;

use App\Models\GLobal\SectionAccueil;
use Illuminate\Foundation\Http\FormRequest;

class StoreSectionAccueilRequest extends FormRequest
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
            'section' => 'required|string|max:255|in:' . implode(',', array_keys(SectionAccueil::sectionsDisponibles())),
            'nom_produit' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'prix_promotion' => 'nullable|numeric|min:0|lt:prix',
            'pourcentage_promotion' => 'nullable|numeric|min:0|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'lien_redirection' => 'required|string|max:255|url',
        ];
    }

    public function messages(): array
    {
        return [
            'section.required' => 'La section est obligatoire.',
            'section.in' => 'La section sélectionnée est invalide.',
            'nom_produit.required' => 'Le nom du produit est requis.',
            'nom_produit.max' => 'Le nom du produit ne doit pas dépasser 255 caractères.',
            'prix.required' => 'Le prix est obligatoire.',
            'prix.numeric' => 'Le prix doit être un nombre.',
            'prix.min' => 'Le prix doit être supérieur ou égal à 0.',
            'prix_promotion.numeric' => 'Le prix promotionnel doit être un nombre.',
            'prix_promotion.min' => 'Le prix promotionnel doit être supérieur ou égal à 0.',
            'prix_promotion.lt' => 'Le prix promotionnel doit être inférieur au prix normal.',
            'pourcentage_promotion.numeric' => 'Le pourcentage de promotion doit être un nombre.',
            'pourcentage_promotion.min' => 'Le pourcentage doit être supérieur ou égal à 0.',
            'pourcentage_promotion.max' => 'Le pourcentage ne doit pas dépasser 100.',
            'image.required' => 'L\’image est obligatoire.',
            'image.image' => 'Le fichier doit être une image.',
            'image.mimes' => 'L\’image doit être de type jpeg, png, jpg ou gif.',
            'image.max' => 'L\’image ne doit pas dépasser 2 Mo.',
            'lien_redirection.required' => 'Le lien de redirection est obligatoire.',
            'lien_redirection.url' => 'Le lien de redirection doit être une URL valide.',
        ];
    }

}
