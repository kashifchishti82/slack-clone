<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasUuids;
    protected $fillable = ['message'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function receivable()
    {
        return $this->morphTo();
    }
}
