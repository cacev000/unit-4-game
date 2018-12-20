$(document).ready(function () {

    var bb8 = {
        name: 'BB-8',
        img: './assets/images/bb-8.png',
        hp: 100,
        baseAttack: 5,
        attack: 5,
        counterAttack: 10
    };
    var bobaFett = {
        name: 'Boba Fett',
        img: './assets/images/boba-fett.png',
        hp: 120,
        baseAttack: 7,
        attack: 7,
        counterAttack: 12
    };
    var chewbacca = {
        name: 'Chewbacca',
        img: './assets/images/chewbacca.png',
        hp: 120,
        baseAttack: 7,
        attack: 7,
        counterAttack: 12
    };
    var vader = {
        name: 'Darth Vader',
        img: './assets/images/darth-vader.png',
        hp: 140,
        baseAttack: 10,
        attack: 10,
        counterAttack: 20
    };
    var darthMaul = {
        name: 'Darth Maul',
        img: './assets/images/darth-maul.png',
        hp: 160,
        baseAttack: 14,
        attack: 14,
        counterAttack: 25
    };
    var hanSolo = {
        name: 'Han Solo',
        img: './assets/images/han-solo.png',
        hp: 160,
        baseAttack: 14,
        attack: 14,
        counterAttack: 30
    };

    var arrChar = [bb8, bobaFett, chewbacca, vader, darthMaul, hanSolo];

    arrChar.forEach(
        function (character) {
        var charactersElement = $('#characters');
        charactersElement.addClass('row');
    
        var cardElement = $('<div>');
        cardElement.addClass('card col-xs-2');
        cardElement.css('width','10rem');
        cardElement.css('margin-right','5px');
        cardElement.css('margin-bottom','5px');
    
        var imgElement = $('<img>');
        imgElement.addClass('card-img-top');
        imgElement.attr('src', character.img);
    
        var cardBody = $('<div>');
        cardBody.addClass('card-body');
        cardBody.css('background-color', 'white');
        cardBody.css('text-align', 'center');
    
        var cardTitle = $('<h6>');
        cardTitle.addClass('card-title');
        cardTitle.text(character.name);

        var cardHp = $('<p>');
            cardHp.text('HP: ' + character.hp);
    
        cardBody.append(cardTitle);
        cardBody.append(cardHp);
        
        cardElement.append(imgElement);
        cardElement.append(cardBody);
    
        charactersElement.append(cardElement);
    });

});