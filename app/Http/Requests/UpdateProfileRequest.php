<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
            'numero' => 'required|string|max:20',
            'adresse' => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:100',
            'pays' => 'nullable|string|max:100',
            'date_naissance' => 'nullable|date|before:today',
            'genre' => 'nullable|in:homme,femme,autre',
            'bio' => 'nullable|string|max:500',
            'photo_profil' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];

        // Pour la mise à jour, on rend la photo optionnelle
        if ($this->isMethod('patch') || $this->isMethod('put')) {
            $rules['photo_profil'] = ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'];
        }
    }

    public function messages(): array
    {
        return [
            'numero.required' => 'Le numéro de téléphone est obligatoire.',
            'numero.string' => 'Le numéro doit être une chaîne de caractères.',
            'numero.max' => 'Le numéro ne doit pas dépasser 20 caractères.',

            'adresse.max' => 'L\'adresse ne doit pas dépasser 255 caractères.',
            'ville.max' => 'La ville ne doit pas dépasser 100 caractères.',
            'pays.max' => 'Le pays ne doit pas dépasser 100 caractères.',

            'date_naissance.date' => 'La date de naissance doit être une date valide.',
            'date_naissance.before' => 'La date de naissance doit être dans le passé.',

            'genre.in' => 'Le genre doit être soit homme, femme ou autre.',

            'bio.max' => 'La biographie ne doit pas dépasser 500 caractères.',

            'photo_profil.image' => 'La photo doit être une image.',
            'photo_profil.mimes' => 'La photo doit être de type jpeg, png, jpg, gif ou webp.',
            'photo_profil.max' => 'La photo ne doit pas dépasser 2 Mo.',
        ];
    }
}
