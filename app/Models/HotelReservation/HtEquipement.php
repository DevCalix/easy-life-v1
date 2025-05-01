<?php

namespace App\Models\HotelReservation;

use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtChambre;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class HtEquipement extends Model
{
    protected $fillable = [
        'nom', // Nom de l'équipement (ex: Piscine, Wi-Fi, Climatisation)
    ];

    // Relation many-to-many avec les hôtels
    public function hotels(): BelongsToMany
    {
        return $this->belongsToMany(HtHotel::class, 'ht_hotel_equipement', 'ht_equipement_id', 'ht_hotel_id');
    }

    // Relation many-to-many avec les chambres
    public function chambres(): BelongsToMany
    {
        return $this->belongsToMany(HtChambre::class, 'ht_chambre_equipement', 'ht_equipement_id', 'ht_chambre_id');
    }
}
