<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_provider', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos')->cascadeOnDelete();
            $table->foreignId('provider_id')->constrained('providers')->cascadeOnDelete();
            $table->date('fecha_compra')->nullable();
            $table->decimal('precio_compra', 10, 2)->nullable();
            $table->integer('cantidad')->default(1);
            $table->string('numero_factura')->nullable();
            $table->text('notas')->nullable();
            $table->timestamps();
        });

        Schema::create('product_client', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos')->cascadeOnDelete();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->date('fecha_venta')->nullable();
            $table->decimal('precio_venta', 10, 2)->nullable();
            $table->integer('cantidad')->default(1);
            $table->string('numero_factura')->nullable();
            $table->text('notas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_provider');
        Schema::dropIfExists('product_client');
    }
};