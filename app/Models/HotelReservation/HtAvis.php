<?php

namespace App\Models\HotelReservation;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;

class HtAvis extends Model
{
    protected $fillable = [
        'ht_hotel_id', 'user_id', 'note', 'commentaire'
    ];

    // Relation avec l'hôtel
    public function hotel()
    {
        return $this->belongsTo(HtHotel::class, 'ht_hotel_id');
    }

    // Relation avec l'utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
