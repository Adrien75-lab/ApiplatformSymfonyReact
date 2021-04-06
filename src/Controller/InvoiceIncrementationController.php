<?php

namespace App\Controller;

use App\Entity\Invoice;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;

class InvoiceIncrementationController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function __invoke(Invoice $data)
    {
        $data->setChrono($data->getChrono() + 1);

        $this->entityManager->flush();

        return $data;
    }
}