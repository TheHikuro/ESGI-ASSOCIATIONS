<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PostRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: PostRepository::class)]
#[ApiResource(
    mercure: true,
    normalizationContext: ['groups' => ['item:get']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get"]]],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post"]],
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
            "denormalization_context" => ["groups" => ["item:put"]],
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
class Post
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\ManyToOne(targetEntity: Association::class, inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    private $association;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'posts')]
    #[ORM\JoinColumn(nullable: false)]
    private $owner;

    #[ORM\Column(type: 'string', length: 2048)]
    private $content;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'childPosts')]
    private $parentPost;

    #[ORM\OneToMany(mappedBy: 'parentPost', targetEntity: self::class)]
    private $childPosts;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private $updatedAt;

    public function __construct()
    {
        $this->createdAt = new \DatetimeImmutable('now');
        $this->childPosts = new ArrayCollection();
    }

    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("id")]
    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("createdAt")]
    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("association")]
    public function getAssociation(): ?Association
    {
        return $this->association;
    }

    #[Groups(["collection:post"])]
    #[SerializedName("association")]
    public function setAssociation(?Association $association): self
    {
        $this->association = $association;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("owner")]
    public function getOwner(): ?User
    {
        return $this->owner;
    }

    #[Groups(["collection:post"])]
    #[SerializedName("owner")]
    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("content")]
    public function getContent(): ?string
    {
        return $this->content;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName("content")]
    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("parentPost")]
    public function getParentPost(): ?self
    {
        return $this->parentPost;
    }

    #[Groups(["collection:post"])]
    #[SerializedName("parentPost")]
    public function setParentPost(?self $parentPost): self
    {
        $parentPost->addChildPost($this);
        $this->parentPost = $parentPost;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("childPosts")]
    public function getChildPosts(): Collection
    {
        return $this->childPosts;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("updatedAt")]
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
