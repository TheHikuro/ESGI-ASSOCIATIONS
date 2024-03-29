<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\Association\AddMemberController;
use App\Controller\Association\DeleteAvatarController;
use App\Controller\Association\PostAvatarController;
use App\Controller\Association\RemoveMemberController;
use App\Controller\Association\AddAssociationController;
use App\Controller\Association\ExtractPresencesController;
use App\Repository\AssociationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints\Type;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @Vich\Uploadable()
 */
#[ORM\Entity(repositoryClass: AssociationRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get:association', 'get:id']],
    collectionOperations: [
        "get" => [
            "normalization_context" => ["groups" => ["collection:get:association", 'get:id']],
            "security" => "user.getIsBanned() == false",
        ],
        "addAssociation" => [
            "method" => "post",
            "denormalization_context" => ["groups" => ["collection:post:association"]],
            "path" => "associations",
            "security" => "(is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER')) and user.isActivated() == true and user.getIsBanned() == false",
            "controller" => AddAssociationController::class,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "owner" => ["type" => "string"],
                                    "name" => ["type" => "string"],
                                    "description" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "extractPrecences" => [
            "method" => "post",
            "path" => "associations/extract_presences",
            "security" => "is_granted('ROLE_ADMIN') and user.isActivated() == true and user.getIsBanned() == false",
            "controller" => ExtractPresencesController::class,
            "deserialize" => false,
            "defaults" => [
                "_api_receive" => false
            ],
            "openapi_context" => [
                "requestHeaders" => [
                    "Access-Control-Allow-Origin" => ["*"],
                ],
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "format" => ["type" => "string", "enum" => ["application/pdf", "text/csv", "application/json"]],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
    itemOperations: [
        "get" => ["security" => "user.isActivated() == true and user.getIsBanned() == false"],
        "put" => [
            "denormalization_context" => ["groups" => ["item:put:association"]],
            "security" => "(is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user) and user.isActivated() == true and user.getIsBanned() == false",
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "owner" => ["type" => "string"],
                                    "name" => ["type" => "string"],
                                    "description" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "addMember" => [
            "method" => "put",
            "path" => "associations/{id}/add_member/{idMember}",
            "security" => "is_granted('ROLE_USER') and user.isActivated() == true and user.getIsBanned() == false",
            "controller" => AddMemberController::class,
            "deserialize" => false,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => []
                        ]
                    ],
                ],
            ],
        ],
        "removeMember" => [
            "method" => "put",
            "path" => "associations/{id}/remove_member/{idMember}",
            "security" => "(is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user or object.members.contains(user)) and user.isActivated() == true and user.getIsBanned() == false",
            "controller" => RemoveMemberController::class,
            "deserialize" => false,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => []
                        ]
                    ],
                ],
            ],
        ],
        "delete" => ["security" => "(is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user) and user.isActivated() == true and user.getIsBanned() == false"],
        "avatar" => [
            "method" => "post",
            "path" => "associations/{id}/avatar",
            "security" => "(is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user) and user.isActivated() == true and user.getIsBanned() == false",
            "controller" => PostAvatarController::class,
            "deserialize" => false,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "multipart/form-data" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "avatar" => [
                                        "type" => "string",
                                        "format" => "binary"
                                    ]
                                ]
                            ]
                        ]
                    ],
                ],
            ],
        ],
        "deleteAvatar" => [
            "method" => "put",
            "path" => "associations/{id}/avatar",
            "security" => "(is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user) and user.isActivated() == true and user.getIsBanned() == false",
            "controller" => DeleteAvatarController::class,
            "deserialize" => false,
        ],
    ],
),
ApiFilter(
    SearchFilter::class,
    properties: ["id", "slug", "owner.id"],
)]
class Association
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get:association", "item:get:association", 'get:id'])]
    #[SerializedName('id')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'associations')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:association", "item:get:association", "collection:post:association", "item:put:association", "item:get:user"])]
    #[SerializedName('owner')]
    private $owner;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["collection:get:association", "item:get:association", "collection:post:association", "item:put:association", "item:get:user",  "collection:get:post", "item:get:post"])]
    #[SerializedName('name')]
    private $name;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["collection:get:association", "item:get:association"])]
    #[SerializedName('createdAt')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:association", "item:get:association"])]
    #[SerializedName('updatedAt')]
    private $updatedAt;

    /**
     * @Vich\UploadableField(mapping="associations_images", fileNameProperty="avatarPath")
     */
    #[Type([File::class, null])]
    private $avatar;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $avatarPath;

    #[Type([string::class, null])]
    #[Groups(["collection:get:association", "item:get:association"])]
    #[SerializedName('avatar')]
    private $avatarUrl;

    #[ORM\Column(type: 'string', length: 2048)]
    #[Groups(["collection:get:association", "item:get:association", "collection:post:association", "item:put:association"])]
    #[SerializedName('description')]
    private $description;

    #[ORM\OneToMany(mappedBy: 'association', targetEntity: Event::class, orphanRemoval: true)]
    #[ApiSubresource(maxDepth: 1)]
    #[ApiResource(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user or object.members.contains(user)")]
    #[Groups(["collection:get:association", "item:get:association"])]
    #[SerializedName('events')]
    private $events;

    #[ORM\ManyToMany(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    #[ApiSubresource(maxDepth: 1)]
    #[ApiResource(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user or object.members.contains(user)")]
    #[Groups(["collection:get:association", "item:get:association"])]
    #[SerializedName('members')]
    private $members;

    #[ORM\OneToMany(mappedBy: 'association', targetEntity: Post::class, orphanRemoval: true)]
    #[ApiSubresource(maxDepth: 1)]
    #[ApiResource(security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_ASSOS_MANAGER') and object.owner == user or object.members.contains(user)")]
    #[Groups(["collection:get:association", "item:get:association"])]
    #[SerializedName('posts')]
    private $posts;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(["collection:get:association", "item:get:association", 'get:id'])]
    #[SerializedName('slug')]
    private $slug;

    public function __construct()
    {
        $this->events = new ArrayCollection();
        $this->members = new ArrayCollection();
        $this->createdAt = new \DatetimeImmutable('now');
        $this->posts = new ArrayCollection();
        $this->slug = strtolower(str_replace(' ', '-', $this->name));
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        $this->slug = strtolower(str_replace(' ', '-', $this->name));

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function getAvatarUrl()
    {
        return $this->avatarUrl;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setAssociation($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getAssociation() === $this) {
                $event->setAssociation(null);
            }
        }

        return $this;
    }

    public function addMember(User $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members[] = $member;
        }

        return $this;
    }

    public function removeMember(User $member): self
    {
        $this->members->removeElement($member);

        return $this;
    }

    public function getAvatar()
    {
        return $this->avatar;
    }

    public function setAvatar($avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getAvatarPath()
    {
        return $this->avatarPath;
    }

    public function setAvatarPath($avatarPath): self
    {
        $this->avatarPath = $avatarPath;

        return $this;
    }

    public function setAvatarUrl($avatarUrl): self
    {
        $this->avatarUrl = $avatarUrl;

        return $this;
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setAssociation($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getAssociation() === $this) {
                $post->setAssociation(null);
            }
        }

        return $this;
    }
}
