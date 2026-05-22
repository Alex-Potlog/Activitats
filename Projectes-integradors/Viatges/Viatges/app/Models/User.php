<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'telefon',
        'is_admin',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
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
            'is_admin' => 'boolean',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Experiències creades per l'usuari.
     */
    public function experiencies()
    {
        return $this->hasMany(Experiencia::class, 'id_usuari_creador');
    }

    /**
     * Comentaris escrits per l'usuari.
     */
    public function comentaris()
    {
        return $this->hasMany(Comentari::class, 'id_usuari');
    }

    /**
     * Likes donats per l'usuari
     */
    public function likes()
    {
        return $this->hasMany(Like::class, 'id_usuari');
    }

    /**
     * Reports enviats per l'usuari.
     */
    public function reports()
    {
        return $this->hasMany(Report::class, 'id_usuari');
    }
}
