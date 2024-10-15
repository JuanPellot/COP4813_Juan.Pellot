$(document).ready(function () {
    const suits = ['S', 'C', 'H', 'D'];  // Spades, Clubs, Hearts, Diamonds
    const cards = [];

    // Create a deck of 52 cards
    suits.forEach(suit => {
        for (let i = 1; i <= 13; i++) {
            cards.push(`${suit}${i}`);
        }
    });

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    // Deal cards when button is clicked
    $('#dealButton').on('click', function () {
        const shuffledCards = shuffleDeck([...cards]);
        $('#cardArea').empty();  // Clear previous cards

        shuffledCards.slice(0, 5).forEach((card, index) => {
            const cardElement = $('<img>')
                .attr('src', `cards/${card}.jpg`)
                .addClass('card')
                .css({ top: `${index * 20}px`, left: `${index * 80}px` })
                .draggable();
            $('#cardArea').append(cardElement);
        });
    });

    // Make discard pile droppable
    $('#discardPile').droppable({
        accept: '.card',
        drop: function (event, ui) {
            ui.draggable.remove();  // Remove card once discarded
            alert('Card discarded!');
        }
    });
});
