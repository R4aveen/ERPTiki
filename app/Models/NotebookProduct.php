<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotebookProduct extends Model
{
    protected $table = 'notebook_products';

    protected $fillable = [
        'nombre',
        'marca',
        'modelo',
        'linea',
        'serial_number',
        'procesador',
        'ram',
        'slot_ram',
        'tipo_ram',
        'hdd',
        'tec_hdd',
        'incluye_cargador',
        'estado_cargador',
        'vga',
        'hdmi',
        'usb2',
        'usb3',
        'ethernet',
        'wifi',
        'bluetooth',
        'webcam',
        'estado',
        'revisado',
        'cliente_id',
        'provider_id',
        'categoria_id'
    ];

    protected $casts = [
        'incluye_cargador' => 'boolean',
        'vga' => 'boolean',
        'hdmi' => 'boolean',
        'usb2' => 'boolean',
        'usb3' => 'boolean',
        'ethernet' => 'boolean',
        'wifi' => 'boolean',
        'bluetooth' => 'boolean',
        'webcam' => 'boolean',
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