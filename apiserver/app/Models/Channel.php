<?php

namespace App\Models;

use App\Traits\SluggableTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasUuids, SluggableTrait;

    protected $fillable = ['name', 'description', 'is_private'];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}
