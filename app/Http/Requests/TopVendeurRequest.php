<?php

namespace App\Http\Requests;

use App\Models\TopVendeur;
use Illuminate\Foundation\Http\FormRequest;

class TopVendeurRequest extends FormRequest
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
            'nom' => 'required|string|max:255', // Changé de 'nom_produit' à 'nom'
            'description' => 'nullable|string', // Ajouté pour correspondre au modèle
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
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
            'image.required' => 'L\'image est obligatoire.',
            'image.image' => 'Le fichier doit être une image.',
            'image.mimes' => 'L\'image doit être de type jpeg, png, jpg ou gif.',
            'image.max' => 'L\'image ne doit pas dépasser 2 Mo.',
            'lien_redirection.required' => 'Le lien de redirection est obligatoire.',
            'lien_redirection.url' => 'Le lien de redirection doit être une URL valide.',
        ];
    }
}
