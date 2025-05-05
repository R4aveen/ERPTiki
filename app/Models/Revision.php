<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Revision extends Model
{
    protected $table = 'revisiones';

    protected $fillable = [
        'producto_id',
        'tipo_equipo',
        'fecha_recepcion',
        'fecha_revision',
        'detalles',
        'observaciones',
        'revisado_por_usuario_id',
    ];

    protected $casts = [
        'detalles' => 'json',
        'fecha_recepcion' => 'date',
        'fecha_revision' => 'date',
    ];

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'producto_id');
    }

    public function revisadoPor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'revisado_por_usuario_id');
    }
}