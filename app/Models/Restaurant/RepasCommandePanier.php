<?php

namespace App\Models\Restaurant;

use App\Models\Restaurant\Repas;
use Illuminate\Database\Eloquent\Model;
use App\Models\Restaurant\VariationRepas;

class RepasCommandePanier extends Model
{
    protected $fillable = [
        'user_id',
        'session_id',
        'repas_id',
        'variation_id', // Nouveau champ pour la variation
        'quantite',
    ];

   // Relation avec le modèle Repas
   public function repas()
   {
       return $this->belongsTo(Repas::class, 'repas_id');
   }

   // Relation avec le modèle VariationRepas
   public function variation()
   {
       return $this->belongsTo(VariationRepas::class, 'variation_id');
   }

   
}
