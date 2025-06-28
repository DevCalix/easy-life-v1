<?php

namespace App\Http\Requests;

use App\Models\TopVendeur;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTopVendeurRequest extends FormRequest
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
            'section' => 'required|string|max:255|in:' . implode(',', array_keys(TopVendeur::sectionsDisponibles())),
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'lien_redirection' => 'required|string|max:255|url',
        ];
    }

    public function messages(): array
    {
        return [
            'section.required' => 'La section est obligatoire.',
            'section.in' => 'La section sélectionnée est invalide.',
            'nom.required' => 'Le nom du produit est requis.', // Modifié pour 'nom'
            'nom.max' => 'Le nom du produit ne doit pas dépasser 255 caractères.', // Modifié pour 'nom'
            'description.string' => 'La description doit être du texte.', // Ajouté
            'lien_redirection.required' => 'Le lien de redirection est obligatoire.',
            'lien_redirection.url' => 'Le lien de redirection doit être une URL valide.',
        ];
    }
}
