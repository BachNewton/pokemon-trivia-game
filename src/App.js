import React from 'react';
import io from 'socket.io-client';
import { Menu, Loader, Button, Progress } from 'semantic-ui-react';
import pokeballImage from './images/pokeball.svg';
import './pokemonTypes.css';
import bugIcon from './images/pokemonTypes/bug.svg';
import darkIcon from './images/pokemonTypes/dark.svg';
import dragonIcon from './images/pokemonTypes/dragon.svg';
import electricIcon from './images/pokemonTypes/electric.svg';
import fariyIcon from './images/pokemonTypes/fairy.svg';
import fightingIcon from './images/pokemonTypes/fighting.svg';
import fireIcon from './images/pokemonTypes/fire.svg';
import flyingIcon from './images/pokemonTypes/flying.svg';
import ghostIcon from './images/pokemonTypes/ghost.svg';
import grassIcon from './images/pokemonTypes/grass.svg';
import groundIcon from './images/pokemonTypes/ground.svg';
import iceIcon from './images/pokemonTypes/ice.svg';
import normalIcon from './images/pokemonTypes/normal.svg';
import poisonIcon from './images/pokemonTypes/poison.svg';
import psychicIcon from './images/pokemonTypes/psychic.svg';
import rockIcon from './images/pokemonTypes/rock.svg';
import steelIcon from './images/pokemonTypes/steel.svg';
import waterIcon from './images/pokemonTypes/water.svg';

export default class App extends React.Component {
    static SOCKET = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:5000');
    static MAX_HP = 6;
    static EXP_MULTIPLIER_PER_LEVEL = 2;

    constructor(props) {
        super(props);

        this.handleTypeClick = this.handleTypeClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.gotQuestion = this.gotQuestion.bind(this);
        this.correctAnswer = this.correctAnswer.bind(this);
        this.incorrectAnswer = this.incorrectAnswer.bind(this);

        this.state = {
            name: null,
            art: null,
            selected: [],
            answer: [],
            answerSent: false,
            hp: App.MAX_HP,
            exp: 0,
            level: 1
        };
    }

    componentDidMount() {
        App.SOCKET.on('question', this.gotQuestion);
        App.SOCKET.on('correct', this.correctAnswer);
        App.SOCKET.on('incorrect', this.incorrectAnswer);

        App.SOCKET.emit('ready');
    }

    gotQuestion(data) {
        console.log(data);

        this.setState({
            name: data.name,
            art: data.art
        });
    }

    correctAnswer() {
        var exp = this.state.exp + 1;
        var level = this.state.level;

        if (exp >= this.state.level * App.EXP_MULTIPLIER_PER_LEVEL) {
            setTimeout(() => {
                level++;
                exp = 0;
                this.setState({
                    exp: exp,
                    level: level
                });
            }, 750);
        }

        this.setState({
            answer: this.state.selected.slice(0),
            exp: exp,
            level: level
        });
    }

    incorrectAnswer(answer) {
        this.setState({
            answer: answer,
            hp: this.state.hp - 1
        });
    }

    handleTypeClick(type) {
        if (this.state.answer.length > 0) return;
        console.log('Clicked on:', type);

        var selected = this.state.selected;

        var index = selected.indexOf(type);
        if (index === -1) {
            selected.push(type);
            if (selected.length > 2) {
                selected.splice(0, 1);
            }
        } else {
            selected.splice(index, 1);
        }

        this.setState({ selected: selected });
    }

    handleSubmit() {
        this.setState({ answerSent: true });
        App.SOCKET.emit('answer', this.state.selected);
    }

    handleNextQuestion() {
        this.setState({
            name: null,
            art: null,
            selected: [],
            answer: [],
            answerSent: false
        });

        App.SOCKET.emit('ready');
    }

    handleReset() {
        this.setState({
            hp: App.MAX_HP,
            exp: 0,
            level: 1
        });

        this.handleNextQuestion();
    }

    renderTopMenu() {
        return (
            <Menu inverted attached>
                <Menu.Item>
                    <img src={pokeballImage} alt="Pokéball" />
                    <span style={{ marginLeft: "0.4rem" }}>Pokémon Trivia Game</span>
                </Menu.Item>
                <Menu.Item>
                    Leaderboards
                    </Menu.Item>
            </Menu>
        );
    }

    renderBody() {
        var image = this.state.art === null ? (
            <Loader active inline="centered" size="massive" />
        ) : (
            <img src={this.state.art} alt="Pokémon" height="100%" />
        );

        var subtitle = this.state.name === null ? <span style={{ color: "transparent", textShadow: "0 0 10px rgba(0,0,0,0.5)" }}>pokémon</span> : this.state.name;

        var typeIcons = [
            bugIcon, darkIcon, dragonIcon, electricIcon,
            fariyIcon, fightingIcon, fireIcon, flyingIcon,
            ghostIcon, grassIcon, groundIcon, iceIcon,
            normalIcon, poisonIcon, psychicIcon, rockIcon,
            steelIcon, waterIcon
        ];

        var types = [
            'bug', 'dark', 'dragon', 'electric',
            'fairy', 'fighting', 'fire', 'flying',
            'ghost', 'grass', 'ground', 'ice',
            'normal', 'poison', 'psychic', 'rock',
            'steel', 'water'
        ].map((type, index) => {
            var className = "pokemonIcon " + type;
            if (this.state.answer.length > 0) {
                className += this.state.answer.includes(type) ? " correct" : this.state.selected.includes(type) ? " incorrect" : " unselected";
            } else {
                className += this.state.selected.includes(type) ? " selected" : this.state.selected.length >= 2 ? " unselected" : "";
            }

            return (
                <div className={className} key={index} onClick={() => { this.handleTypeClick(type) }}>
                    <img src={typeIcons[index]} alt={type} />
                    <div style={{ textTransform: "capitalize" }}>{type}</div>
                </div>
            );
        });

        var button = this.state.hp === 0 ? (
            <Button
                negative style={{ width: "20rem", fontSize: "1.25rem" }}
                onClick={this.handleReset}
            >
                Fainted
            </Button>
        ) : this.state.answer.length > 0 ? (
            <Button
                secondary style={{ width: "20rem", fontSize: "1.25rem" }}
                onClick={this.handleNextQuestion}
            >
                Next Question
            </Button>
        ) : (
            <Button
                loading={this.state.answerSent}
                disabled={this.state.selected.length === 0 || this.state.answerSent}
                primary style={{ width: "20rem", fontSize: "1.25rem" }}
                onClick={this.handleSubmit}
            >
                Submit
            </Button>
        );

        var hpPercentage = this.state.hp / App.MAX_HP;
        var hpBarColor = hpPercentage >= 0.5 ? "green" : hpPercentage >= 0.2 ? "yellow" : "red";

        return (
            <>
                <div style={{ height: "20rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {image}
                </div>
                <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", marginBottom: "0.75rem", textTransform: "capitalize" }}>{subtitle}</div>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", border: "4px solid black", background: "black", margin: "0rem 1rem", borderRadius: "5px" }}>
                    <div style={{ color: "white", width: "3rem", fontWeight: "bold", fontSize: "1.25rem" }}>HP:</div>
                    <Progress progress="ratio" color={hpBarColor} value={this.state.hp} total={App.MAX_HP} style={{ flexGrow: 1, margin: "0px" }} />
                    <div style={{ width: "100%", margin: "0.1rem 0rem" }}></div>
                    <div style={{ color: "white", width: "3rem", fontWeight: "bold", fontSize: "1.25rem" }}>EXP:</div>
                    <Progress progress="ratio" color="blue" value={this.state.exp} total={this.state.level * App.EXP_MULTIPLIER_PER_LEVEL} style={{ flexGrow: 1, margin: "0px" }} />
                    <div style={{ color: "white", fontWeight: "bold", fontSize: "1.25rem", margin: "0rem 0.25rem" }}>Lv. {this.state.level}</div>
                </div>
                <div className="wrapper">
                    {types}
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    {button}
                </div>
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderTopMenu()}
                <div style={{ marginTop: "15px" }}>
                    {this.renderBody()}
                </div>
            </>
        );
    }
}