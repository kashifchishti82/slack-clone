<?php

namespace App\Repositories;

use App\Interfaces\IUserRepository;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserRepository implements IUserRepository
{
    public function login($email, $password)
    {
        $user = User::where('email', $email)->first();
        if (!$user) {
            return [
                "field" => "email",
                "message" => "User not found"
            ];
        }
        if (Hash::check($password, $user->password)) {
            return [
                'user' => $user,
                'token' => $user->createToken('API Token')->plainTextToken
            ];
        }
        return [
            "field" => "password",
            "message" => "Invalid username or password"
        ];
    }

    public function register($name, $email, $password, $confirm_password)
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        return [
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ];
    }
}
