<?php

namespace App\Models\Supermarche;

use App\Models\Supermarche\Produit;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ImageSecondaire extends Model
{
    use HasFactory;
    protected $fillable = ['produit_id', 'url'];

    public function produit()
    {
        return $this->belongsTo(Produit::class);
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

        

        return $value;
    }
}
