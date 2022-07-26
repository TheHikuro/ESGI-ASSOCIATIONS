<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220602082929 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE section ADD slug VARCHAR(255) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_2D737AEF5E237E06 ON section (name)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_2D737AEF989D9B62 ON section (slug)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_2D737AEF5E237E06 ON section');
        $this->addSql('DROP INDEX UNIQ_2D737AEF989D9B62 ON section');
        $this->addSql('ALTER TABLE section DROP slug');
    }
}
