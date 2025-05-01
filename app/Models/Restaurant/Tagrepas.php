<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Repas;
use Illuminate\Database\Eloquent\Model;

class Tagrepas extends Model
{
    protected $fillable = ['nom']; // Champs autorisés pour insertion/mise à jour

    public function repas()
    {
        return $this->belongsToMany(Repas::class, 'repas_tagrepas', 'tagrepas_id', 'repas_id');
    }
}
