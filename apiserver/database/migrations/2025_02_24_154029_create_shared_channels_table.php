<?php

use App\Models\Workspace;
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
        Schema::create('shared_channels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(Workspace::class);
            $table->string('target_workspace_id');
            $table->string('origin_workspace_id');
            $table->string('name');
            $table->string('topic');
            $table->string('is_private');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shared_channels');
    }
};
