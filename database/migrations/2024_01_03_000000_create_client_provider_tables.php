<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Update clients table structure
        Schema::table('clients', function (Blueprint $table) {
            $table->renameColumn('name', 'nombre');
            $table->renameColumn('address', 'direccion');
            $table->renameColumn('phone', 'telefono');
        });

        // Rename suppliers table to providers and update structure
        Schema::rename('suppliers', 'providers');
        Schema::table('providers', function (Blueprint $table) {
            $table->renameColumn('name', 'nombre');
            $table->renameColumn('address', 'direccion');
            $table->renameColumn('phone', 'telefono');
        });

        // Update categories table structure
        Schema::table('categories', function (Blueprint $table) {
            $table->renameColumn('name', 'nombre');
            $table->renameColumn('description', 'descripcion');
        });

        // Create client_provider pivot table
        Schema::create('client_provider', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('provider_id')->constrained()->onDelete('cascade');
            $table->date('fecha_inicio_relacion')->nullable();
            $table->unsignedBigInteger('contrato_id')->nullable();
            $table->text('notas')->nullable();
            $table->timestamps();
        });

        // Update products table to match productos requirements
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('name', 'nombre');
            $table->enum('tipo', ['woocommerce', 'bodega'])->after('nombre');
            $table->foreignId('cliente_id')->nullable()->constrained('clients')->onDelete('set null')->after('tipo');
            $table->foreignId('provider_id')->nullable()->constrained('providers')->onDelete('set null')->after('cliente_id');
            $table->string('marca', 100)->nullable()->after('provider_id');
            $table->string('modelo', 100)->nullable()->after('marca');
            $table->string('serial_number', 100)->nullable()->after('modelo');
            $table->enum('estado', ['nuevo', 'bueno', 'regular', 'malo'])->default('bueno')->after('serial_number');
            $table->boolean('revisado')->default(false)->after('estado');
            $table->renameColumn('category_id', 'categoria_id');
        });

        // Create revisiones table
        Schema::create('revisiones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('products')->onDelete('cascade');
            $table->enum('tipo_equipo', ['notebook', 'desktop', 'aio', 'monitor']);
            $table->date('fecha_recepcion');
            $table->date('fecha_revision');
            $table->json('detalles');
            $table->text('observaciones')->nullable();
            $table->foreignId('revisado_por_usuario_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('revisiones');
        
        // Revert products table changes
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('nombre', 'name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->integer('min_stock')->default(0);
            $table->integer('max_stock')->default(0);
            $table->dropColumn(['tipo', 'cliente_id', 'provider_id', 'marca', 'modelo', 'serial_number', 'estado', 'revisado']);
            $table->renameColumn('categoria_id', 'category_id');
        });

        Schema::dropIfExists('client_provider');

        // Revert categories table changes
        Schema::table('categories', function (Blueprint $table) {
            $table->renameColumn('nombre', 'name');
            $table->renameColumn('descripcion', 'description');
        });

        // Revert providers table changes and rename back to suppliers
        Schema::table('providers', function (Blueprint $table) {
            $table->renameColumn('nombre', 'name');
            $table->dropColumn(['direccion', 'telefono']);
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('tax_id')->nullable();
        });
        Schema::rename('providers', 'suppliers');

        // Revert clients table changes
        Schema::table('clients', function (Blueprint $table) {
            $table->renameColumn('nombre', 'name');
            $table->dropColumn(['direccion', 'telefono']);
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('tax_id')->nullable();
        });
    }
};