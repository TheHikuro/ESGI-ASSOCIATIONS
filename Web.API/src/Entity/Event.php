<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EventRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EventRepository::class)]
#[ApiResource(attributes: ["normalization_context" => ["groups" => ["event:read"]], "denormalization_context" => ["groups" => ["event:write"]]])]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["event:read"])]
    private $id;

    #[ORM\Column(type: 'dateinterval')]
    #[Groups(["event:read"])]
    private $dateInterval;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["event:read", "event:write"])]
    private $active;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["event:read", "event:write"])]
    private $description;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["event:read", "event:write"])]
    private $name;

    #[ORM\ManyToOne(targetEntity: Association::class, inversedBy: 'event')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["event:read"])]
    private $association;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["event:read"])]
    private $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime('now');
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
