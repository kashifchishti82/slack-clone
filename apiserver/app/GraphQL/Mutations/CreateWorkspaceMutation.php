<?php

namespace App\GraphQL\Mutations;

use App\Interfaces\IWorkSpaceRepository;

class CreateWorkspaceMutation
{
    public function __construct(IWorkSpaceRepository $workSpaceRepository){
        $this->repository = $workSpaceRepository;
    }
    public function __invoke($_, array $args)
    {
        return  $this->repository->createWorkspace($args['name'], $args['description']);

    }
}
