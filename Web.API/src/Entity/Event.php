<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get:event']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get:event"]]],
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
                                    "dateInterval" => ["type" => "string"],
                                    "description" => ["type" => "string"],
                                    "name" => ["type" => "string"],
                                    "association" => ["type" => "string"],
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
            "denormalization_context" => ["groups" => ["item:put:event"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "dateInterval" => ["type" => "string"],
                                    "active" => ["type" => "boolean"],
                                    "description" => ["type" => "string"],
                                    "name" => ["type" => "string"],
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
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get:event", "item:get:event"])]
    #[SerializedName("id")]
    private $id;

    #[ORM\Column(type: 'dateinterval', nullable: true)]
    #[Groups(["collection:get:event", "item:get:event", "collection:post:event", "item:put:event"])]
    #[SerializedName("dateInterval")]
    private $dateInterval;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get:event", "item:get:event", "item:put:event"])]
    #[SerializedName("active")]
    private $active;

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

    public function __construct()
    {
        $this->active = false;
        $this->createdAt = new \DatetimeImmutable('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateInterval(): ?\DateInterval
    {
        return $this->dateInterval;
    }

    public function setDateInterval(\DateInterval $dateInterval): self
    {
        $this->dateInterval = $dateInterval;

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
}
