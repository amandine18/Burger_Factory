$(document).ready(function() {

    //Fonction pour récupérer les ingrédients créés depuis la page "creation_ingred" via le localStorage
    function getnouveauxIngredients() {
        const storedIngredients = JSON.parse(localStorage.getItem('nouveauxIngredients')) || [];
        return new Map(storedIngredients);  //Transforme le tableau récupéré en Map
    }

    //Appel de la fonction dans une variable pour la réutiliser
    let nouveauxIngredients = getnouveauxIngredients();

    //Fonction pour sauvegarder les ingrédients créés dans le localStorage
    function savenouveauxIngredients() {
        localStorage.setItem('nouveauxIngredients', JSON.stringify(Array.from(nouveauxIngredients)));   //Transforme la Map en tableau pour le stockage
    }

    //Fonction pour ajouter le nouvel ingrédient et sa quantité à la Map "customIngrédients"
    function addCustomIngredient(name, quantity) {
        nouveauxIngredients.set(name, quantity);

        //Sauvegarde dans le localStorage
        savenouveauxIngredients();    
    }

    //Au clic sur le bouton "Créer l'ingrédient"
    $('#bouton-creer-ingredient').click(function() {

        //Récupère les valeurs des champs
        const nomIngredient = $('#nom-ingredient').val().trim();
        const quantiteIngredient = $('#quantite-ingredient').val().trim();

        //Efface les messages d'erreur ou de succès précédents
        $('#message-erreur').text('');
        $('#message-success').text('');

        //Vérifie que le champ "Nom de l'ingrédient" ne soit pas vide
        if (nomIngredient === '') {
            $('#message-erreur').text("Le nom de l'ingrédient est obligatoire.");
            return;
        }

        //Vérifie que le champ "quantité" ne soit ni vide ni d'une valeur négative
        if (quantiteIngredient === '' || isNaN(quantiteIngredient) || Number(quantiteIngredient) <= 0) {
            $('#message-erreur').text("La quantité est obligatoire et doit être un nombre supérieur à 0.");
            return;
        }

        //Appel de la fonction addCustomIngredient avec le nom de l'ingrédient et sa quantité saisi(e)s en paramètres
        addCustomIngredient(nomIngredient, quantiteIngredient);

        //Réinitialise les champs de saisie
        $('#nom-ingredient').val('');
        $('#quantite-ingredient').val('');

        //Affiche un message de succès (optionnel)
        $('#message-success').text(`Ingrédient "${nomIngredient}" créé avec succès, quantité : ${quantiteIngredient}`);
        console.log('Custom Ingredients:', JSON.parse(localStorage.getItem('nouveauxIngredients')));
    });
});