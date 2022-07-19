<?php

namespace App\Entity\Discord;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Entity\Association;
use App\Repository\Discord\PresencesChannelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: PresencesChannelRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get:discord:presencesChannel', 'get:id']],
    collectionOperations: [
        "get" => [
            "normalization_context" => ["groups" => ["collection:get:discord:presencesChannel", 'get:id']],
            "path" => "discord/presencesChannels",
        ],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post:discord:presencesChannel"]],
            "path" => "discord/presencesChannels",
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "guild" => ["type" => "string"],
                                    "association" => ["type" => "string"],
                                    "channelId" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
    itemOperations: [
        "get" => [
            "normalization_context" => ["groups" => ["item:get:discord:presencesChannel", 'get:id']],
            "path" => "discord/presencesChannels/{channelId}",
        ],
        "put" => [
            "denormalization_context" => ["groups" => ["item:put:discord:presencesChannel"]],
            "path" => "discord/presencesChannels/{channelId}",
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "properties" => [
                                    "channelId" => ["type" => "string"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        "delete" => [
            "path" => "discord/presencesChannels/{channelId}",
        ],
    ]
),
ApiFilter(
    SearchFilter::class,
    properties: ["association.id", "guild.id", "channelId"],
)]
class PresencesChannel
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: false)]
    #[Groups(['collection:get:discord:presencesChannel', 'item:get:discord:presencesChannel', 'get:id'])]
    #[SerializedName('id')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Guild::class, inversedBy: 'presencesChannels')]
    #[ORM\JoinColumn(nullable: false)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(['collection:get:discord:presencesChannel', 'item:get:discord:presencesChannel', 'collection:post:discord:presencesChannel'])]
    private $guild;

    #[ORM\ManyToOne(targetEntity: Association::class)]
    #[ORM\JoinColumn(nullable: false, unique: true)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(['collection:get:discord:presencesChannel', 'item:get:discord:presencesChannel', 'collection:post:discord:presencesChannel', 'collection:get:discord:guild', 'item:get:discord:guild'])]
    private $association;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['collection:get:discord:presencesChannel', 'item:get:discord:presencesChannel', 'collection:post:discord:presencesChannel', 'item:put:discord:presencesChannel', 'get:id'])]
    private $channelId;

    public function __construct()
    {
        $this->presencesChannelIds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGuild(): ?Guild
    {
        return $this->guild;
    }

    public function setGuild(?Guild $guild): self
    {
        $this->guild = $guild;

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

    public function getChannelId(): ?string
    {
        return $this->channelId;
    }

    public function setChannelId(string $channelId): self
    {
        $this->channelId = $channelId;

        return $this;
    }
}
