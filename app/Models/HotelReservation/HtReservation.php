<?php

namespace App\Models\HotelReservation;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use App\Models\HotelReservation\HtHotel;
use App\Models\HotelReservation\HtChambre;

class HtReservation extends Model
{
    /**
     * Les champs qui peuvent être assignés en masse.
     *
     * @var array<string>
     */
    protected $fillable = [
        'ht_hotel_id', // Ajout de la clé étrangère vers ht_hotels
        'ht_chambre_id',
        'user_id',
        'date_arrivee',
        'date_depart',
        'nombre_personnes',
        'prix',
        'numero_piece',
        'piece_identite',
        'nom',
        'email',
        'telephone',
        'raison_sejour',
        'statut',
        'reservation_key',
    ];

    public function hotel()
    {
        return $this->belongsTo(HtHotel::class, 'ht_hotel_id');
    }
    // Relation avec la chambre
    public function chambre()
    {
        return $this->belongsTo(HtChambre::class, 'ht_chambre_id');
    }

    // Relation avec l'utilisateur
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Accessor pour formater le prix total.
     *
     * @param float $value
     * @return string
     */
    public function getPrixTotalAttribute($value): string
    {
        return number_format($value, 2, ',', ' ') . ' FCFA';
    }

    /**
     * Accessor pour formater la date d'arrivée.
     *
     * @param string $value
     * @return string
     */
    public function getDateArriveeAttribute($value): string
    {
        return Carbon::parse($value)->format('d/m/Y');
    }

    /**
     * Accessor pour formater la date de départ.
     *
     * @param string $value
     * @return string
     */
    public function getDateDepartAttribute($value): string
    {
        return Carbon::parse($value)->format('d/m/Y');
    }
}
