<?php

namespace App\Models\Global;

use Illuminate\Database\Eloquent\Model;

class Popup extends Model
{
    protected $fillable = [
        'title',
        'message',
        'cover_popup',
        'delay',
        'is_active',
        'redirect_url',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Accessor pour formater l'URL de l'image.
     *
     * @param string|null $value
     * @return string|null
     */
    public function getCoverPopupAttribute($value)
    {
        if (!$value) {
            return null;
        }

        // Si l'URL ne commence pas par "/storage/", l'ajouter
        if (!str_starts_with($value, '/storage/')) {
            return '/storage/' . $value;
        }

        return $value;
    }
}
