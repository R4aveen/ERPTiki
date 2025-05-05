<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
    ];

    public function proveedores(): BelongsToMany
    {
        return $this->belongsToMany(Provider::class, 'client_provider')
                    ->withPivot(['fecha_inicio_relacion', 'contrato_id', 'notas'])
                    ->withTimestamps();
    }

    public function productos(): HasMany
    {
        return $this->hasMany(Product::class, 'cliente_id');
    }
}