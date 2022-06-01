<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SectionRepository::class)]
#[ApiResource(attributes: ["normalization_context" => ["groups" => ["section:read"]], "denormalization_context" => ["groups" => ["section:write"]]])]
class Section
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["section:read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["section:read", "section:write"])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'section', targetEntity: User::class, orphanRemoval: true)]
    #[Groups(["section:read"])]
    private $users;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["section:read"])]
    private $createdAt;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->createdAt = new \DatetimeImmutable('now');
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->setSection($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getSection() === $this) {
                $user->setSection(null);
            }
        }

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
