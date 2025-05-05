<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Provider extends Model
{
    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
    ];

    public function clientes(): BelongsToMany
    {
        return $this->belongsToMany(Client::class, 'client_provider')
                    ->withPivot(['fecha_inicio_relacion', 'contrato_id', 'notas'])
                    ->withTimestamps();
    }

    public function productos(): HasMany
    {
        return $this->hasMany(Product::class, 'provider_id');
    }
}