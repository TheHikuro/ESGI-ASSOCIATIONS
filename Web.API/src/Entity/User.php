<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Controller\User\ConfirmationEmailController;
use App\Controller\User\DeleteAvatarController;
use App\Controller\User\PostAvatarController;
use App\Controller\User\SendGLobalEmailController;
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
            "denormalization_context" => ["groups" => ["item:put"]],
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
        // "patch" => [
        //     "denormalization_context" => ["groups" => ["item:patch"]],
        //     "openapi_context" => [
        //         "requestBody" => [
        //             "content" => [
        //                 "application/ld+json" => [
        //                     "schema" => [
        //                         "type" => "object",
        //                         "properties" => [
        //                             "roles" => ["type" => "array", "items" => ["type" => "string"]],
        //                             "associations" => ["type" => "array", "items" => ["type" => "string"]],
        //                         ],
        //                     ],
        //                 ],
        //             ],
        //         ],
        //     ],
        // ],
        "delete",
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
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $email;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    private $firstname;

    #[ORM\Column(type: 'string', length: 255)]
    private $lastname;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $username;

    /**
     * @Vich\UploadableField(mapping="users_images", fileNameProperty="avatarPath")
     */
    #[Type([File::class,null])]
    private $avatar;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $avatarPath;

    #[Type([string::class,null])]
    private $avatarUrl;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $description;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private $updatedAt;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $confirmationCode;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $recoveryToken;

    #[ORM\ManyToOne(targetEntity: Section::class, inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private $section;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Association::class, orphanRemoval: true)]
    private $associations;

    #[ORM\Column(type: 'boolean')]
    private $isActivated;

    #[ORM\Column(type: 'boolean')]
    private $haveRecoverToken;

    private $plainPassword;

    public function __construct()
    {
        $this->associations = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable('now');
        $this->isActivated = false;
        $this->haveRecoverToken = false;
        $this->roles[] = 'ROLE_USER';
    }

    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('id')]
    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('email')]
    public function getEmail(): ?string
    {
        return $this->email;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('email')]
    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('roles')]
    public function getRolesJson(): string
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return json_encode(array_unique($roles));
    }

    #[Groups(["item:put"])]
    #[SerializedName('roles')]
    public function setRolesFromJson(string $roles): self
    {
        $this->roles = json_decode($roles);

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('firstname')]
    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('firstname')]
    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('lastname')]
    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('lastname')]
    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('username')]
    public function getUsername(): string
    {
        return $this->username;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('username')]
    public function setUsername(?string $username): self
    {
        $this->username = $username;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('avatar')]
    public function getAvatarUrl()
    {
        return $this->avatarUrl;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('description')]
    public function getDescription(): ?string
    {
        return $this->description;
    }

    #[Groups(["item:put"])]
    #[SerializedName('description')]
    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('createdAt')]
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

    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('section')]
    public function getSection(): ?Section
    {
        return $this->section;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('section')]
    public function setSection(?Section $section): self
    {
        $this->section = $section;

        return $this;
    }

    #[ApiSubresource(maxDepth: 1)]
    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('associations')]
    public function getAssociations(): Collection
    {
        return $this->associations;
    }

    // #[Groups(["item:put", "item:patch"])]
    // #[SerializedName('associations')]
    // public function addAssociation(Association $association): self
    // {
    //     if (!$this->associations->contains($association)) {
    //         $this->associations[] = $association;
    //         $association->setOwner($this);
    //     }

    //     return $this;
    // }

    // #[Groups(["item:put", "item:patch"])]
    // #[SerializedName('associations')]
    // public function removeAssociation(Association $association): self
    // {
    //     if ($this->associations->removeElement($association)) {
    //         // set the owning side to null (unless already changed)
    //         if ($association->getOwner() === $this) {
    //             $association->setOwner(null);
    //         }
    //     }

    //     return $this;
    // }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('isActivated')]
    public function isActivated(): ?bool
    {
        return $this->isActivated;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('haveRecoverToken')]
    public function isHaveRecoverToken(): ?bool
    {
        return $this->haveRecoverToken;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('password')]
    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

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
}
