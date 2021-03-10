const Pokedex = require('pokedex-promise-v2');

module.exports = class TriviaGame {
    static POKEDEX = new Pokedex();
    static TOTAL_POKEMON = 898;
    static MAX_HP = 6;

    constructor(socket) {
        this.answer = [];
        this.socket = socket;
        this.hp = TriviaGame.MAX_HP;
        this.level = 1;
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
        this.hp--;
        this.socket.emit('incorrect', this.answer);
    }

    sendCorrect() {
        console.log(this.socket.id + ' is correct!');
        this.socket.emit('correct');
    }
}