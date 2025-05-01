<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class StHopitalRequest extends FormRequest
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
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'carte' => 'nullable|string',
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'note' => 'nullable|numeric|min:0|max:9.99',
        ];
    }

    /**
     * Messages personnalisés pour les erreurs de validation.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom de l’hôpital est obligatoire.',
            'nom.max' => 'Le nom ne doit pas dépasser 255 caractères.',
            'adresse.required' => 'L’adresse est obligatoire.',
            'telephone.required' => 'Le numéro de téléphone est obligatoire.',
            'telephone.max' => 'Le numéro de téléphone ne doit pas dépasser 20 caractères.',
            'image_principale.image' => 'Le fichier doit être une image.',
            'image_principale.mimes' => 'L’image doit être au format JPEG, PNG, JPG ou GIF.',
            'image_principale.max' => 'L’image ne doit pas dépasser 2 Mo.',
            'note.numeric' => 'La note doit être un nombre.',
            'note.min' => 'La note ne peut pas être inférieure à 0.',
            'note.max' => 'La note ne peut pas dépasser 9.99.',
        ];
    }
}
