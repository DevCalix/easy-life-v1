<?php

namespace App\Models\Supermarche;

use App\Models\Supermarche\Store;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupermarcheMeta extends Model
{
    protected $fillable = ['store_id', 'cle', 'valeur'];

    public function hotel(): BelongsTo {
        return $this->belongsTo(Store::class, 'store_id');
    }
}
