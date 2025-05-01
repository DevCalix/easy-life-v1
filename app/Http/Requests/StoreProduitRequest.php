<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduitRequest extends FormRequest
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
            'store_id' => 'required|exists:stores,id',
            'nom' => 'required|string|max:255',
            'description_courte' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'prix' => 'required|numeric|min:0',
            'pourcentage_reduction' => 'nullable|numeric|min:0|max:100',
            'statut' => 'required|string|in:actif,épuisé',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
            'is_variable' => 'required|boolean',
            'est_populaire' => 'nullable|boolean',
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    /**
     * Messages de validation personnalisés (optionnel).
     *
     * @return array
     */
    public function messages()
    {
        return [
            'nom.required' => 'Le nom du produit est obligatoire.',
            'nom.string' => 'Le nom doit être une chaîne de caractères valide.',
            'nom.max' => 'Le nom ne doit pas dépasser :max caractères.',

            'description_courte.max' => 'La courte description ne doit pas dépasser :max caractères.',
            'prix.required' => 'Le prix du produit est obligatoire.',
            'prix.numeric' => 'Le prix doit être un nombre valide.',
            'prix.min' => 'Le prix doit être supérieur ou égal à :min.',

            'image_principale.image' => 'L’image principale doit être un fichier image valide.',
            'image_principale.mimes' => 'L’image principale doit être au format :values.',
            'image_principale.max' => 'L’image principale ne doit pas dépasser :max kilooctets.',

            'statut.required' => 'Le statut est obligatoire.',
            'statut.in' => 'Le statut doit être soit "actif" soit "épuisé".',

            'category_id.exists' => 'La catégorie sélectionnée est invalide.',

            'tags.array' => 'Les tags doivent être envoyés sous forme de tableau.',
            'tags.*.exists' => 'L’un des tags sélectionnés est invalide.',

            'is_variable.boolean' => 'Le champ "variations" doit être vrai ou faux.',
            'est_populaire.boolean' => 'Le champ "est populaire" doit être un booléen valide.',
            'pourcentage_reduction.numeric' => 'Le pourcentage de réduction doit être un nombre valide.',
            'pourcentage_reduction.min' => 'Le pourcentage de réduction ne peut pas être inférieur à :min.',
            'pourcentage_reduction.max' => 'Le pourcentage de réduction ne peut pas être supérieur à :max.',
        ];
    }

}
