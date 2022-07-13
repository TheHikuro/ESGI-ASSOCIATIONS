<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
#[ApiResource(
    mercure: true,
    normalizationContext: ['groups' => ['item:get:comment', 'get:id']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get:comment", 'get:id']]],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post:comment"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "post" => ["type" => "string"],
                                    "owner" => ["type" => "string"],
                                    "content" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
    itemOperations: [
        "get",
        "put" => [
            "denormalization_context" => ["groups" => ["item:put:comment"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "content" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "delete",
    ],
)]
class Comment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get:comment", "item:get:comment", 'get:id'])]
    #[SerializedName('id')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["collection:get:comment", "item:get:comment", "collection:post:comment", "item:put:comment"])]
    #[SerializedName('content')]
    private $content;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["collection:get:comment", "item:get:comment"])]
    #[SerializedName('createdAt')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:comment", "item:get:comment"])]
    #[SerializedName('updatedAt')]
    private $updatedAt;

    #[ORM\ManyToOne(targetEntity: Post::class, inversedBy: 'comments')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:comment", "item:get:comment", "collection:post:comment"])]
    #[SerializedName('post')]
    private $post;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:comment", "item:get:comment", "collection:post:comment"])]
    #[SerializedName("owner")]
    private $owner;


    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(?Post $post): self
    {
        $this->post = $post;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
