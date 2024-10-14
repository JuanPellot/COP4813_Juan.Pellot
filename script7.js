$(document).ready(function() {
    const cardDeck = [];
    const suits = ['S', 'H', 'D', 'C']; // Spades, Hearts, Diamonds, Clubs
    
    // Initialize card deck
    suits.forEach(suit => {
        for (let i = 1; i <= 13; i++) {
            cardDeck.push(`${suit}${i}.jpg`);
        }
    });

    // Function to shuffle cards
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to deal cards
    function dealCards() {
        shuffle(cardDeck);
        $('#deck').empty(); // Clear previous cards
        
        cardDeck.forEach((card, index) => {
            const cardElement = $('<img>', {
                src: `cards/${card}`,
                class: 'card',
                css: {
                    top: `${index * 5}px`,
                    left: `${index * 5}px`
                },
                draggable: true
            });

            // Attach drag event
            cardElement.on('dragstart', function(event) {
                event.originalEvent.dataTransfer.setData('text/plain', card);
            });

            $('#deck').append(cardElement);
        });
    }

    // Deal cards when the "Deal" button is clicked
    $('#deal-btn').on('click', function() {
        dealCards();
    });

    // Allow dropping on the discard pile
    $('#discard-pile').on('dragover', function(event) {
        event.preventDefault();
    });

    $('#discard-pile').on('drop', function(event) {
        event.preventDefault();
        const cardName = event.originalEvent.dataTransfer.getData('text/plain');
        const cardElement = $(`img[src='cards/${cardName}']`);
        cardElement.remove(); // Remove from deck

        // Display message when a card is discarded
        alert(`Card ${cardName} discarded!`);
    });
});
