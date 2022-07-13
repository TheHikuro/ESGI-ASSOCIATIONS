<?php

namespace App\Controller\Post;

use App\Entity\Post;
use App\Repository\PostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class AddComment extends AbstractController
{
    private $pr;

    public function __construct(PostRepository $pr)
    {
        $this->pr = $pr;
    }

    public function __invoke($id, Request $request)
    {
        $post = $request->attributes->get('data');
        $parentPost = $this->pr->findOneBy(['id' => $id]);

        if(!($post instanceof Post))
            throw new \RuntimeException('Expected post.');
        if(!($parentPost instanceof Post))
            throw new \RuntimeException('Expected post.');
        if($parentPost->getChildPosts()->contains($post))
            throw new \Error('The post is already a child of the parent post.');

        $post->setParentPost($parentPost);

        return $post;
    }
}