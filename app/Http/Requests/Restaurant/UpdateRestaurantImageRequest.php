<?php

namespace App\Http\Requests\Restaurant;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRestaurantImageRequest extends FormRequest
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
            'photo_restaurant' => 'required|image|mimes:jpeg,jpg,png,webp|max:2048', // 2MB max
        ];
    }

    /**
     * Messages personnalisés pour les erreurs de validation.
     */
    public function messages(): array
    {
        return [
            'photo_restaurant.required' => 'Une image est obligatoire.',
            'photo_restaurant.image' => 'Le fichier doit être une image.',
            'photo_restaurant.mimes' => 'Les formats autorisés sont : jpeg, jpg, png, webp.',
            'photo_restaurant.max' => 'L\'image ne doit pas dépasser 2 Mo.',
        ];
    }
}
