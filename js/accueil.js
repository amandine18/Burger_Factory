$(document).ready(function() {

    //Tableau des images de burgers
    const imagesBurger = [
        '../burger/chicken-burger.jpg',
        '../burger/avocat-burger.jpg',
        '../burger/beetroot-burger.jpg',
        '../burger/black-burger.jpg',
        '../burger/burger-noix-gorgonzola.jpg',
        '../burger/crazy-burger.jpg',
        '../burger/korean-bao-burger.jpg',
        '../burger/smash-burger.jpg',
        '../burger/spicy-burger.jpg',
        '../burger/vegan-burger.jpg',
    ];

    let index = 0;

    //Fonction pour changer l'image
    function changeImage() {
        index = (index + 1) % imagesBurger.length;    //Opérateur modulo 
        $('#burger-image').attr('src', imagesBurger[index]);
        $('#burger-name').text('');     //Efface le nom du burger lorsqu'on change d'image
    }

    //Change l'image toutes les 10 secondes
    setInterval(changeImage, 10000);

    //Afficher le nom du burger au clic
    $('#burger-image').click(function() {

        //Extraire le nom du fichier sans l'extension
        const nomBurger = imagesBurger[index].split('/').pop().split('.')[0];
        
        //Afficher le nom du burger
        $('#burger-name').text(nomBurger);
    });
});