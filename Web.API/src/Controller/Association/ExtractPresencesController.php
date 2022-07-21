<?php

namespace App\Controller\Association;

use App\Repository\AssociationRepository;
use Fpdf\Fpdf;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ExtractPresencesController extends AbstractController
{
    private const VALID_MIME_TYPES = [
        "application/pdf" => "pdf",
        "text/csv" => "csv",
        "application/json" => "json",
    ];

    private $fileName;
    private $ar;

    public function __construct(AssociationRepository $ar)
    {
        $this->fileName = "rapport_presences_ESGI_Association_" . date("Ymd_His") . ".";
        $this->ar = $ar;
    }

    public function __invoke(Request $request)
    {
        $associations = $this->ar->findBy([], ['name' => 'ASC']);
        $payload = json_decode($request->getContent(), false);

        if (!isset($payload->format))
            throw new \Exception('Format not defined');
        if (!in_array($payload->format, array_keys(self::VALID_MIME_TYPES)))
            throw new \Exception('Format must be ' . implode(', ', array_keys(self::VALID_MIME_TYPES)));

        $this->fileName .= self::VALID_MIME_TYPES[$payload->format];
        $reportArray = $this->formatreportArray($associations);
        $FileStream = fopen('php://temp/maxmemory:' . (5 * 1024 * 1024), 'r+');

        switch ($payload->format) {
            case array_keys(self::VALID_MIME_TYPES)[0]:
                $this->preparePdfReport($reportArray, $FileStream);
                break;
            case array_keys(self::VALID_MIME_TYPES)[1]:
                $this->prepareCsvReport($reportArray, $FileStream);
                break;
            case array_keys(self::VALID_MIME_TYPES)[2]:
                $this->prepareJsonReport($reportArray, $FileStream);
                break;
            default:
                fclose($FileStream);
                throw new \RuntimeException('Format not supported');
        }

        header("Content-Type: $payload->format; application/x-download; charset=UTF-8;");
        header("Content-Disposition: attachment; filename='$this->fileName';");
        header('Content-Length: ' . fstat($FileStream)['size']);
        header('Access-Control-Allow-Origin: http://localhost:8080');
        rewind($FileStream);
        fseek($FileStream, 0);
        fpassthru($FileStream);
        fclose($FileStream);
    }

    private function formatreportArray($associations)
    {
        $reportArray = [['Association', 'Membre', 'Promotion', 'Nombre de participations', 'Points obtenus']];
        foreach ($associations as $association) {
            foreach ($association->getMembers() as $member) {
                $reportArray[] = [
                    $association->getName(),
                    "{$member->getFirstname()} {$member->getLastname()}",
                    $member->getSection()->getName(),
                    (function () use ($association, $member) {
                        return $association->getEvents()->filter(function ($event) use ($member) {
                            if ($event->getParticipants()->contains($member) && !$event->isArchived())
                                return $event->getParticipants()->contains($member);
                        })->count();
                    })(),
                    (function () use ($association, $member) {
                        return array_reduce($association->getEvents()->filter(function ($event) use ($member) {
                            if ($event->getParticipants()->contains($member) && !$event->isArchived())
                                return $event;
                        })->toArray(), function ($carry, $event) {
                            return $carry + $event->getPointsToWin();
                        }, 0);
                    })()
                ];
            }
        }
        return $reportArray;
    }

    private function prepareCsvReport($reportArray, $FileStream)
    {
        foreach ($reportArray as $row) {
            fputcsv($FileStream, $row);
        }
    }

    private function preparePdfReport($reportArray, $FileStream)
    {
        $cellsWidth = [];

        $Pdfreport = new Fpdf();
        $Pdfreport->SetMargins(5,10,5);
        $Pdfreport->AddPage();
        $Pdfreport->Image('ESGI-logo.png', 10, 10, 30);
        $Pdfreport->SetFont('Arial', 'B', 20);
        $Pdfreport->Cell(0, 30, utf8_decode('Rapport de présences ESGI Gaming'), 0, 1, 'C');
        $Pdfreport->SetFont('Arial', 'B', 14);
        $Pdfreport->Ln(10);

        foreach ($reportArray[0] as $row) {
            $Pdfreport->Cell($Pdfreport->GetStringWidth($row) + 7, 10, utf8_decode($row), 1,0,'C',0,'',1,0);
            $cellsWidth[] = $Pdfreport->GetStringWidth($row) + 7;
        }

        unset($reportArray[0]);
        $Pdfreport->SetFont('Arial', '', 10);

        foreach($reportArray as $col) {
            $Pdfreport->Ln();
            foreach($col as $key => $row) {
                $Pdfreport->Cell($cellsWidth[$key], 10, utf8_decode($row), 1,0,'C',0,'',1,0);
            }
        }

        fputs($FileStream, $Pdfreport->Output("S"));
    }

    private function prepareJsonReport($reportArray, $FileStream)
    {
        $presencesArray = [
            "presences" => []
        ];

        unset($reportArray[0]);

        foreach ($reportArray as $presence) {
            $presencesArray["presences"][] = [
                "association" => $presence[0],
                "membre" => $presence[1],
                "promition" => $presence[2],
                "nombre_de_participations" => $presence[3],
                "points_obtenus" => $presence[4]
            ];
        }

        fputs($FileStream, json_encode($presencesArray));
    }
}
