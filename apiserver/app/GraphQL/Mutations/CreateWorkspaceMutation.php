<?php

namespace App\GraphQL\Mutations;

use App\Interfaces\IWorkSpaceRepository;

class CreateWorkspaceMutation
{
    public function __construct(private IWorkSpaceRepository $repository) {}
    public function __invoke($_, array $args)
    {
        return  $this->repository->createWorkspace($args['name'], $args['description']);
    }
}
