<?php

namespace App\Models\Supermarche;

use App\Models\Supermarche\Variation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VariationImage extends Model
{
    use HasFactory;

    protected $fillable = ['variation_id', 'url'];

    public function variation()
    {
        return $this->belongsTo(Variation::class);
    }

    /**
     * Accessor pour formater l'URL de l'image.
     *
     * @param string|null $value
     * @return string|null
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
