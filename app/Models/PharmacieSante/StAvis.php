<?php

namespace App\Models\PharmacieSante;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StPharmacie;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StAvis extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'st_pharmacie_id',
        'note',
        'commentaire',
    ];

    // Relation avec l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec la pharmacie
    public function pharmacie()
    {
        return $this->belongsTo(StPharmacie::class);
    }
}
