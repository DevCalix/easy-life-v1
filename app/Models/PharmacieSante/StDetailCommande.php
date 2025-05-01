<?php

namespace App\Models\PharmacieSante;

use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StCommande;
use App\Models\PharmacieSante\StMedicament;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StDetailCommande extends Model
{
    // protected $table = 'st_detail_commandes';

    protected $fillable = [
        'st_commande_id',
        'st_medicament_id',
        'quantite',
        'prix',
    ];

    public function commande(): BelongsTo
    {
        return $this->belongsTo(StCommande::class, 'st_commande_id');
    }

    public function medicament(): BelongsTo
    {
        return $this->belongsTo(StMedicament::class, 'st_medicament_id');
    }
}
