<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
   use HasFactory;

    protected $fillable = [
        'user_id',
        'numero',
        'adresse',
        'ville',
        'pays',
        'date_naissance',
        'genre',
        'bio',
        'photo_profil',
    ];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Accessor pour retourner l'URL complète de la photo de profil
    public function getPhotoProfilAttribute($value)
    {
       if (!$value) {
            return null;
        }

        // Si l'URL ne commence pas par "/storage/", l'ajouter
        if (!str_starts_with($value, '/storage/')) {
            return '/storage/' . $value;
        }

        return $value;
    }

    
}
