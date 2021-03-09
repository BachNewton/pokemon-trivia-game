const Pokedex = require('pokedex-promise-v2');

module.exports = class TriviaGame {
    static POKEDEX = new Pokedex();
    static TOTAL_POKEMON = 898;

    constructor(socket) {
        var random = Math.floor(Math.random() * TriviaGame.TOTAL_POKEMON + 1);
        TriviaGame.POKEDEX.getPokemonByName(random).then((response) => {
            socket.emit('temp', response);
        });
    }
}