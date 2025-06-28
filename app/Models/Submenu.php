<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submenu extends Model
{
    protected $fillable = [
        'title',
        'url',
        'is_active',
    ];

    public function getFormattedUrlAttribute()
{
    $url = trim($this->url);

    // Si l'URL est vide
    if (empty($url)) {
        return '/';
    }

    // Cas 1: URL déjà complète (http://, https://, ou //)
    if (preg_match('/^(https?:)?\/\//i', $url)) {
        // Si c'est un protocole relatif (commence par //)
        if (strpos($url, '//') === 0) {
            return 'https:' . $url;
        }
        return $url;
    }

    // Cas 2: Contient un point mais pas au début (ex: example.com)
    // On exclut les extensions de fichier comme .jpg, .pdf, etc.
    if (preg_match('/^[^\/\.]+\.[^\/]{2,}/', $url)) {
        return 'https://' . ltrim($url, '/');
    }

    // Cas 3: Lien interne (commence par / ou chemin relatif)
    return '/' . ltrim($url, '/');
}
}
