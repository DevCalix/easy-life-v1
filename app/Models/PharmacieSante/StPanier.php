<?php

namespace App\Models\PharmacieSante;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StMedicament;
use App\Models\PharmacieSante\StVariationMedicament;

class StPanier extends Model
{
    protected $fillable = ['user_id', 'st_medicament_id', 'st_variation_medicament_id', 'quantite', 'prix_unitaire', 'total','ordonnance_requise','ordonnance_upload',];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function medicament()
    {
        return $this->belongsTo(StMedicament::class, 'st_medicament_id');
    }

    public function variation()
    {
        return $this->belongsTo(StVariationMedicament::class, 'st_variation_medicament_id');
    }
}
