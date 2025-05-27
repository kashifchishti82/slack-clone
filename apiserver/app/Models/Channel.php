<?php

namespace App\Models;

use App\Traits\RabitmqChannelQueues;
use App\Traits\RabitmqWorkspaceExchange;
use App\Traits\SluggableTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    use HasUuids, SluggableTrait, RabitmqChannelQueues;

    protected $fillable = ['name', 'description', 'is_private'];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function messages()
    {
        return $this->morphMany(Chat::class, 'receivable');
    }

    public function members()
    {
        return $this->hasMany(Member::class);
    }
}
