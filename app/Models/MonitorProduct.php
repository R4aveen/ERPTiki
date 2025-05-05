<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MonitorProduct extends Model
{
    protected $table = 'monitor_products';

    protected $fillable = [
        'nombre',
        'marca',
        'modelo',
        'serial_number',
        'tamano_pantalla',
        'resolucion',
        'tipo_panel',
        'vga',
        'hdmi',
        'dvi',
        'displayport',
        'altavoces',
        'estado',
        'revisado',
        'cliente_id',
        'provider_id',
        'categoria_id'
    ];

    protected $casts = [
        'vga' => 'boolean',
        'hdmi' => 'boolean',
        'dvi' => 'boolean',
        'displayport' => 'boolean',
        'altavoces' => 'boolean',
        'revisado' => 'boolean'
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'cliente_id');
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Provider::class);
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'categoria_id');
    }

    public function revisiones()
    {
        return $this->hasMany(Revision::class, 'producto_id');
    }
}