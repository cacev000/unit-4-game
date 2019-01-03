var assignedHero = [];
var assignedEnemy = [];
var unassignedHeroes = [];

$(document).ready(function() {

    startGame();

    var wonGameElement = $('#wonGame');
    var wonBattleElement = $('#wonBattle');
    var lostGameElement = $('#lostGame');

    wonGameElement.hide();
    wonBattleElement.hide();
    lostGameElement.hide();

    function startGame() {
        var bobaFett = {
            id: 'boba_fett',
            name: 'Boba Fett',
            img: './assets/images/boba-fett.png',
            hp: Math.floor(Math.random() * 61) + 100,
            baseAttack: Math.floor(Math.random() * 6) + 5,
            attack: 0,
            counterAttack: Math.floor(Math.random() * 16) + 10
        };
        var chewbacca = {
            id: 'chewbacca',
            name: 'Chewbacca',
            img: './assets/images/chewbacca.png',
            hp: Math.floor(Math.random() * 61) + 100,
            baseAttack: Math.floor(Math.random() * 6) + 5,
            attack: 0,
            counterAttack: Math.floor(Math.random() * 16) + 10
        };
        var vader = {
            id: 'darth_vader',
            name: 'Darth Vader',
            img: './assets/images/darth-vader.png',
            hp: Math.floor(Math.random() * 61) + 100,
            baseAttack: Math.floor(Math.random() * 6) + 5,
            attack: 0,
            counterAttack: Math.floor(Math.random() * 16) + 10
        };
        var darthMaul = {
            id: 'darth_maul',
            name: 'Darth Maul',
            img: './assets/images/darth-maul.png',
            hp: Math.floor(Math.random() * 61) + 100,
            baseAttack: Math.floor(Math.random() * 6) + 5,
            attack: 0,
            counterAttack: Math.floor(Math.random() * 16) + 10
        };
        var hanSolo = {
            id: 'han_solo',
            name: 'Han Solo',
            img: './assets/images/han-solo.png',
            hp: Math.floor(Math.random() * 61) + 100,
            baseAttack: Math.floor(Math.random() * 6) + 5,
            attack: 0,
            counterAttack: Math.floor(Math.random() * 16) + 10
        };

        unassignedHeroes = [bobaFett, chewbacca, vader, darthMaul, hanSolo];

        unassignedHeroes.forEach(function(character) {
            var charactersElement = $('#characters');
            charactersElement.addClass('row justify-content-between');
            charactersElement.css('margin-bottom', '20px');

            var cardElement = $('<div>');
            cardElement.addClass('card col-xs-2');
            cardElement.css('width', '13rem');
            cardElement.attr('onclick', 'assignRole(' + JSON.stringify(character) + ')');
            cardElement.attr('id', character.id);

            var imgElement = $('<img>');
            imgElement.addClass('card-img-top');
            imgElement.attr('src', character.img);

            var cardBody = $('<div>');
            cardBody.css('background-color', 'rgba(0, 0, 0, 0.31)');
            cardBody.css('text-align', 'center');
            cardBody.css('position', 'absolute');
            cardBody.css('bottom', '0');
            cardBody.css('width', '100%');

            var cardTitle = $('<h6>');
            cardTitle.text(character.name);
            cardTitle.css('color', '#FFD700');

            var cardHp = $('<p>');
            cardHp.text('HP: ' + character.hp);
            cardHp.css('color', '#a6ffa6');

            cardBody.append(cardTitle);
            cardBody.append(cardHp);

            cardElement.append(imgElement);
            cardElement.append(cardBody);

            charactersElement.append(cardElement);
        });
    }

    $('#btnAttack').on('click', function() {
        var heroData = assignedHero[0];
        var enemyData = assignedEnemy[0];

        if (heroData.attack === 0) {
            heroData.attack = heroData.baseAttack;
        }

        enemyData.hp = enemyData.hp - heroData.attack;
        heroData.hp = heroData.hp - enemyData.counterAttack;
        heroData.attack = heroData.attack + heroData.baseAttack;


        // lower hero HP
        if (heroData.hp > 0) {
            $('#heroHp').text(heroData.hp);
            // lower Enemy HP and increase attack
            if (enemyData.hp > 0) {
                $('#enemyHp').text(enemyData.hp);
            } else {
                $('#enemyHp').text(enemyData.hp);
                // alert('You have defeated the enemy. Select the next enemy to fight');
                wonBattleElement.fadeTo(2000, 500).slideUp(500, function() {
                    wonBattleElement.slideUp(500);
                });
                resetEnemy();
            }
        } else {
            $('#heroHp').text(heroData.hp);
            // alert('You Hero has died. Good luck next time!');
            lostGameElement.fadeTo(2000, 500).slideUp(500, function() {
                lostGameElement.slideUp(500);
            });
            $('#characters').empty();
            resetEnemy();
            resetHero();
            startGame();
        }

        if (unassignedHeroes.length < 1) {
            // alert('You have successfully defeated all enemys.');
            wonGameElement.fadeTo(2000, 500).slideUp(500, function() {
                wonGameElement.slideUp(500);
            });
            $('#characters').empty();
            resetEnemy();
            resetHero();
            startGame();
        }
    });

    function resetEnemy() {
        assignedEnemy = [];
        $('#enemyName').text('');
        $('#enemyHp').text('');
        $('#enemyImg').attr('src', './assets/images/mystery.jpg');
    }

    function resetHero() {
        assignedHero = [];
        $('#heroName').text('');
        $('#heroHp').text('');
        $('#heroImg').attr('src', './assets/images/mystery.jpg');
    }
});

function assignRole(hero) {

    // find index of unassignedhero to be removed from unassignedhero array
    var indexFound = unassignedHeroes.findIndex(function(searchHero) {
        return searchHero.name === hero.name;
    });
    // remove hero/enemy from unassigned heroes
    unassignedHeroes.splice(indexFound, 1);

    // assign hero to enemy or hero array
    if (assignedEnemy.length === 0 && assignedHero.length !== 0) {
        $('#' + hero.id).hide();
        assignedEnemy.push(hero);

        $('#enemyName').text(hero.name);
        $('#enemyHp').text(hero.hp);
        $('#enemyImg').attr('src', hero.img);
    }
    if (assignedEnemy.length === 0 && assignedHero.length === 0) {
        $('#' + hero.id).hide();
        assignedHero.push(hero);

        $('#heroName').text(hero.name);
        $('#heroHp').text(hero.hp);
        $('#heroImg').attr('src', hero.img);
    }
}