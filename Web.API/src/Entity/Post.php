<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: PostRepository::class)]
#[ApiResource(
    mercure: true,
    normalizationContext: ['groups' => ['item:get:post', 'get:id']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get:post", 'get:id']]],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post:post"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "association" => ["type" => "string"],
                                    "owner" => ["type" => "string"],
                                    "content" => ["type" => "string"],
                                    "parentPost" => ["type" => "string"],
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
            "denormalization_context" => ["groups" => ["item:put:post"]],
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
),
ApiFilter(
    ExistsFilter::class,
    properties: ["parentPost", "childPosts"]
),
ApiFilter(
    OrderFilter::class,
    properties: ['createdAt']
)]
class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get:post", "item:get:post", 'get:id'])]
    #[SerializedName("id")]
    private $id;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["collection:get:post", "item:get:post"])]
    #[SerializedName("createdAt")]
    private $createdAt;

    #[ORM\ManyToOne(targetEntity: Association::class, inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:post", "item:get:post", "collection:post:post"])]
    #[SerializedName("association")]
    private $association;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:post", "item:get:post", "collection:post:post"])]
    #[SerializedName("owner")]
    private $owner;

    #[ORM\Column(type: 'string', length: 2048)]
    #[Groups(["collection:get:post", "item:get:post", "collection:post:post", "item:put:post"])]
    #[SerializedName("content")]
    private $content;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'childPosts')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:post", "item:get:post", "collection:post:post"])]
    #[SerializedName("parentPost")]
    private $parentPost;

    #[ORM\OneToMany(mappedBy: 'parentPost', targetEntity: self::class)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:post", "item:get:post"])]
    #[SerializedName("childPosts")]
    private $childPosts;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:post", "item:get:post"])]
    #[SerializedName("updatedAt")]
    private $updatedAt;

    public function __construct()
    {
        $this->createdAt = new \DatetimeImmutable('now');
        $this->childPosts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getAssociation(): ?Association
    {
        return $this->association;
    }

    public function setAssociation(?Association $association): self
    {
        $this->association = $association;

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

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getParentPost(): ?self
    {
        return $this->parentPost;
    }

    public function setParentPost(?self $parentPost): self
    {
        if($parentPost !== null)
            $parentPost->addChildPost($this);
        $this->parentPost = $parentPost;

        return $this;
    }

    public function getChildPosts(): Collection
    {
        return $this->childPosts;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function addChildPost(self $childPost): self
    {
        if (!$this->childPosts->contains($childPost)) {
            $this->childPosts[] = $childPost;
        }

        return $this;
    }

    public function removeChildPost(self $childPost): self
    {
        if ($this->childPosts->removeElement($childPost)) {
            // set the owning side to null (unless already changed)
            if ($childPost->getParentPost() === $this) {
                $childPost->setParentPost(null);
            }
        }

        return $this;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
