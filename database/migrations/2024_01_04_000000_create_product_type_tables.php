<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Create notebook_products table
        Schema::create('notebook_products', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('marca', 100)->nullable();
            $table->string('modelo', 100)->nullable();
            $table->string('linea', 100)->nullable();
            $table->string('serial_number', 100)->nullable();
            $table->string('procesador')->nullable();
            $table->string('ram')->nullable();
            $table->string('slot_ram')->nullable();
            $table->string('tipo_ram')->nullable();
            $table->string('hdd')->nullable();
            $table->string('tec_hdd')->nullable();
            $table->boolean('incluye_cargador')->default(true);
            $table->enum('estado_cargador', ['Bueno', 'Regular', 'Malo'])->default('Bueno');
            $table->boolean('vga')->default(false);
            $table->boolean('hdmi')->default(false);
            $table->boolean('usb2')->default(false);
            $table->boolean('usb3')->default(false);
            $table->boolean('ethernet')->default(false);
            $table->boolean('wifi')->default(false);
            $table->boolean('bluetooth')->default(false);
            $table->boolean('webcam')->default(false);
            $table->enum('estado', ['nuevo', 'bueno', 'regular', 'malo'])->default('bueno');
            $table->boolean('revisado')->default(false);
            $table->foreignId('cliente_id')->nullable()->constrained('clients')->onDelete('set null');
            $table->foreignId('provider_id')->nullable()->constrained('providers')->onDelete('set null');
            $table->foreignId('categoria_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->timestamps();
        });

        // Create desktop_products table
        Schema::create('desktop_products', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('marca', 100)->nullable();
            $table->string('modelo', 100)->nullable();
            $table->string('serial_number', 100)->nullable();
            $table->string('procesador')->nullable();
            $table->string('ram')->nullable();
            $table->string('slot_ram')->nullable();
            $table->string('tipo_ram')->nullable();
            $table->string('hdd')->nullable();
            $table->string('tec_hdd')->nullable();
            $table->string('fuente_poder')->nullable();
            $table->enum('estado_fuente', ['Bueno', 'Regular', 'Malo'])->default('Bueno');
            $table->boolean('vga')->default(false);
            $table->boolean('hdmi')->default(false);
            $table->boolean('usb2')->default(false);
            $table->boolean('usb3')->default(false);
            $table->boolean('ethernet')->default(false);
            $table->boolean('wifi')->default(false);
            $table->boolean('bluetooth')->default(false);
            $table->boolean('unidad_optica')->default(false);
            $table->string('tipo_unidad_optica')->nullable();
            $table->enum('estado', ['nuevo', 'bueno', 'regular', 'malo'])->default('bueno');
            $table->boolean('revisado')->default(false);
            $table->foreignId('cliente_id')->nullable()->constrained('clients')->onDelete('set null');
            $table->foreignId('provider_id')->nullable()->constrained('providers')->onDelete('set null');
            $table->foreignId('categoria_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->timestamps();
        });

        // Create aio_products table
        Schema::create('aio_products', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('marca', 100)->nullable();
            $table->string('modelo', 100)->nullable();
            $table->string('serial_number', 100)->nullable();
            $table->string('procesador')->nullable();
            $table->string('ram')->nullable();
            $table->string('slot_ram')->nullable();
            $table->string('tipo_ram')->nullable();
            $table->string('hdd')->nullable();
            $table->string('tec_hdd')->nullable();
            $table->string('tamano_pantalla')->nullable();
            $table->string('resolucion')->nullable();
            $table->string('tipo_panel')->nullable();
            $table->boolean('vga')->default(false);
            $table->boolean('hdmi')->default(false);
            $table->boolean('usb2')->default(false);
            $table->boolean('usb3')->default(false);
            $table->boolean('ethernet')->default(false);
            $table->boolean('wifi')->default(false);
            $table->boolean('bluetooth')->default(false);
            $table->boolean('webcam')->default(false);
            $table->boolean('unidad_optica')->default(false);
            $table->string('tipo_unidad_optica')->nullable();
            $table->enum('estado', ['nuevo', 'bueno', 'regular', 'malo'])->default('bueno');
            $table->boolean('revisado')->default(false);
            $table->foreignId('cliente_id')->nullable()->constrained('clients')->onDelete('set null');
            $table->foreignId('provider_id')->nullable()->constrained('providers')->onDelete('set null');
            $table->foreignId('categoria_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->timestamps();
        });

        // Create monitor_products table
        Schema::create('monitor_products', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('marca', 100)->nullable();
            $table->string('modelo', 100)->nullable();
            $table->string('serial_number', 100)->nullable();
            $table->string('tamano_pantalla')->nullable();
            $table->string('resolucion')->nullable();
            $table->string('tipo_panel')->nullable();
            $table->boolean('vga')->default(false);
            $table->boolean('hdmi')->default(false);
            $table->boolean('dvi')->default(false);
            $table->boolean('displayport')->default(false);
            $table->boolean('altavoces')->default(false);
            $table->enum('estado', ['nuevo', 'bueno', 'regular', 'malo'])->default('bueno');
            $table->boolean('revisado')->default(false);
            $table->foreignId('cliente_id')->nullable()->constrained('clients')->onDelete('set null');
            $table->foreignId('provider_id')->nullable()->constrained('providers')->onDelete('set null');
            $table->foreignId('categoria_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('monitor_products');
        Schema::dropIfExists('aio_products');
        Schema::dropIfExists('desktop_products');
        Schema::dropIfExists('notebook_products');
    }
};