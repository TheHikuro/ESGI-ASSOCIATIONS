<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220718172310 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE presences_channel (id INT AUTO_INCREMENT NOT NULL, guild_id INT NOT NULL, association_id INT NOT NULL, channel_id VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_44D0625772F5A1AA (channel_id), INDEX IDX_44D062575F2131EF (guild_id), INDEX IDX_44D06257EFB9C8A5 (association_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE presences_channel ADD CONSTRAINT FK_44D062575F2131EF FOREIGN KEY (guild_id) REFERENCES guild (id)');
        $this->addSql('ALTER TABLE presences_channel ADD CONSTRAINT FK_44D06257EFB9C8A5 FOREIGN KEY (association_id) REFERENCES association (id)');
        $this->addSql('ALTER TABLE association ADD slug VARCHAR(255) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FD8521CC989D9B62 ON association (slug)');
        $this->addSql('ALTER TABLE guild DROP presences_channel_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE presences_channel');
        $this->addSql('DROP INDEX UNIQ_FD8521CC989D9B62 ON association');
        $this->addSql('ALTER TABLE association DROP slug');
        $this->addSql('ALTER TABLE guild ADD presences_channel_id VARCHAR(255) NOT NULL');
    }
}
