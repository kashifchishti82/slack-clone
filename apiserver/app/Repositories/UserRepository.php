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
            return response()->graphql('user not found', [], [
                [
                    "field" => "email",
                    "message" => "User not found"
                ]
            ]);
        }
        if (Hash::check($password, $user->password)) {
            return response()->graphql('Login successful', [
                'user' => $user,
                'token' => $user->createToken('API Token')->plainTextToken
            ]);
        }
        return response()->graphql('user not found', [], [
            [
                "field" => "password",
                "message" => "Invalid username or password"
            ]
        ]);
    }

    public function register($name, $email, $password, $confirm_password)
    {
        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password
        ], [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->graphql('Validation Error', [], $validator->errors());
        }
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        return response()->graphql('User created successfully', [
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }
}
