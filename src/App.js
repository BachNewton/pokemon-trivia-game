import React from 'react';
import io from 'socket.io-client';
import { Menu, Loader, Button } from 'semantic-ui-react';
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

    constructor(props) {
        super(props);

        this.handleTypeClick = this.handleTypeClick.bind(this);

        this.state = {
            name: null,
            art: null,
            selected: []
        };
    }

    componentDidMount() {
        App.SOCKET.on('question', (data) => {
            console.log(data);

            this.setState({
                name: data.name,
                art: data.art
            });
        });
    }

    handleTypeClick(type) {
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
        var image = this.state.art === null ? <Loader active inline="centered" size="massive" /> : <img src={this.state.art} alt="Pokémon" height="100%" />
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
            className += this.state.selected.includes(type) ? " selected" : this.state.selected.length >= 2 ? " unselected" : "";

            return (
                <div className={className} key={index} onClick={() => { this.handleTypeClick(type) }}>
                    <img src={typeIcons[index]} alt={type} />
                    <div style={{ textTransform: "capitalize" }}>{type}</div>
                </div>
            );
        });

        return (
            <>
                <div style={{ height: "20rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {image}
                </div>
                <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", marginBottom: "1rem", textTransform: "capitalize" }}>{subtitle}</div>
                <div className="wrapper">
                    {types}

                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <Button disabled={this.state.selected.length === 0} primary style={{ width: "20rem" }}>Submit</Button>
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