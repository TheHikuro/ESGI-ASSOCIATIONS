<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220602082947 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('INSERT INTO section (name, slug, created_at) VALUES ("Aucune", "aucune", now())');
        $this->addSql('INSERT INTO user (email,firstname,lastname,username,password,roles,section_id,is_activated,have_recover_token,created_at) VALUES ("admin@myges.fr","admin","admin","admin","$2y$13$TYVVG7ZwoI2.EcNRswgCPuOnjCL0lZxrBZ8Pn0LRskWMe.KZ2THYS","[\"ROLE_ADMIN\"]",(SELECT id FROM section WHERE slug = "aucune"),1,0,now())');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DELETE FROM user WHERE email = "admin@myges.fr"');
        $this->addSql('DELETE FROM section WHERE slug = "aucune"');
    }
}
