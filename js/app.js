/*Used the following sources to create project:
Memory Game Webinar with Mike Wales - https://www.youtube.com/watch?v=_rUH-sEs68Y 
Memory Game Webinar with Ryan Waite - https://www.youtube.com/watch?v=oECVwum-7Zc
https://matthewcranford.com/memory-game-walkthrough-part-3-matching-pairs/
https://matthewcranford.com/memory-game-walkthrough-part-4-shuffling-decks/
https://matthewcranford.com/memory-game-walkthrough-part-5-moves-stars/
https://matthewcranford.com/memory-game-walkthrough-part-6-the-clock/
https://matthewcranford.com/memory-game-walkthrough-part-7-making-a-modal/
https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/
https://www.w3schools.com/howto/howto_css_modals.asp
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
    if (numberOfMoves >= 17) {
        starOne.style.display = 'none';
    }
    if (numberOfMoves >= 24) {
        starTwo.style.display = 'none';
    }
}

// Sets timer

let secs = 00;
let mins = 00;
let showSecs = document.querySelector(".secs")
let showMins =document.querySelector(".mins");
let clockOff = true;
let timer;

deck.addEventListener("click", event => {
    if (clockOff) {
        timer = setInterval(setTimer, 1000);
        clockOff = false;
    }
});

 function setTimer() {
    secs++;
    if (secs < 10) {
        showSecs.innerHTML = "0" + secs;
    }
    if (secs > 9) {
            showSecs.innerHTML = secs;
    }
    if (secs > 59) {
        mins++;
        secs = 0;
        showSecs.innerHTML = "00";
        if (mins < 10) {
            showMins.innerHTML = "0" + mins;
        }
        if (mins > 9) {
            showMins.innerHTML = mins;
        }
    }
}

function stopClock() {
    clearInterval(timer);
}

// Restart game

const restart = document.querySelector(".fa-repeat");

restart.addEventListener("click", function(){
    location.reload(true);
});

// End game

const numberMatches = Array.from(document.querySelectorAll(".card.match"));

function endGame() {
        stopClock();
        toggleModal();
        modalStats();
    }

// Modal

const modal = document.querySelector('.modal');

function toggleModal() {
    modal.classList.toggle("hide");
}

// Modal data

function modalStats() {
    const timeStat = document.querySelector('.modal-time');
    const clockTimeMins = document.querySelector('.mins').firstChild.nodeValue;
    const clockTimeSecs = document.querySelector('.secs').firstChild.nodeValue;
    const movesStat = document.querySelector('.modal-moves');
    const displayMoves = document.querySelector('.moves').firstChild.nodeValue;
    
    timeStat.innerHTML = `Time = ${clockTimeMins}:${clockTimeSecs}`;
    movesStat.innerHTML = `Moves = ${displayMoves}`;

    //TODO: Add score data for stars
}

// Replay game

const replay = document.querySelector('.modal-replay');

replay.addEventListener("click", function(){
    location.reload(true);
});

// Close modal

const closeModal = document.querySelector(".close");

closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});