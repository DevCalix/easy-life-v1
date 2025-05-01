<?php

namespace App\Models\PharmacieSante;

use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StPharmacie;
use App\Models\PharmacieSante\StMedicament;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StStock extends Model
{
    protected $table = 'st_stocks';

    protected $fillable = [
        'st_pharmacie_id',
        'st_medicament_id',
        'quantite',
    ];

    public function pharmacie(): BelongsTo
    {
        return $this->belongsTo(StPharmacie::class, 'st_pharmacie_id');
    }

    public function medicament(): BelongsTo
    {
        return $this->belongsTo(StMedicament::class, 'st_medicament_id');
    }
}
