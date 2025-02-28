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
        Schema::create('workspace_user', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('workspace_id')->constrained("workspaces")->onDelete('cascade');
            $table->foreignUuid('user_id')->constrained("users")->onDelete('cascade');
            $table->enum('role', \App\Enum\UserWorkspaceRole::toArray())->default('member');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workspaces');
    }
};
