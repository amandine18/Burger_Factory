$(document).ready(function() {

    //Fonction pour supprimer uniquement les ingrédients créés du localStorage (optionnel)
    function clearLocalStorage() {
        localStorage.clear();
        alert("Le localStorage a été vidé.");
        
        //Réinitialise les listes et rafraîchi l'affichage
        nouveauxIngredients = new Map();
        initializeIngredientLists();
    }

    //Appel de la fonction au click sur le bouton indiqué
    $('#bouton-clear-localstorage').click(function() {
        clearLocalStorage();
    });

    //Fonction pour récupérer les ingrédients de base et leur quantité
    function createBaseIngredients() {
        return new Map([
            ['Salade', 8],
            ['Tomate', 2],
            ['Oignon', 6],
            ['Fromage', 4],
            ['Bacon', 3]
        ]);
    }

    //Fonction pour récupérer les ingrédients de base depuis le localStorage ou les initialiser avec des valeurs par défaut
    function getBaseIngredients() {
        const storedBaseIngredients = JSON.parse(localStorage.getItem('baseIngredients'));

        //Crée une map avec les ingrédients récupérés
        if (storedBaseIngredients) {
            return new Map(storedBaseIngredients);
        } else { //Si aucune donnée n'est stockée, appel de la fonction getBaseIngredients
            return createBaseIngredients();
        }
    }

    //Fonction pour récupérer les ingrédients créés depuis la page "creation_ingred" via le localStorage
    function getnouveauxIngredients() {
        const storedIngredients = JSON.parse(localStorage.getItem('nouveauxIngredients')) || [];
        return new Map(storedIngredients);  //Transforme le tableau récupéré en Map
    }

    //Fonction pour sauvegarder les ingrédients de base et créés dans le localStorage
    function saveIngredients() {
        localStorage.setItem('baseIngredients', JSON.stringify(Array.from(baseIngredients.entries())));
        localStorage.setItem('nouveauxIngredients', JSON.stringify(Array.from(nouveauxIngredients.entries())));
    }

    //Appel de la fonction dans une variable pour la réutiliser
    let baseIngredients = getBaseIngredients();
    let nouveauxIngredients = getnouveauxIngredients();


    //Sauvegarde les ingrédients
    saveIngredients();

    //Fonction pour initialiser la liste des ingrédients
    function initializeIngredientLists() {

        //Combine les ingrédients de base avec les ingrédients créés
        const allIngredients = new Map([...baseIngredients, ...nouveauxIngredients]);

        //Vide les listes déroulantes
        $('#ingredient-1, #ingredient-2, #ingredient-3').empty();

        //Fonction bouclée qui ajoute tous les ingrédients à chaque liste déroulante
        allIngredients.forEach(function(quantity, name) {
            const ingredientText = `${name} - ${quantity}`;
            $('#ingredient-1').append(`<option value="${name}">${ingredientText}</option>`);
            $('#ingredient-2').append(`<option value="${name}">${ingredientText}</option>`);
            $('#ingredient-3').append(`<option value="${name}">${ingredientText}</option>`);
        }); 

    }

    //Appel de la fonction pour initialiser les listes d'ingrédients
    initializeIngredientLists();

    //Fonction pour décrémenter la quantité d'un ingrédient
    function decrementeQuantiteIngredients(nomIngredient) {

        //Vérifie si l'ingrédient sélectionné fait parti des ingrédients de base
        if (baseIngredients.has(nomIngredient)) {
            let currentQuantity = baseIngredients.get(nomIngredient);

            //Supprime l'ingrédient si la quantité est égale à 1
            if (currentQuantity === 1) {
                baseIngredients.delete(nomIngredient);  
            } else if (currentQuantity > 1) {
                baseIngredients.set(nomIngredient, currentQuantity - 1);  //Décrémente la quantité si elle est strictementsupérieure à 1
            }
        } 

        //Vérifie si l'ingrédient sélectionné fait parti des ingrédients créés
        else if (nouveauxIngredients.has(nomIngredient)) {
            let currentQuantity = nouveauxIngredients.get(nomIngredient);

            if (currentQuantity === 1) {
                nouveauxIngredients.delete(nomIngredient); 
            } else if (currentQuantity > 1) {
                nouveauxIngredients.set(nomIngredient, currentQuantity - 1);  
            }

            //Met à jour le localStorage avec les nouvelles quantités des ingrédients personnalisés
            localStorage.setItem('nouveauxIngredients', JSON.stringify(Array.from(nouveauxIngredients.entries())));
        }

        //Vérifie le nombre d'ingrédients de base restants (optionnel)
        if (baseIngredients.size < 3) {

            //Réinitialise les ingrédients de base
            baseIngredients = createBaseIngredients(); 
            alert("Les ingrédients de base ont été recommandés car il en restait moins de 3.");
        }

        //Sauvegarde les modifications dans le localStorage
        saveIngredients();
    }

    //Au clic sur le bouton "Créer le burger"
    $('#bouton-creer-burger').click(function() {

        //Récupère les valeurs des champs
        const nomBurger = $('#burger-name-input').val().trim();
        const ingredient1 = $('#ingredient-1').val();
        const ingredient2 = $('#ingredient-2').val();
        const ingredient3 = $('#ingredient-3').val();

        //Efface les messages d'erreur ou de succès précédents
        $('#message-erreur').text('');
        $('#message-success').text('');

        //Vérifie que le champ "nom du burger" ne soit pas vide
        if (nomBurger === '') {
            $('#message-erreur').text("Le nom du burger est obligatoire.");
            return;
        }

        //Vérifie que les champs ingrédients ne soient pas vides
        if (![ingredient1, ingredient2, ingredient3].every(ingredient => ingredient)) {
            $('#message-erreur').text("Tous les ingrédients sont obligatoires.");
            return;
        }

        //Vérifie que les champs ingrédients ne soient pas identiques
        if (new Set([ingredient1, ingredient2, ingredient3]).size < 3) {
            $('#message-erreur').text("Les ingrédients doivent être différents.");
            return;
        }

        //Décrémente la quantité de chaque ingrédient sélectionné
        decrementeQuantiteIngredients(ingredient1);
        decrementeQuantiteIngredients(ingredient2);
        decrementeQuantiteIngredients(ingredient3);

        //Crée le burger et l'enregistre dans une Map
        const burgerData = new Map();
        burgerData.keys = "name";
        burgerData.values = "ingrédients";
        burgerData.set(nomBurger, [ingredient1, ingredient2, ingredient3])
        
        //Affiche un message de succès (optionnel)
        $('#message-success').text(`Burger "${nomBurger}" crée avec succès, ingrédients : ${ingredient1}, ${ingredient2} et ${ingredient3}`);

        //Affiche la Map dans la console
        console.log("Burger créé :", burgerData);

        //Réinitialise le champ "Nom du burger"
        $('#burger-name-input').val('');

        //Réinitialise les listes déroulantes
        initializeIngredientLists();
    });
});