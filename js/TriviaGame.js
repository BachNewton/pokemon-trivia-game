const Pokedex = require('pokedex-promise-v2');

module.exports = class TriviaGame {
    static POKEDEX = new Pokedex();
    static TOTAL_POKEMON = 898;

    constructor(socket) {
        this.score = 0;
        this.answer = [];
        this.socket = socket;
    }

    sendQuestion() {
        var random = Math.floor(Math.random() * TriviaGame.TOTAL_POKEMON + 1);
        TriviaGame.POKEDEX.getPokemonByName(random).then((response) => {
            var name = response.species.name;
            var art = response.sprites.other['official-artwork'].front_default;
            this.answer = response.types.map(type => type.type.name);
            this.socket.emit('question', {
                name: name,
                art: art
            });
        });
    }

    checkAnswer(guess) {
        if (this.answer.length !== guess.length) {
            this.sendIncorrect();
            return;
        }

        for (var type of this.answer) {
            if (!guess.includes(type)) {
                this.sendIncorrect();
                return;
            }
        }

        this.sendCorrect();
    }

    sendIncorrect() {
        console.log(this.socket.id + ' is incorrect!');
        this.socket.emit('incorrect', this.answer);
    }

    sendCorrect() {
        console.log(this.socket.id + ' is correct!');
        this.score++;
        this.socket.emit('correct');
    }
}