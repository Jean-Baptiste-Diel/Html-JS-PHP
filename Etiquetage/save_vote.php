<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['contenu']) && isset($_POST['vote'])) {
        $contenu = $_POST['contenu'];
        $vote = $_POST['vote'];

        // Chemin vers votre fichier CSV
        $fichierCSV = 'votes.csv';

        // Ouvrir le fichier CSV en mode écriture
        $file = fopen($fichierCSV, 'a');

        // Écrire les données dans le fichier CSV
        fputcsv($file, array($contenu, $vote));

        // Fermer le fichier CSV
        fclose($file);

        echo 'Vote enregistré avec succès dans le fichier CSV.';
    } else {
        echo 'Données manquantes.';
    }
} else {
    echo 'Méthode de requête incorrecte.';
}
?>
