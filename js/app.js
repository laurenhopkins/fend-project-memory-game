/*Used the following sources to create project:
Memory Game Webinar with Mike Wales - https://www.youtube.com/watch?v=_rUH-sEs68Y 
https://matthewcranford.com/memory-game-walkthrough-part-2-toggling-card
*/

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
 
 //Show cards when clicked

 cards.forEach(function(card) {
    card.addEventListener('click', function(evt) {
       
        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'));
       
        if (showCards.length <= 1) {
        showCards.push(card);
        card.classList.add("open", "show");
        }

        //Check if cards match

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
            setTimeout(function() {
                showCards.forEach(function(card) {
                    card.classList.remove("open", "show");
                });

                showCards = [];
            }, 1000);
        }
    });
 });
