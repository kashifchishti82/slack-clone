<?php

namespace App\GraphQL\Mutations;

use App\Repositories\WorkSpaceRepository;
use Illuminate\Support\Facades\Auth;

final class JoinWorkspaceMutation
{
    public function __construct(private WorkSpaceRepository $repository){}
    public function __invoke($_parameters = null)
    {
        $this->repository->joinWorkspace($_parameters['workspace_id'],  Auth::user()->id);
    }
}
