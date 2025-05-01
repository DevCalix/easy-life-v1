<?php

namespace App\Models\Managers;

use App\Models\Restaurant\CategorieRepas;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RestauCategorieUser extends Model
{

    protected $fillable = [
        'user_id',
        'categorie_repas_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(CategorieRepas::class);
    }
}
