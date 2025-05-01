<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMedecinRequest extends FormRequest
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
            'specialite' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'email' => 'required|email',
            'carte' => 'nullable|string',
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'note' => 'nullable|numeric|min:0|max:5',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire.',
            'specialite.required' => 'La spécialité est obligatoire.',
            'email.required' => "L'email est obligatoire.",
            'email.email' => "L'email n'est pas valide.",
            'image_principale.image' => "Le fichier doit être une image.",
            'image_principale.mimes' => "Formats acceptés : jpeg, png, jpg, gif.",
            'image_principale.max' => "L'image ne doit pas dépasser 2 Mo.",
            'note.numeric' => "La note doit être un nombre.",
            'note.min' => "La note ne peut pas être inférieure à 0.",
            'note.max' => "La note ne peut pas dépasser 5.",
        ];
    }
}
