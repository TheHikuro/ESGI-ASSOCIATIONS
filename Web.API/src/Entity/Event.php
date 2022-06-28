<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: EventRepository::class)]
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
            "denormalization_context" => ["groups" => ["item:put"]],
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
    private $id;

    #[ORM\Column(type: 'dateinterval')]
    private $dateInterval;

    #[ORM\Column(type: 'boolean')]
    private $active;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $description;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $name;

    #[ORM\ManyToOne(targetEntity: Association::class, inversedBy: 'event')]
    #[ORM\JoinColumn(nullable: false)]
    private $association;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private $updatedAt;

    public function __construct()
    {
        $this->createdAt = new \DatetimeImmutable('now');
    }

    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("id")]
    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("dateInterval")]
    public function getDateInterval(): ?\DateInterval
    {
        return $this->dateInterval;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName("dateInterval")]
    public function setDateInterval(\DateInterval $dateInterval): self
    {
        $this->dateInterval = $dateInterval;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("active")]
    public function isActive(): ?bool
    {
        return $this->active;
    }

    #[Groups(["item:put"])]
    #[SerializedName("active")]
    public function setActive(bool $active): self
    {
        $this->active = $active;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("description")]
    public function getDescription(): ?string
    {
        return $this->description;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName("description")]
    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName("name")]
    public function getName(): ?string
    {
        return $this->name;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName("name")]
    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
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
    #[SerializedName("createdAt")]
    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('updatedAt')]
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
