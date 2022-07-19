<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220719134017 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE presences_channel DROP INDEX IDX_44D06257EFB9C8A5, ADD UNIQUE INDEX UNIQ_44D06257EFB9C8A5 (association_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE presences_channel DROP INDEX UNIQ_44D06257EFB9C8A5, ADD INDEX IDX_44D06257EFB9C8A5 (association_id)');
    }
}
