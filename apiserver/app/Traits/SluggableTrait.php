<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait SluggableTrait
{
    /**
     * The "booted" method of the model.
     *
     * @return void
     *
     * @todo Brute force to check if the slug is unique or not is not a good way need to improve this
     */
    protected static function bootSluggableTrait()
    {
        static::creating(function ($model) {
            $model->slug = self::unique_slug($model);
        });
        static::updating(function ($model) {
            $model->slug = self::unique_slug($model);
        });
    }

    /**
     * Find unique Slug
     * @param $model
     * @return string
     */
    protected static function unique_slug($model)
    {
        $slug = Str::slug($model->name);
        $count = self::is_unique_slug($slug, $model);
        if ($count > 0) {
            $slug = $slug . '-' . $count;
        }

        return $slug;
    }

    /**
     * Recursive method find unique slug performing brute force
     * @param $slug
     * @param $model
     * @param $count
     * @return int|mixed
     */
    protected static function is_unique_slug($slug, $model, $count = 0)
    {
        $slug_count = self::where(function ($query) use ($slug, $model, $count) {
            if ($count > 0) {
                $query->where('slug', '=', $slug . '-' . $count);
            } else {
                $query->where('slug', '=', $slug);
            }
            if (!is_null($model->id)) {
                $query->whereNot('id', '=', $model->id);
            }
        })->count();

        if ($slug_count > 0) {
            $count = $count + 1;
            return self::is_unique_slug($slug, $model, $count);
        }
        return $count;
    }
}
