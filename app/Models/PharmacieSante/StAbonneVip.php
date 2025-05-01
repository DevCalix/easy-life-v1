<?php

namespace App\Models\PharmacieSante;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StAbonneVip extends Model
{
    protected $fillable = ['user_id', 'expire_at'];

    // Définir la relation avec le modèle User
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Méthode pour vérifier si l'abonnement est actif
    public function estActif(): bool
    {
        return $this->expire_at > Carbon::now();
    }
}
