<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contenu du fichier CSV</title>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="chargerPremierCommentaire()">
    
    <div class="container">
        <h1>Sentiment du commentaire</h1>
        <div id="commentaire"></div>
            <div>
                    <button class="btn" id="bon" onclick="chargerCommentaireSuivant()">😊
                <p>Joyeux </p></button>
                    <button class="btn" id="triste" onclick="chargerCommentaireSuivant()">😢
                <p>Triste</p></button>
                    <button class="btn" id="anxieux" onclick="chargerCommentaireSuivant()">😬
                <p>Anxieux</p></button>
                    <button class="btn" id="colere" onclick="chargerCommentaireSuivant()">😡
                <p>En colère</p></button>
            </div>
<div class="expl">
            <p>Joyeux : Un état d'esprit caractérisé par le bonheur, la satisfaction et l'allégresse.</p>

            <p>En colère : Un sentiment de mécontentement intense ou d'hostilité envers une personne,
                 une situation ou un événement.</p>

            <p>Anxieux : Une sensation d'inquiétude, de nervosité ou d'appréhension à propos de quelque 
                chose à venir ou de circonstances incertaines.</p>

            <p>Triste : Un état émotionnel associé à la douleur, 
                    à la mélancolie et à la désolation. C'est souvent provoqué par des 
                    événements négatifs tels que la perte, le deuil, la solitude ou l'échec</p>
                    </div>

            <a id="lienTelechargement" href="votes.csv" download="votes.csv" style="display: none;">Télécharger le fichier CSV</a> <!-- Lien pour télécharger le fichier -->
        </div>
</div>
    <script src="function.js"></script>
</body>
</html>
