<?php

namespace App\Models\HotelReservation;

use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HtHotelMeta extends Model
{
    protected $fillable = ['ht_hotel_id', 'cle', 'valeur'];

    public function hotel(): BelongsTo {
        return $this->belongsTo(HtHotel::class, 'ht_hotel_id');
    }

}
