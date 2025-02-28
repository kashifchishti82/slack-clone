<?php

namespace App\Repositories;

use App\Enum\UserWorkspaceRole;
use App\Interfaces\IWorkSpaceRepository;
use App\Models\Workspace;
use Illuminate\Support\Facades\Validator;

class WorkSpaceRepository implements IWorkSpaceRepository
{

    public function createWorkSpace(string $name, string $description)
    {
        $validator = Validator::make(
            [
                'name' => $name,
                'description' => $description
            ],
            [
                'name' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
            ]
        );

        if ($validator->fails()) {
            return response()->graphql("Validation Error", [], $validator->errors());
        }
        $workSpace = new Workspace();
        $workSpace->name = $name;
        $workSpace->description = $description;
        $workSpace->user_id = auth()->user()->id;
        $workSpace->save();
        $workSpace->users()->attach(auth()->user(), ['role' => UserWorkspaceRole::ADMIN->getRole()]);

        return response()->graphql("Workspace created", $workSpace);
    }

}
