/*Used the following sources to create project:
Memory Game Webinar with Mike Wales - https://www.youtube.com/watch?v=_rUH-sEs68Y 
Memory Game Webinar with Ryan Waite - https://www.youtube.com/watch?v=oECVwum-7Zc
https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/
https://matthewcranford.com/memory-game-walkthrough-part-4-shuffling-decks/
https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/
*/

//Shuffles deck 

const deck = document.querySelector('.deck');

function shuffleCards() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledDeck = shuffle(cardsToShuffle);
    for (card of shuffledDeck) {
        deck.appendChild(card);
    }
}
shuffleCards();

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 const cards = document.querySelectorAll('.card');
 let showCards =[];
 
 // Show cards when clicked

 cards.forEach(function(card) {
    card.addEventListener('click', function(evt) {
       
        if (showCards.length <= 1 && !card.classList.contains('show')) {
            showCards.push(card);
            card.classList.add("open", "show");
            }

        // Check if cards match

        function checkForMatch() {
            if (showCards[0].firstElementChild.className === showCards[1].firstElementChild.className) {
                showCards.forEach(function(card) {
                    card.classList.add("match");
                });
            }
        }
         
        checkForMatch();

       //Hide cards if there is no match

        if (showCards.length == 2) {
            countMove();
            setTimeout(function() {
                showCards.forEach(function(card) {
                    card.classList.remove("open", "show");
                });             
                showCards = [];
            }, 500);
        }
    });
 });
 
 // Counts moves

 let numberOfMoves = 0;

 function countMove() {
    numberOfMoves++;
        const moves = document.querySelector('.moves');
        moves.innerHTML = numberOfMoves;
    starScore();
}

// Adds star rating

function starScore() {
    const starOne = document.querySelector('.star-one');
    const starTwo = document.querySelector('.star-two');
    const starThree = document.querySelector('.star-three');
    if (numberOfMoves >= 15) {
        starOne.style.display = 'none';
    }
    if (numberOfMoves >= 24) {
        starTwo.style.display = 'none';
    }
}

