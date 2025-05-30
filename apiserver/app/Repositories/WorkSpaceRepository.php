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

    public function getUserWorkSpaces(string $id)
    {
        $data = Workspace::join('workspace_user', 'workspace_user.workspace_id', '=', 'workspaces.id')->where(
            'workspace_user.user_id',
            '=',
            $id
        )->select('workspaces.*')->get();

        return $data;
    }

    public function joinWorkspace(string $workSpace_id, string $user_id)
    {
        $workspace = Workspace::find($workSpace_id);
        $workspace->users()->attach($user_id, ['role' => UserWorkspaceRole::USER->getRole()]);
        return $workspace;
    }


}
