<?php

namespace App\Repository\Discord;

use App\Entity\Discord\PresencesChannel;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Guild>
 *
 * @method PresencesChannel|null find($id, $lockMode = null, $lockVersion = null)
 * @method PresencesChannel|null findOneBy(array $criteria, array $orderBy = null)
 * @method PresencesChannel[]    findAll()
 * @method PresencesChannel[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PresencesChannelRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PresencesChannel::class);
    }

    public function add(PresencesChannel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(PresencesChannel $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return PresencesChannel[] Returns an array of PresencesChannel objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('g.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PresencesChannel
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
