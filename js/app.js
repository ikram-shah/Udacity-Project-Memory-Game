$(document).ready(function () {
    
	//List of Card Used
    let cards = ["fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"];
	
	// Variables Used in the Game
	let cards_select = [];
    let start_clock = "";
	let num_move = 0;
    let match = 0;
    let seconds = 0;
    let wait = 600;
    let match_total = cards.length / 2;
    let final_score = 3;
    let drop_stars = 0;
    let deck = $('.deck');
    let timer = $('.timer');
    let stars = $('.fa-star');
    let moves = $('.moves');
    let Gamereset = $('.restart');
    let scorePanel = $('.score-panel');
 

    //Shortcuts for the Modal
    let modal = $('.modal');
    let newGame = $('.newGame');

    /*
    * To Shuffle the Cards 
    */
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /*
    *Creates the game and adds the elements to the page
    */
    function createGame() {
        //Shuffle Cards Object
        let cards_select = shuffle(cards);

        //Clear all elements and sets moves to 0
        deck.empty();

        moves.text('0');
        //Creates elements for Cards
        for (let i = 0; i < cards_select.length; i++) {
            deck.append($('<li class="card"><i class="fa fa-' + cards_select[i] + '"></i></li>'));
        }
        //Setting up things to play the Game
        cardClick();
        seconds = 0;
        timer.text(seconds);
        resetTime(start_clock);
        initTime();
    }
	
    /*
    * Click event to turn cards and match them
    */
    function cardClick() {
        deck.find('.card').on('click', function () {
            //Ignores and exits if it already has the show or matched class
            if ($(this).hasClass('show') || $(this).hasClass('match')) {
                return true;
            }

            //Capture html for icon and add open show class to show selected card
            let card = "";
            card = $(this).html();
            $(this).addClass('open show');

            //Adding element to array object 
            cards_select.push(card);

            //Verify selection
            if (cards_select.length > 1) {

                //Successful or Unsuccessful
                if (card === cards_select[0] && cards_select.length === 2) {
                    setTimeout(function () {
                        deck.find('.open').addClass('open show match');
                    }, wait / 2);
                    match++;
                } else {
                    setTimeout(function () {
                        deck.find('.open').removeClass('open show');
                    }, wait / 2);
                }
                cards_select = [];
                num_move++;
                starRating(num_move);
                moves.html(num_move);
            }

            //Match all the cards to win the game
            if (match_total === match) {
                cards_select = [];
                match = 0;
                starRating(num_move);
                setTimeout(function () {
                    gameWon(num_move, final_score);
                });
            }
        });
    }
    /*
    * Removes a solid star by adding the class for outline star.
    */
    function starRating(movesCount) {
        if (movesCount > 24) {
            stars.eq(1).removeClass('fa-star').addClass('fa-star-o');
        } else if (movesCount > 20) {
            stars.eq(2).removeClass('fa-star').addClass('fa-star-o');
        } else if (movesCount > 14) {
            stars.eq(3).removeClass('fa-star').addClass('fa-star-o');
        }
    }


    /*
    * Game won
    */
    function gameWon(movesCount, score) {
        drop_stars = scorePanel.find('.fa-star-o').length;
        final_score = score - drop_stars;
        resetTime(start_clock);

        //Showing modal window and setting up the text for modal dialog
        modal.modal('show');

        //Show the moves, scores and timing
        document.getElementById('moves').innerHTML = movesCount;
        document.getElementById('final-score').innerHTML = final_score;
        document.getElementById('seconds').innerHTML = seconds - 1;

        //Reset from new game button in modal window
        newGame.on('click', function () {
            modal.removeData('bs.modal');
            modal.modal('hide');
            gameReset();
            createGame();
        });

    }

    //Reset
    Gamereset.on('click', function () {
        gameReset();
        createGame();
    });

    /*
    * Game Reset
    */
    function gameReset() {
        num_move = 0;
        stars.removeClass('fa-star-o').addClass('fa-star');
    }

    /*
    * Starts the timer and adds to the html document
    */
    function initTime() {
        start_clock = setInterval(function () {
            timer.text(seconds);
            seconds = seconds + 1;
        }, 1000);
    }

    /*
    * Reset timer back to 0
    */
    function resetTime(time) {
        clearInterval(time);
    }

    createGame();
	
	/*
    * Shuffles the cards before adding them to the HTML file
    */
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
});