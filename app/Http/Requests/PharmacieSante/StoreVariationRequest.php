<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class StoreVariationRequest extends FormRequest
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
            'variations' => 'required|array',
            'variations.*.type_variation' => 'required|string|max:255',
            'variations.*.valeur_variation' => 'required|string|max:255',
            'variations.*.prix' => 'required|numeric|min:0',
            'variations.*.image_variation' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'variations.required' => 'Vous devez ajouter au moins une variation.',
            'variations.*.type_variation.required' => 'Le type de variation est obligatoire.',
            'variations.*.valeur_variation.required' => 'La valeur de la variation est obligatoire.',
            'variations.*.prix.required' => 'Le prix est obligatoire.',
            'variations.*.prix.numeric' => 'Le prix doit être un nombre.',
            'variations.*.image_variation.image' => 'Le fichier doit être une image.',
            'variations.*.image_variation.mimes' => 'L\'image doit être au format jpeg, png, jpg, gif ou webp.',
            'variations.*.image_variation.max' => 'L\'image ne doit pas dépasser 2 Mo.',
        ];
    }
}
