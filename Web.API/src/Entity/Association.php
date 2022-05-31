<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AssociationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AssociationRepository::class)]
#[ApiResource(attributes: ["normalization_context" => ["groups" => ["association:read"]], "denormalization_context" => ["groups" => ["association:write"]]])]
class Association
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["association:read"])]
    private $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'associations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["association:read", "association:write"])]
    private $owner;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["association:read", "association:write"])]
    private $name;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["association:read"])]
    private $createdAt;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["association:read", "association:write"])]
    private $description;

    #[ORM\OneToMany(mappedBy: 'association', targetEntity: Event::class, orphanRemoval: true)]
    #[Groups(["association:read", "association:write"])]
    private $event;

    #[ORM\ManyToMany(targetEntity: User::class)]
    #[Groups(["association:read", "association:write"])]
    private $members;

    public function __construct()
    {
        $this->event = new ArrayCollection();
        $this->members = new ArrayCollection();
        $this->createdAt = new \DatetimeImmutable('now');
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
        $this->members[] = $owner;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Event>
     */
    public function getEvent(): Collection
    {
        return $this->event;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->event->contains($event)) {
            $this->event[] = $event;
            $event->setAssociation($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->event->removeElement($event)) {
            // set the owning side to null (unless already changed)
            if ($event->getAssociation() === $this) {
                $event->setAssociation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getMembers(): Collection
    {
        return $this->members;
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
}
