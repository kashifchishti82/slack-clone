<?php

namespace App\Models;

use App\Traits\SluggableTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasUuids, SluggableTrait;

    protected $fillable = ['name', 'description'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'workspace_user')->withPivot('role');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function channels()
    {
        return $this->hasMany(Channel::class);
    }
}
