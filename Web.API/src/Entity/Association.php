<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AssociationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: AssociationRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get"]]],
        "post" => [
            "normalization_context" => ["groups" => ["collection:post"]],
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
            "normalization_context" => ["groups" => ["item:put"]],
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
}
