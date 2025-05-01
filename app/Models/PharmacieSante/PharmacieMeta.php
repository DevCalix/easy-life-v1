<?php

namespace App\Models\PharmacieSante;

use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StPharmacie;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PharmacieMeta extends Model
{
    protected $fillable = ['st_pharmacie_id', 'cle', 'valeur'];

    public function pharmacie(): BelongsTo {
        return $this->belongsTo(StPharmacie::class, 'st_pharmacie_id');
    }

}
