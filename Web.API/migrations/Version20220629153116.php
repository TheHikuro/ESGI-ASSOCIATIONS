<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220629153116 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE post (id INT AUTO_INCREMENT NOT NULL, association_id INT NOT NULL, owner_id INT NOT NULL, parent_post_id INT DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', content VARCHAR(2048) NOT NULL, INDEX IDX_5A8A6C8DEFB9C8A5 (association_id), INDEX IDX_5A8A6C8D7E3C61F9 (owner_id), INDEX IDX_5A8A6C8D39C1776A (parent_post_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8DEFB9C8A5 FOREIGN KEY (association_id) REFERENCES association (id)');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8D7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8D39C1776A FOREIGN KEY (parent_post_id) REFERENCES post (id)');
        $this->addSql('ALTER TABLE association_user DROP FOREIGN KEY FK_A2312D48EFB9C8A5');
        $this->addSql('ALTER TABLE association_user ADD CONSTRAINT FK_A2312D48EFB9C8A5 FOREIGN KEY (association_id) REFERENCES association (id)');
        $this->addSql('ALTER TABLE event CHANGE association_id association_id INT NOT NULL, CHANGE date_interval date_interval VARCHAR(255) NOT NULL COMMENT \'(DC2Type:dateinterval)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8D39C1776A');
        $this->addSql('DROP TABLE post');
        $this->addSql('ALTER TABLE association_user DROP FOREIGN KEY FK_A2312D48EFB9C8A5');
        $this->addSql('ALTER TABLE association_user ADD CONSTRAINT FK_A2312D48EFB9C8A5 FOREIGN KEY (association_id) REFERENCES association (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE event CHANGE association_id association_id INT DEFAULT NULL, CHANGE date_interval date_interval VARCHAR(255) DEFAULT NULL COMMENT \'(DC2Type:dateinterval)\'');
    }
}
