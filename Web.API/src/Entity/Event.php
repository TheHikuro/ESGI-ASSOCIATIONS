<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Controller\Event\ArchiveEventsController;
use App\Controller\Event\AddParticipantController;
use App\Controller\Event\RemoveParticipantController;
use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get:event', 'get:id']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get:event", 'get:id']]],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post:event"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "dateStart" => ["type" => "string"],
                                    "dateEnd" => ["type" => "string"],
                                    "description" => ["type" => "string"],
                                    "name" => ["type" => "string"],
                                    "association" => ["type" => "string"],
                                    "pointsToWin" => ["type" => "number"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "archiveEvents" => [
            "method" => "put",
            "path" => "events/archive_events",
            "controller" => ArchiveEventsController::class,
            "deserialize" => false,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [],
                        ],
                    ],
                ],
            ],
        ],
    ],
    itemOperations: [
        "get",
        "put" => [
            "denormalization_context" => ["groups" => ["item:put:event"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "dateStart" => ["type" => "string"],
                                    "dateEnd" => ["type" => "string"],
                                    "active" => ["type" => "boolean"],
                                    "description" => ["type" => "string"],
                                    "name" => ["type" => "string"],
                                    "pointsToWin" => ["type" => "number"],
                                    "closeJoin" => ["type" => "boolean"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "addParticipant" => [
            "method" => "put",
            "path" => "events/{id}/add_participant/{idParticipant}",
            "controller" => AddParticipantController::class,
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
        "removeParticipant" => [
            "method" => "put",
            "path" => "events/{id}/remove_participant/{idParticipant}",
            "controller" => RemoveParticipantController::class,
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
        "delete",
    ],
),
ApiFilter(
    OrderFilter::class,
    properties: ["createdAt", "updatedAt", "association.id", "dateStart", "dateEnd"]
),
ApiFilter(
    BooleanFilter::class,
    properties: ["active", "closeJoin", "archived"]
),
ApiFilter(
    SearchFilter::class,
    properties: ["name", "association.id", "association.owner.id", "id"]
)]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get:event", "item:get:event", 'get:id'])]
    #[SerializedName("id")]
    private $id;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:event", "item:get:event", "collection:post:event", "item:put:event"])]
    #[SerializedName("dateStart")]
    private $dateStart;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:event", "item:get:event", "collection:post:event", "item:put:event"])]
    #[SerializedName("dateEnd")]
    private $dateEnd;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get:event", "item:get:event", "item:put:event"])]
    #[SerializedName("active")]
    private $active;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get:event", "item:get:event", "item:put:event"])]
    #[SerializedName("closeJoin")]
    private $closeJoin;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get:event", "item:get:event"])]
    #[SerializedName("archived")]
    private $archived;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["collection:get:event", "item:get:event", "collection:post:event", "item:put:event"])]
    #[SerializedName("description")]
    private $description;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["collection:get:event", "item:get:event", "collection:post:event", "item:put:event"])]
    #[SerializedName("name")]
    private $name;

    #[ORM\ManyToOne(targetEntity: Association::class, inversedBy: 'event')]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:event", "item:get:event", "collection:post:event"])]
    #[SerializedName("association")]
    private $association;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["collection:get:event", "item:get:event"])]
    #[SerializedName("createdAt")]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:event", "item:get:event"])]
    #[SerializedName('updatedAt')]
    private $updatedAt;

    #[ORM\ManyToMany(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: true, onDelete: 'CASCADE')]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:event", "item:get:event"])]
    #[SerializedName('participants')]
    private $participants;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(["collection:get:event", "item:get:event", "collection:post:event", "item:put:event"])]
    #[SerializedName('pointsToWin')]
    private $pointsToWin;

    public function __construct()
    {
        $this->createdAt = new \DatetimeImmutable('now');
        $this->participants = new ArrayCollection();
        $this->active = false;
        $this->closeJoin = false;
        $this->archived = false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateStart(): ?\DateTimeImmutable
    {
        return $this->dateStart;
    }

    public function setDateStart(\DateTimeImmutable $dateStart): self
    {
        $this->dateStart = $dateStart;

        return $this;
    }

    public function getDateEnd(): ?\DateTimeImmutable
    {
        return $this->dateEnd;
    }

    public function setDateEnd(\DateTimeImmutable $dateEnd): self
    {
        $this->dateEnd = $dateEnd;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->active;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    public function isArchived(): ?bool
    {
        return $this->archived;
    }

    public function setArchived(bool $archived): self
    {
        $this->archived = $archived;

        return $this;
    }

    public function isCloseJoin(): ?bool
    {
        return $this->closeJoin;
    }

    public function setCloseJoin(bool $closeJoin): self
    {
        $this->closeJoin = $closeJoin;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getupdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(User $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
        }

        return $this;
    }

    public function removeParticipant(User $participant): self
    {
        $this->participants->removeElement($participant);

        return $this;
    }

    public function getPointsToWin(): ?float
    {
        return $this->pointsToWin;
    }

    public function setPointsToWin(?float $pointsToWin): self
    {
        $this->pointsToWin = $pointsToWin;

        return $this;
    }
}
