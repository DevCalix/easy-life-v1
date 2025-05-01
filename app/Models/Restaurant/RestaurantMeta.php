<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RestaurantMeta extends Model
{
    protected $fillable = ['restaurant_id', 'cle', 'valeur'];

    public function restaurant(): BelongsTo {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }

}
