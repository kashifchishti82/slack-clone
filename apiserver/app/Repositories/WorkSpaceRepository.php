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
        $workSpace = new Workspace();
        $workSpace->name = $name;
        $workSpace->description = $description;
        $workSpace->user_id = auth()->user()->id;
        $workSpace->save();
        $workSpace->users()->attach(auth()->user(), ['role' => UserWorkspaceRole::ADMIN->getRole()]);

        return $workSpace;
    }

}
