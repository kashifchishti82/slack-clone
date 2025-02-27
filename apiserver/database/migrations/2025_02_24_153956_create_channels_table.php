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
        Schema::create('channels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('description')->nullable();
            $table->foreignIdFor(\App\Models\Workspace::class);
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->boolean('is_private')->default(false);
            $table->boolean('is_archived')->default(false);
            $table->boolean('is_general')->default(false);
            $table->boolean('is_read_only')->default(false);
            $table->boolean('is_default')->default(false);
            $table->boolean('is_member_join_notification_enabled')->default(false);
            $table->boolean('is_user_join_notification_enabled')->default(false);
            $table->boolean('is_user_leave_notification_enabled')->default(false);
            $table->boolean('is_user_typing_notification_enabled')->default(false);
            $table->boolean('is_group_typing_notification_enabled')->default(false);
            $table->boolean('is_group_archive_notification_enabled')->default(false);
            $table->boolean('is_group_unarchive_notification_enabled')->default(false);
            $table->boolean('is_group_rename_notification_enabled')->default(false);
            $table->boolean('is_channel_delete_notification_enabled')->default(false);
            $table->boolean('is_channel_archive_notification_enabled')->default(false);
            $table->boolean('is_channel_unarchive_notification_enabled')->default(false);
            $table->boolean('is_channel_rename_notification_enabled')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('channels');
    }
};
