<?php
// Chemin vers le fichier CSV contenant les commentaires
$csvFile = 'commentaires.csv';

// Lire toutes les lignes du fichier CSV dans un tableau
$commentaires = [];
if (($handle = fopen($csvFile, 'r')) !== false) {
    while (($data = fgetcsv($handle)) !== false) {
        $commentaires[] = $data[1]; // Ajouter le commentaire à la liste
    }
    fclose($handle);
} else {
    echo "Erreur lors de l'ouverture du fichier CSV.";
    exit;
}

// Sélectionner un commentaire aléatoire
$commentaireAleatoire = $commentaires[array_rand($commentaires)];

// Afficher le commentaire aléatoire
echo '<p>' . htmlspecialchars($commentaireAleatoire) . '</p>';
?>
