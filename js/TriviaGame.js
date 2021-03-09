const Pokedex = require('pokedex-promise-v2');

module.exports = class TriviaGame {
    static POKEDEX = new Pokedex();
    static TOTAL_POKEMON = 898;

    constructor(socket) {
        this.score = 0;

        this.sendQuestion(socket);
    }

    sendQuestion(socket) {
        var random = Math.floor(Math.random() * TriviaGame.TOTAL_POKEMON + 1);
        TriviaGame.POKEDEX.getPokemonByName(random).then((response) => {
            var name = response.name;
            var art = response.sprites.other['official-artwork'].front_default;
            socket.emit('question', {
                name: name,
                art: art
            });
        });
    }
}