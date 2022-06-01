<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(attributes: ["normalization_context" => ["groups" => ["user:read"]], "denormalization_context" => ["groups" => ["user:write"]]])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["user:read"])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(["user:read", "user:write"])]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["user:read", "user:write"])]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["user:read", "user:write"])]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["user:read", "user:write"])]
    private $lastname;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["user:read", "user:write"])]
    private $username;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["user:read", "user:write"])]
    private $avatar;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["user:read", "user:write"])]
    private $description;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["user:read"])]
    private $createdAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $confirmationToken;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $recoveryToken;

    #[ORM\ManyToOne(targetEntity: Section::class, inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["user:read", "user:write"])]
    private $section;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Association::class)]
    #[Groups(["user:read", "user:write"])]
    private $associations;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["user:read"])]
    private $isActivated;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["user:read"])]
    private $haveRecoverToken;

    #[SerializedName("password")]
    #[Groups(["user:write"])]
    private $plainPassword;

    public function __construct()
    {
        $this->associations = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable('now');
        $this->confirmationToken = rtrim(strtr(base64_encode(random_bytes(150)), '+/', '-_'), '=');
        $this->isActivated = false;
        $this->haveRecoverToken = false;
        $this->roles[] = 'ROLE_USER';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function setUsername(?string $username): self
    {
        $this->username = $username;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getConfirmationToken(): ?string
    {
        return $this->confirmationToken;
    }

    public function setConfirmationToken(?string $confirmationToken): self
    {
        $this->confirmationToken = $confirmationToken;

        return $this;
    }

    public function getRecoveryToken(): ?string
    {
        return $this->recoveryToken;
    }

    public function setRecoveryToken(?string $recoveryToken): self
    {
        $this->recoveryToken = $recoveryToken;

        return $this;
    }

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(?Section $section): self
    {
        $this->section = $section;

        return $this;
    }

    /**
     * @return Collection<int, Association>
     */
    public function getAssociations(): Collection
    {
        return $this->associations;
    }

    public function addAssociation(Association $association): self
    {
        if (!$this->associations->contains($association)) {
            $this->associations[] = $association;
            $association->setOwner($this);
        }

        return $this;
    }

    public function removeAssociation(Association $association): self
    {
        if ($this->associations->removeElement($association)) {
            // set the owning side to null (unless already changed)
            if ($association->getOwner() === $this) {
                $association->setOwner(null);
            }
        }

        return $this;
    }

    public function isIsActivated(): ?bool
    {
        return $this->isActivated;
    }

    public function setIsActivated(bool $isActivated): self
    {
        $this->isActivated = $isActivated;

        return $this;
    }

    public function isHaveRecoverToken(): ?bool
    {
        return $this->haveRecoverToken;
    }

    public function setHaveRecoverToken(bool $haveRecoverToken): self
    {
        $this->haveRecoverToken = $haveRecoverToken;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }
}
