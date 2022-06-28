<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\Association\DeleteAvatarController;
use App\Controller\Association\PostAvatarController;
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
                                    "owner" => ["type" => "string"],
                                    "name" => ["type" => "string"],
                                    "description" => ["type" => "string"],
                                    "events" => ["type" => "array", "items" => ["type" => "string"]],
                                    "members" => ["type" => "array", "items" => ["type" => "string"]],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        // "patch" => [
        //     "normalization_context" => ["groups" => ["item:patch"]],
        //     "openapi_context" => [
        //         "requestBody" => [
        //             "content" => [
        //                 "application/ld+json" => [
        //                     "schema" => [
        //                         "type" => "object",
        //                         "properties" => [
        //                             "events" => ["type" => "array", "items" => ["type" => "string"]],
        //                             "members" => ["type" => "array", "items" => ["type" => "string"]],
        //                         ],
        //                     ],
        //                 ],
        //             ],
        //         ],
        //     ],
        // ],
        "delete",
        "avatar" => [
            "method" => "post",
            "path" => "associations/{id}/avatar",
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
            "controller" => DeleteAvatarController::class,
            "deserialize" => false,
        ],
    ],
)]
class Association
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'associations')]
    #[ORM\JoinColumn(nullable: false)]
    private $owner;

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private $updatedAt;

    /**
     * @Vich\UploadableField(mapping="associations_images", fileNameProperty="avatarPath")
     */
    #[Type([File::class,null])]
    private $avatar;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $avatarPath;

    #[Type([string::class,null])]
    private $avatarUrl;

    #[ORM\Column(type: 'string', length: 255)]
    private $description;

    #[ORM\OneToMany(mappedBy: 'association', targetEntity: Event::class, orphanRemoval: true)]
    private $events;

    #[ORM\ManyToMany(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $members;

    public function __construct()
    {
        $this->events = new ArrayCollection();
        $this->members = new ArrayCollection();
        $this->createdAt = new \DatetimeImmutable('now');
    }

    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('id')]
    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('owner')]
    public function getOwner(): ?User
    {
        return $this->owner;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('owner')]
    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('name')]
    public function getName(): ?string
    {
        return $this->name;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('name')]
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('createdAt')]
    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('updatedAt')]
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('avatar')]
    public function getAvatarUrl()
    {
        return $this->avatarUrl;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('description')]
    public function getDescription(): ?string
    {
        return $this->description;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('description')]
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('events')]
    public function getEvents(): Collection
    {
        return $this->events;
    }

    // #[Groups(["item:put", "item:patch"])]
    // #[SerializedName('events')]
    // public function addEvent(Event $event): self
    // {
    //     if (!$this->events->contains($event)) {
    //         $this->events[] = $event;
    //         $event->setAssociation($this);
    //     }

    //     return $this;
    // }

    // #[Groups(["item:put", "item:patch"])]
    // #[SerializedName('events')]
    // public function removeEvent(Event $event): self
    // {
    //     if ($this->events->removeElement($event)) {
    //         // set the owning side to null (unless already changed)
    //         if ($event->getAssociation() === $this) {
    //             $event->setAssociation(null);
    //         }
    //     }

    //     return $this;
    // }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('members')]
    public function getMembers(): Collection
    {
        return $this->members;
    }

    // #[Groups(["item:put"])]
    // #[SerializedName('members')]
    // public function addMember(User $member): self
    // {
    //     if (!$this->members->contains($member)) {
    //         $this->members[] = $member;
    //     }

    //     return $this;
    // }

    // #[Groups(["item:put"])]
    // #[SerializedName('members')]
    // public function removeMember(User $member): self
    // {
    //     $this->members->removeElement($member);

    //     return $this;
    // }

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
}
