<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Controller\User\BanController;
use App\Controller\User\ConfirmationEmailController;
use App\Controller\User\DeleteAvatarController;
use App\Controller\User\GetBannedUsersController;
use App\Controller\User\PostAvatarController;
use App\Controller\User\SendGLobalEmailController;
use App\Controller\User\UnBanController;
use App\Controller\User\ValidateAccountController;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints\Type;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @Vich\Uploadable()
 */
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get:user', 'get:id']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get:user", 'get:id']]],
        "getBannedUsers" => [
            "method" => "get",
            "path" => "users/banned",
            "controller" => GetBannedUsersController::class,
            "deserialize" => false,
        ],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post:user"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => ["email", "firstName", "lastName", "section", "password"],
                                "properties" => [
                                    "email" => ["type" => "string"],
                                    "firstname" => ["type" => "string"],
                                    "lastname" => ["type" => "string"],
                                    "username" => ["type" => "string"],
                                    "section" => ["type" => "string"],
                                    "password" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "send_email" => [
            "method" => "post",
            "path" => "users/send_global_email",
            "output" => false,
            "defaults" => [
                "_api_receive" => false
            ],
            "controller" => SendGLobalEmailController::class,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "subject" => ["type" => "string"],
                                    "body" => ["type" => "string"],
                                ],
                            ]
                        ]
                    ],
                ],
            ],   
        ]
    ],
    itemOperations: [
        "get",
        "put" => [
            "denormalization_context" => ["groups" => ["item:put:user"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "email" => ["type" => "string"],
                                    "roles" => ["type" => "string"],
                                    "firstname" => ["type" => "string"],
                                    "lastname" => ["type" => "string"],
                                    "username" => ["type" => "string"],
                                    "description" => ["type" => "string"],
                                    "section" => ["type" => "string"],
                                    "associations" => ["type" => "array", "items" => ["type" => "string"]],
                                    "password" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "delete",
        "ban" => [
            "method" => "put",
            "path" => "users/{id}/ban",
            "controller" => BanController::class,
            "deserialize" => false,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "reason" => ["type" => "string"],
                                    "notify" => ["type" => "boolean"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],   
        ],
        "unBan" => [
            "method" => "put",
            "path" => "users/{id}/unban",
            "controller" => UnBanController::class,
            "deserialize" => false,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "notify" => ["type" => "boolean"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],   
        ],
        "avatar" => [
            "method" => "post",
            "path" => "users/{id}/avatar",
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
            "path" => "users/{id}/avatar",
            "controller" => DeleteAvatarController::class,
            "deserialize" => false,
        ],
        "send_confirmation_email" => [
            "method" => "post",
            "path" => "users/{id}/send_confirmation_email",
            "output" => false,
            "defaults" => [
                "_api_receive" => false
            ],
            "controller" => ConfirmationEmailController::class,
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
        "validate_account" => [
            "method" => "post",
            "path" => "users/{id}/validate_account",
            "output" => false,
            "defaults" => [
                "_api_receive" => false
            ],
            "controller" => ValidateAccountController::class,
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "confirmationCode" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get:user", "item:get:user", 'get:id'])]
    #[SerializedName('id')]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(["collection:get:user", "item:get:user", "collection:post:user", "item:put:user"])]
    #[SerializedName('email')]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups(["collection:get:user", "item:get:user", "item:put:user"])]
    #[SerializedName('roles')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["collection:get:user", "item:get:user", "collection:post:user", "item:put:user"])]
    #[SerializedName('firstname')]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["collection:get:user", "item:get:user", "collection:post:user", "item:put:user"])]
    #[SerializedName('lastname')]
    private $lastname;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["collection:get:user", "item:get:user", "collection:post:user", "item:put:user"])]
    #[SerializedName('username')]
    private $username;

    /**
     * @Vich\UploadableField(mapping="users_images", fileNameProperty="avatarPath")
     */
    #[Type([File::class,null])]
    private $avatar;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $avatarPath;

    #[Type([string::class,null])]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('avatar')]
    private $avatarUrl;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["collection:get:user", "item:get:user", "item:put:user"])]
    #[SerializedName('description')]
    private $description;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('createdAt')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('updatedAt')]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $confirmationCode;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $recoveryToken;

    #[ORM\ManyToOne(targetEntity: Section::class, inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:user", "item:get:user", "collection:post:user", "item:put:user"])]
    #[SerializedName('section')]
    private $section;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Association::class, orphanRemoval: true)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('associations')]
    private $associations;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('isActivated')]
    private $isActivated;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('haveRecoverToken')]
    private $haveRecoverToken;

    #[Groups(["collection:post:user", "item:put:user"])]
    #[SerializedName('password')]
    private $plainPassword;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Post::class)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('posts')]
    private $posts;

    #[ORM\Column(type: 'boolean')]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('isBanned')]
    private $isBanned;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(["collection:get:user", "item:get:user"])]
    #[SerializedName('banReason')]
    private $banReason;

    public function __construct()
    {
        $this->associations = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable('now');
        $this->isActivated = false;
        $this->haveRecoverToken = false;
        $this->isBanned = false;
        $this->roles[] = 'ROLE_USER';
        $this->posts = new ArrayCollection();
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

    public function getAvatarUrl()
    {
        return $this->avatarUrl;
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

    public function getupdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
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

    public function getAssociations(): Collection
    {
        return $this->associations;
    }

    public function isActivated(): ?bool
    {
        return $this->isActivated;
    }

    public function isHaveRecoverToken(): ?bool
    {
        return $this->haveRecoverToken;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getPosts(): Collection
    {
        return $this->posts;
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

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getAvatar(): ?File
    {
        return $this->avatar;
    }

    public function setAvatar(?File $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getAvatarPath(): ?string
    {
        return $this->avatarPath;
    }

    public function setAvatarPath(?string $avatarPath): self
    {
        $this->avatarPath = $avatarPath;

        return $this;
    }

    public function activate(): self
    {
        $this->isActivated = true;
        $this->confirmationCode = null;

        return $this;
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

    public function getConfirmationCode(): ?string
    {
        return $this->confirmationCode;
    }

    public function setConfirmationCode(?string $confirmationCode): self
    {
        $this->confirmationCode = $confirmationCode;

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

    public function setAvatarUrl($avatarUrl): self
    {
        $this->avatarUrl = $avatarUrl;

        return $this;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setOwner($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getOwner() === $this) {
                $post->setOwner(null);
            }
        }

        return $this;
    }

    public function getIsBanned(): ?bool
    {
        return $this->isBanned;
    }

    public function setIsBanned(bool $isBanned): self
    {
        $this->isBanned = $isBanned;

        return $this;
    }

    public function getBanReason(): ?string
    {
        return $this->banReason;
    }

    public function setBanReason(?string $banReason): self
    {
        $this->banReason = $banReason;

        return $this;
    }
}
