<?php

namespace App\Http\Requests\Supermarche;

use Illuminate\Foundation\Http\FormRequest;

class VariationImageRequest extends FormRequest
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
            'type_variation' => 'required|string|max:255',
            'valeur_variation' => 'required|string|max:255',
            'prix_additionnel' => 'required|numeric|min:0',
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // Limite de 2MB par image
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'type_variation.required' => 'Le type de variation est obligatoire.',
            'type_variation.string' => 'Le type de variation doit être une chaîne de caractères.',
            'type_variation.max' => 'Le type de variation ne doit pas dépasser :max caractères.',

            'valeur_variation.required' => 'La valeur de variation est obligatoire.',
            'valeur_variation.string' => 'La valeur de variation doit être une chaîne de caractères.',
            'valeur_variation.max' => 'La valeur de variation ne doit pas dépasser :max caractères.',

            'prix_additionnel.required' => 'Le prix additionnel est obligatoire.',
            'prix_additionnel.numeric' => 'Le prix additionnel doit être un nombre.',
            'prix_additionnel.min' => 'Le prix additionnel ne peut pas être négatif.',

            'images.*.image' => 'Les fichiers doivent être des images.',
            'images.*.mimes' => 'Les images doivent être de type :values.',
            'images.*.max' => 'Chaque image ne doit pas dépasser :max kilo-octets.',
        ];
    }
}
