<?php

namespace App\Http\Requests\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class CategorieRepasRequest extends FormRequest
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
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048', // 2MB max
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom de la catégorie est obligatoire.',
            'nom.max' => 'Le nom de la catégorie ne doit pas dépasser 255 caractères.',
            'image.image' => 'Le fichier doit être une image.',
            'image.mimes' => 'Les formats autorisés sont : jpeg, jpg, png, webp.',
            'image.max' => 'L\'image ne doit pas dépasser 2 Mo.',
        ];
    }
}
