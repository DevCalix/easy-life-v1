<?php

namespace App\Models\Restaurant;

use App\Models\User;
use Illuminate\Support\Str;
use App\Models\Restaurant\Restaurant;
use Illuminate\Database\Eloquent\Model;

class RestoReservation extends Model
{
    protected $fillable = [
        'restaurant_id',
        'user_id',
        'nom_client',
        'numero_telephone',
        'date_reservation',
        'heure_reservation',
        'nombre_personnes',
        'statut',
        'commentaire',
        'cle_reservation',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Génère une clé de réservation unique avant la création.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($reservation) {
            $reservation->cle_reservation = 'RESTO' . Str::upper(Str::random(8));
        });
    }

}
