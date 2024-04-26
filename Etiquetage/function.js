var commentaireActuel = 1;
var commentairesDisponibles = []; // Liste des commentaires disponibles

document.addEventListener("DOMContentLoaded", function() {
    // Charger les commentaires disponibles
    chargerCommentairesDisponibles();

    // Écouter les clics sur les boutons de vote
    var boutonBon = document.getElementById("bon");
    boutonBon.addEventListener("click", function() {
        sauvegarderContenuCSV(1); // Appel de la fonction avec le paramètre 1 pour "bon"
    });

    var boutonTriste = document.getElementById("triste");
    boutonTriste.addEventListener("click", function() {
        sauvegarderContenuCSV(0); // Appel de la fonction avec le paramètre 0 pour "mauvais"
    });

    var boutonColere = document.getElementById("colere");
    boutonColere.addEventListener("click", function() {
        sauvegarderContenuCSV(3); // Appel de la fonction avec le paramètre 0 pour "mauvais"
    });

    var boutonAnxieux = document.getElementById("anxieux");
    boutonAnxieux.addEventListener("click", function() {
        sauvegarderContenuCSV(2); // Appel de la fonction avec le paramètre 0 pour "mauvais"
    });
});

function chargerCommentaireSuivant() {
    commentaireActuel++;
    chargerCommentaire(commentaireActuel);
}

function chargerCommentairesDisponibles() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                commentairesDisponibles = xhr.responseText.split('\n'); // Séparer les commentaires par ligne
                chargerCommentaireSuivant();
            } else {
                console.error('Erreur lors du chargement des commentaires disponibles : ' + xhr.status);
            }
        }
    };
    xhr.open('GET', 'comments.csv', true); // Charger à partir d'un fichier texte
    xhr.send();
}

function chargerCommentaire(numeroLigne) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById('commentaire').innerHTML = xhr.responseText;
            } else {
                console.error('Erreur lors du chargement du commentaire : ' + xhr.status);
            }
        }
    };
    xhr.open('GET', 'charger_commentaire.php?ligne=' + numeroLigne, true);
    xhr.send();
}

function sauvegarderContenuCSV(vote) {
    var contenuDiv = document.getElementById('commentaire').innerText;
    console.log('Contenu de la div :', contenuDiv); // Ajout d'un message de console pour déboguer
    console.log('Vote :', vote); // Affichage du type de vote dans la console
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Contenu enregistré avec succès dans le fichier CSV.');
                // Une fois que le contenu est enregistré, mettre à jour le lien de téléchargement
                var lienTelechargement = document.getElementById('lienTelechargement');
                lienTelechargement.href = 'votes.csv'; // Mettre à jour le chemin vers le fichier CSV généré
                lienTelechargement.style.display = 'block'; // Afficher le lien de téléchargement
            } else {
                console.error('Erreur lors de l\'enregistrement du contenu dans le fichier CSV : ' + xhr.status);
            }
        }
    };
    xhr.open('POST', 'save_vote.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('contenu=' + encodeURIComponent(contenuDiv) + '&vote=' + vote); // Ajout du paramètre de vote dans les données envoyées
}

function ajouterCommentaire(commentaire) {
    var li = document.createElement('li');
    li.textContent = commentaire;

    // Créer des boutons pour voter
    var boutonBon = document.createElement('button');
    boutonBon.textContent = '👍';
    boutonBon.onclick = function() {
        voterPour(li);
    };

    var boutonMauvais = document.createElement('button');
    boutonMauvais.textContent = 'non';
    boutonMauvais.onclick = function() {
        voterContre(li);
    };

    li.appendChild(boutonBon);
    li.appendChild(boutonMauvais);

    // Ajouter le commentaire à la liste des commentaires non votés
    document.getElementById('commentairesNonVotes').appendChild(li);
}

document.addEventListener("DOMContentLoaded", function() {
    // Charger les commentaires disponibles
    chargerCommentairesDisponibles();

    // Vérifier s'il y a des commentaires étiquetés dans le fichier CSV
    var commentairesEtiquetes = getCommentairesEtiquetesFromCSV();
    if (commentairesEtiquetes) {
        // Filtrer les commentaires disponibles pour exclure ceux déjà étiquetés
        commentairesDisponibles = commentairesDisponibles.filter(commentaire => !commentairesEtiquetes.includes(commentaire));
    }
});

function getCommentairesEtiquetesFromCSV() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'votes.csv', false);
    xhr.send();
    
    if (xhr.readyState === 4 && xhr.status === 200) {
        var lines = xhr.responseText.split('\n');
        var commentairesEtiquetes = [];
        lines.forEach(function(line) {
            var elements = line.split(',');
            if (elements.length > 1) {
                commentairesEtiquetes.push(elements[0]);
            }
        });
        return commentairesEtiquetes;
    }
    return null;
}