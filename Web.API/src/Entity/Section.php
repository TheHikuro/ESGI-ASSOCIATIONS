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
    normalizationContext: ['groups' => ['item:get']],
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
            "normalization_context" => ["groups" => ["item:put"]],
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
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private $name;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    private $slug;

    #[ORM\Column(type: 'datetime_immutable')]
    private $createdAt;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private $updatedAt;

    public function __construct()
    {
        $this->createdAt = new \DatetimeImmutable('now');
        $this->slug = strtolower(str_replace(' ', '-', $this->name));
    }

    #[ApiProperty(identifier: true)]
    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('id')]
    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('name')]
    public function getName(): ?string
    {
        return $this->name;
    }

    #[Groups(["collection:post", "item:put"])]
    #[SerializedName('name')]
    public function setName(string $name): self
    {
        $this->name = $name;
        $this->slug = strtolower(str_replace(' ', '-', $name));

        return $this;
    }

    #[Groups(["collection:get", "item:get"])]
    #[SerializedName('slug')]
    public function getSlug(): ?string
    {
        return $this->slug;
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
