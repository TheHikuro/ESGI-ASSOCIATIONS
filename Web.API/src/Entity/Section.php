<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SectionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: SectionRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get:section']],
    collectionOperations: [
        "get" => ["normalization_context" => ["groups" => ["collection:get:section"]]],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post:section"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "name" => ["type" => "string"],
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
            "denormalization_context" => ["groups" => ["item:put:section"]],
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
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
class Section
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get:section", "item:get:section"])]
    #[SerializedName('id')]
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(["collection:get:section", "item:get:section", "collection:post:section", "item:put:section"])]
    #[SerializedName('name')]
    private $name;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Groups(["collection:get:section", "item:get:section"])]
    #[SerializedName('slug')]
    private $slug;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(["collection:get:section", "item:get:section"])]
    #[SerializedName('createdAt')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(["collection:get:section", "item:get:section"])]
    #[SerializedName('updatedAt')]
    private $updatedAt;

    public function __construct()
    {
        $this->createdAt = new \DatetimeImmutable('now');
        $this->slug = strtolower(str_replace(' ', '-', $this->name));
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
        $this->slug = strtolower(str_replace(' ', '-', $name));

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
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

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }
}
