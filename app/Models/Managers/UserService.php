<?php

namespace App\Models\Managers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserService extends Model
{
    protected $fillable = [
        'user_id',
        'service_type',
        'service_id',
        'code_marchand',
        'role',
    ];

    // 🔁 Relation vers l'utilisateur
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // 🔁 Relation polymorphique vers le service réel (Restaurant, Pharmacie, etc.)
    public function service(): MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'service_type', 'service_id');
    }

    public function gestionnaires()
    {
        return $this->morphMany(UserService::class, 'service', 'service_type', 'service_id');
    }
}
