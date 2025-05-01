<?php

namespace App\Models\PharmacieSante;

use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StMedicament;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'st_medicament_id',
        'st_pharmacie_id',
        'st_hopital_id',

    ];

    // Relation avec le médicament
    public function medicament()
    {
        return $this->belongsTo(StMedicament::class, 'st_medicament_id');
    }

    // Relation avec la pharmacie
    public function pharmacie()
    {
        return $this->belongsTo(StPharmacie::class, 'st_pharmacie_id');
    }
    // Relation avec la hopital
    public function hopital()
    {
        return $this->belongsTo(StHopital::class, 'st_hopital_id');
    }

    /**
     * Accessor pour formater l'URL de l'image.
     */
    public function getUrlAttribute($value)
    {
        if (!$value) {
            return null;
        }

        // Si l'URL ne commence pas par "/storage/", l'ajouter
        if (!str_starts_with($value, '/storage/')) {
            return '/storage/' . $value;
        }

        return $value;
    }
}
