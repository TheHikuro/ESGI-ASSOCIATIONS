<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220709122138 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD date_start DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD date_end DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', DROP date_interval');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE event ADD date_interval VARCHAR(255) DEFAULT NULL COMMENT \'(DC2Type:dateinterval)\', DROP date_start, DROP date_end');
    }
}
