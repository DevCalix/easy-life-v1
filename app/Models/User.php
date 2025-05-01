<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Admin;
use App\Models\Managers\UserService;
use App\Models\PharmacieSante\StAbonneVip;
use App\Models\PharmacieSante\StCategorie;
use App\Models\PharmacieSante\StMedecin;
use App\Models\PharmacieSante\StRdvMedical;
use App\Models\Restaurant\CategorieRepas;
use App\Models\Supermarche\Categorie;
use App\Models\Supermarche\Store;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relation one-to-one avec StAbonneVip
    public function abonneVip()
    {
        return $this->hasOne(StAbonneVip::class);
    }

    public function medecin()
    {
        return $this->hasOne(StMedecin::class);
    }

    // Relation avec les rendez-vous médicaux
    public function rdvs()
    {
        return $this->hasMany(StRdvMedical::class);
    }

    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    public function isAdmin()
    {
        return $this->admin !== null;
    }

    public function services()
    {
        return $this->hasMany(UserService::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Categorie::class, 'sp_category_users');
    }
    public function categoriesRepas()
    {
        return $this->belongsToMany(CategorieRepas::class, 'restau_categorie_users');
    }
    public function stCategories()
    {
        return $this->belongsToMany(StCategorie::class, 'pharma_categorie_users', 'user_id', 'st_categories_id');
    }


}
