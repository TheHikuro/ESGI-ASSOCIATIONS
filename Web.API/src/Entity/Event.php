<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[ApiResource(
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
        "get" => ["normalization_context" => ["groups" => ["item:get"]]],
        "put" => [
            "normalization_context" => ["groups" => ["item:put"]],
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
    #[Groups(["collection:get", "item:get"])]
    private $id;

    #[ORM\Column(type: 'dateinterval')]
    #[Groups(["collection:get", "collection:post", "item:get", "item:put"])]
    private $dateInterval;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get", "item:get", "item:put"])]
    private $active;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["collection:get", "collection:post", "item:get", "item:put"])]
    private $description;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["collection:get", "collection:post", "item:get", "item:put"])]
    private $name;

    #[ORM\ManyToOne(targetEntity: Association::class, inversedBy: 'event')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["collection:get", "collection:post", "item:get"])]
    private $association;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["collection:get", "item:get"])]
    private $createdAt;

    public function __construct()
    {
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

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
