<?php

namespace App\Controller\Association;

use App\Repository\AssociationRepository;
use Fpdf\Fpdf;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Output\Output;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class ExtractPresencesController extends AbstractController
{
    private const VALID_FORMATS_TYPES = ["pdf", "csv", "json"];

    private $fileName;
    private $ar;

    public function __construct(AssociationRepository $ar)
    {
        $this->fileName = "rapport_presences_ESGI_Association_" . date("Ymd_His");
        $this->ar = $ar;
    }

    public function __invoke(Request $request)
    {
        $formatedReport = null;
        $associations = $this->ar->findBy([], ['name' => 'ASC']);
        $payload = json_decode($request->getContent(), false);

        if (!isset($payload->format))
            throw new \Exception('Format not defined');
        if (!in_array($payload->format, self::VALID_FORMATS_TYPES))
            throw new \Exception('Format must be ' . implode(', ', self::VALID_FORMATS_TYPES));

        $reportArray = $this->formatreportArray($associations);

        switch ($payload->format) {
            case 'pdf':
                $formatedReport = $this->preparePdfReport($reportArray);
                header('Content-Type: application/pdf; application/x-download;');
                header('Content-Disposition: attachment; filename="' . $this->fileName . '.pdf";');
                header('Content-Length: ' . fstat($formatedReport)['size']);
                fpassthru($formatedReport);
                fclose($formatedReport);
                return;
            case 'csv':
                $formatedReport = $this->prepareCsvReport($reportArray);
                header('Content-Type: text/csv; application/x-download; charset=UTF-8;');
                header('Content-Disposition: attachment; filename="' . $this->fileName . '.csv";');
                header('Content-Length: ' . fstat($formatedReport)['size']);
                fpassthru($formatedReport);
                fclose($formatedReport);
                return;
            case 'json':
                $formatedReport = $this->prepareJsonReport($reportArray);
                header('Content-Type: application/json; application/x-download;');
                header('Content-Disposition: attachment; filename="' . $this->fileName . '.json";');
                header('Content-Length: ' . fstat($formatedReport)['size']);
                fpassthru($formatedReport);
                fclose($formatedReport);
                return;
        }

        throw new \RuntimeException('Format report not implemented');
    }

    private function formatreportArray($associations)
    {
        $reportArray = [['Association', 'Membre', 'Promition', 'Nombre de participations', 'Points obtenus']];
        foreach ($associations as $association) {
            foreach ($association->getMembers() as $member) {
                $reportArray[] = [
                    $association->getName(),
                    "{$member->getFirstname()} {$member->getLastname()}",
                    $member->getSection()->getName(),
                    (function () use ($association, $member) {
                        return $association->getEvents()->filter(function ($event) use ($member) {
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

    private function prepareCsvReport($reportArray)
    {
        $CsvFileStream = fopen('php://temp/maxmemory:' . (5 * 1024 * 1024), 'r+');
        foreach ($reportArray as $row) {
            fputcsv($CsvFileStream, $row);
        }
        rewind($CsvFileStream);
        fseek($CsvFileStream, 0);

        return $CsvFileStream;
    }

    private function preparePdfReport($reportArray)
    {
        $PdfFileStream = fopen('php://temp/maxmemory:' . (5 * 1024 * 1024), 'r+');
        $cellsWidth = [];

        $Pdfreport = new Fpdf();
        $Pdfreport->SetMargins(2,10,2);
        $Pdfreport->AddPage();
        $Pdfreport->Image('ESGI-logo.png', 10, 10, 30);
        $Pdfreport->SetFont('Arial', 'B', 20);
        $Pdfreport->Cell(0, 30, utf8_decode('Rapport de présences ESGI Gaming'), 0, 1, 'C');
        $Pdfreport->SetFont('Arial', 'B', 14);
        $Pdfreport->Ln(10);

        foreach ($reportArray[0] as $row) {
            $Pdfreport->Cell($Pdfreport->GetStringWidth($row) + 8, 10, utf8_decode($row), 1,0,'C',0,'',1,0);
            $cellsWidth[] = $Pdfreport->GetStringWidth($row) + 8;
        }

        unset($reportArray[0]);
        $Pdfreport->SetFont('Arial', '', 10);

        foreach($reportArray as $col) {
            $Pdfreport->Ln();
            foreach($col as $key => $row) {
                $Pdfreport->Cell($cellsWidth[$key], 10, utf8_decode($row), 1,0,'C',0,'',1,0);
            }
        }

        fputs($PdfFileStream, $Pdfreport->Output("mypdf.pdf", "S"));
        rewind($PdfFileStream);
        fseek($PdfFileStream, 0);

        return $PdfFileStream;
    }

    private function prepareJsonReport($reportArray)
    {
        $JsonFileStream = fopen('php://temp/maxmemory:' . (5 * 1024 * 1024), 'r+');
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

        fputs($JsonFileStream, json_encode($presencesArray));
        rewind($JsonFileStream);
        fseek($JsonFileStream, 0);

        return $JsonFileStream;
    }
}
