<?php

namespace App\Serializer;

use App\Entity\Association;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Vich\UploaderBundle\Storage\StorageInterface;

class AssociationPostAvatarNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private $storage;
    private const ALREADY_CALLED = 'AppPostNormalizerAlreadyCalled';

    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = [])
    {
       return !isset($context[self::ALREADY_CALLED]) && $data instanceof Association;
    }

    /**
     * @param Association $object
     */
    public function normalize($object, ?string $format = null, array $context = [])
    {
        $object->setAvatarUrl($this->storage->resolveUri($object, 'avatar'));
        $context[self::ALREADY_CALLED] = true;
        return $this->normalizer->normalize($object, $format, $context);
    }
}