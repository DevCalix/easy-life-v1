<?php

namespace App\Http\Requests\PharmacieSante;

use Illuminate\Foundation\Http\FormRequest;

class StoreMedecinRequest extends FormRequest
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
            'type' => 'required|string|in:Généraliste,Spécialiste',
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
            'email' => 'required|email|unique:st_medecins,email',
            'carte' => 'nullable|string',
            'image_principale' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'note' => 'nullable|numeric|min:0|max:5',
            'nombre_d_annee_experience' => 'required|integer|min:0',
            'a_propos' => 'required|string|max:1000',

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
            'type.required' => 'Le type de médecin est obligatoire.',
            'type.in' => 'Le type de médecin doit être Généraliste ou Spécialiste.',
            'email.required' => "L'email est obligatoire.",
            'email.email' => "L'email n'est pas valide.",
            'email.unique' => "Cet email est déjà utilisé.",
            'image_principale.image' => "Le fichier doit être une image.",
            'image_principale.mimes' => "Formats acceptés : jpeg, png, jpg, gif.",
            'image_principale.max' => "L'image ne doit pas dépasser 2 Mo.",
            'note.numeric' => "La note doit être un nombre.",
            'note.min' => "La note ne peut pas être inférieure à 0.",
            'note.max' => "La note ne peut pas dépasser 5.",
            'nombre_d_annee_experience.required' => "Le nombre d'années d'expérience est obligatoire.",
            'nombre_d_annee_experience.integer' => "Le nombre d'années d'expérience doit être un nombre entier.",
            'nombre_d_annee_experience.min' => "Le nombre d'années d'expérience ne peut pas être négatif.",
            'a_propos.required' => "La description professionnelle est obligatoire.",
            'a_propos.max' => "La description professionnelle ne peut pas dépasser 1000 caractères.",
        ];
    }

}
