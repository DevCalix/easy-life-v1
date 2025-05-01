<?php

namespace App\Models\Managers;

use App\Models\Supermarche\Categorie;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SpCategoryUser extends Model
{
    protected $table = 'categorie_users';

    protected $fillable = [
        'user_id',
        'categorie_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }
}
