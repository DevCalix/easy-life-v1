<?php

namespace App\Models\PharmacieSante;

use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StMedicament;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StPromotion extends Model
{
    protected $table = 'st_promotions';

    protected $fillable = [
        'st_medicament_id',
        'reduction',
        'date_debut',
        'date_fin',
    ];

    public function medicament(): BelongsTo
    {
        return $this->belongsTo(StMedicament::class, 'st_medicament_id');
    }
}
