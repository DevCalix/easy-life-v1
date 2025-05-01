<?php

namespace App\Models\PharmacieSante;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\PharmacieSante\StMedecin;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class StRdvMedical extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'st_medecin_id',
        'date',
        'heure',
        'message',
        'statut',
    ];

    /**
     * Relation avec le modèle User (Patient).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation avec le modèle StMedecin (Médecin).
     */
    public function medecin()
    {
        return $this->belongsTo(StMedecin::class, 'st_medecin_id');
    }

    /**
     * Vérifier si le rendez-vous est confirmé.
     */
    public function isConfirmed()
    {
        return $this->statut === 'confirmé';
    }

    /**
     * Vérifier si le rendez-vous est annulé.
     */
    public function isCancelled()
    {
        return $this->statut === 'annulé';
    }

    /**
     * Vérifier si le rendez-vous est en attente.
     */
    public function isPending()
    {
        return $this->statut === 'en_attente';
    }
}
