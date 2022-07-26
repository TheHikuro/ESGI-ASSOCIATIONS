<?php

namespace App\Entity\Discord;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\Discord\GuildRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: GuildRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item:get:discord:guild', 'get:id']],
    collectionOperations: [
        "get" => [
            "normalization_context" => ["groups" => ["collection:get:discord:guild", 'get:id']],
            "security" => "is_granted('ROLE_ADMIN') and user.isActivated() == true and user.getIsBanned() == false",
            "path" => "discord/guilds",
        ],
        "post" => [
            "denormalization_context" => ["groups" => ["collection:post:discord:guild"]],
            "security" => "is_granted('ROLE_ADMIN') and user.isActivated() == true and user.getIsBanned() == false",
            "path" => "discord/guilds",
            "openapi_context" => [
                "requestBody" => [
                    "content" => [
                        "application/ld+json" => [
                            "schema" => [
                                "type" => "object",
                                "required" => true,
                                "properties" => [
                                    "guildId" => ["type" => "string"],
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
            "normalization_context" => ["groups" => ["item:get:discord:guild", 'get:id']],
            "security" => "is_granted('ROLE_ADMIN') and user.isActivated() == true and user.getIsBanned() == false",
            "path" => "discord/guilds/{guildId}",
        ],
        "delete" => [
            "security" => "is_granted('ROLE_ADMIN') and user.isActivated() == true and user.getIsBanned() == false",
            "path" => "discord/guilds/{guildId}",
        ],
    ]
),
ApiFilter(
    SearchFilter::class,
    properties: ["id", "guildId"],
)]
class Guild
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[ApiProperty(identifier: false)]
    #[Groups(['collection:get:discord:guild', 'item:get:discord:guild', 'get:id'])]
    #[SerializedName('id')]
    private $id;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['collection:get:discord:guild', 'collection:post:discord:guild', 'item:get:discord:guild', 'get:id'])]
    #[SerializedName('guildId')]
    private $guildId;

    #[ORM\OneToMany(mappedBy: 'guild', targetEntity: PresencesChannel::class, orphanRemoval: true)]
    #[ApiSubresource(maxDepth: 1)]
    #[Groups(['collection:get:discord:guild', 'item:get:discord:guild'])]
    #[SerializedName('presencesChannels')]
    private $presencesChannels;

    public function __construct()
    {
        $this->presencesChannels = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGuildId(): ?string
    {
        return $this->guildId;
    }

    public function setGuildId(string $guildId): self
    {
        $this->guildId = $guildId;

        return $this;
    }

    /**
     * @return Collection<int, PresencesChannel>
     */
    public function getPresencesChannels(): Collection
    {
        return $this->presencesChannels;
    }

    public function addPresencesChannel(PresencesChannel $presencesChannel): self
    {
        if (!$this->presencesChannels->contains($presencesChannel)) {
            $this->presencesChannels[] = $presencesChannel;
            $presencesChannel->setGuild($this);
        }

        return $this;
    }

    public function removePresencesChannel(PresencesChannel $presencesChannel): self
    {
        if ($this->presencesChannels->removeElement($presencesChannel)) {
            // set the owning side to null (unless already changed)
            if ($presencesChannel->getGuild() === $this) {
                $presencesChannel->setGuild(null);
            }
        }

        return $this;
    }
}
