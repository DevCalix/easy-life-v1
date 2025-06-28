<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserProfilePhotoRequest extends FormRequest
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
            'photo_profil' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'photo_profil.required' => 'Veuillez sélectionner une image',
            'photo_profil.image' => 'Le fichier doit être une image valide',
            'photo_profil.mimes' => 'Formats acceptés: jpeg, png, jpg, gif, webp',
            'photo_profil.max' => 'L\'image ne doit pas dépasser 2Mo',
        ];
    }
}
