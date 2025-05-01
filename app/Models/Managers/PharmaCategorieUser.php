<?php

namespace App\Models\Managers;

use App\Models\PharmacieSante\StCategorie;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PharmaCategorieUser extends Model
{
    
    protected $fillable = [
        'user_id',
        'st_categories_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(StCategorie::class);
    }
}
