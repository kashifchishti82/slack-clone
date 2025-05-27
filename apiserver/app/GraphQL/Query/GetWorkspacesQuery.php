<?php

namespace App\GraphQL\Query;

use App\Repositories\WorkSpaceRepository;
use Illuminate\Support\Facades\Auth;

final class GetWorkspacesQuery
{
    public function __construct(private WorkSpaceRepository $repository){

    }

    public function __invoke($_parameters = null){

        return $this->repository->getUserWorkSpaces(Auth::user()->id);
    }
}
