$(document).ready(function() {
    let siret = "79317749400028"
    $.ajax({
        url: `https://opendata.agencebio.org/api/gouv/operateurs/?siret=${siret}`,
        type: 'GET',
        dataType: 'json',

        //Fonction appelée en cas de succès de la requête.
        success: function(data, statut) {

            let datas = data.items[0]

            //Extrait les informations nécessaires
            const numeroBio = datas.numeroBio;
            const gerant = datas.gerant;
            const lieu = datas.adressesOperateurs[0].lieu;
            const codePostal = datas.adressesOperateurs[0].codePostal;
            const ville = datas.adressesOperateurs[0].ville;
            const productions = datas.productions;
            
            let allProductions = '';

            //Boucle qui parcours chaque élément de la liste des productions
            productions.forEach(element => {
                const nom = element.nom;

                //Ajoute le nom de la production à la variable 'productionsHtmls'
                allProductions += `<p class="mb-0">- <strong>${nom}</strong></p>`;
            });

            //Crée le message à afficher avec les éléments récupérés
            const message = `
                <p>Notre restaurant travaille avec des produits locaux provenant de la ferme bio numéro <strong>${numeroBio}</strong> 
                de Monsieur <strong>${gerant}</strong> située à l’adresse <strong>${lieu} ${codePostal} ${ville}</strong>. 
                Cette ferme intervient dans les commerces : ${allProductions}</p>`;

            //Affiche le message dans le div avec l'id 'qui-sommes-nous'
            $('#qui-sommes-nous').html(message);
        },

        //Fonction appelée en cas d'échec de la requête.
        error: function(resultat, statut, erreur) {

            //Affiche l'erreur rencontrée dans la console et sur la page html
            console.error("Erreur lors de l'appel à l'API :", erreur);
            $('#qui-sommes-nous').html('<p style="color: red;">Erreur : Impossible de charger les données de l\'API.</p>');
        },

        //Fonction appelée lorsque la requête est terminée, qu’elle ait réussi ou échoué.
        complete: function(resultat, statut) {

            //Affiche le statut dans la console
            console.log('Requête terminée avec le statut :', statut);
        }
    });
});