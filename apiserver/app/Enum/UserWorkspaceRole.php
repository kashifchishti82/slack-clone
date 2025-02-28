<?php

namespace App\Enum;

enum UserWorkspaceRole
{
    case OWNER;
    case MEMBER;
    case ADMIN;

    public static function toArray(): array
    {
        $roles = [];
        foreach (self::cases() as $role) {
            $roles[] = $role->getRole();
        }
        return $roles;
    }

    public function getRole(): string
    {
        return match ($this) {
            self::OWNER => 'Owner',
            self::MEMBER => 'Member',
            self::ADMIN => 'Admin',
            default => null
        };
    }


}
