import React from 'react';
import io from 'socket.io-client';
import { Menu, Loader } from 'semantic-ui-react';
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

        this.state = {
            name: null,
            art: null
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

    render() {
        var image = this.state.art === null ? <Loader active inline="centered" size="massive" /> : <img src={this.state.art} alt="Pokémon" height="100%" />
        var subtitle = this.state.name === null ? <span style={{ color: "transparent", textShadow: "0 0 10px rgba(0,0,0,0.5)" }}>pokémon</span> : this.state.name;

        return (
            <>
                <Menu inverted attached>
                    <Menu.Item>
                        <img src={pokeballImage} alt="Pokéball" />
                        <span style={{ marginLeft: "0.25rem" }}>Pokémon Trivia Game</span>
                    </Menu.Item>
                    <Menu.Item>
                        Leaderboards
                    </Menu.Item>
                </Menu>

                <div style={{ marginTop: "15px" }}>
                    <div style={{ height: "20rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {image}
                    </div>
                    <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem", marginBottom: "1rem", textTransform: "capitalize" }}>{subtitle}</div>
                    <div className="wrapper">
                        <div className="pokemonIcon bug">
                            <img src={bugIcon} alt="bug" />
                            <div>Bug</div>
                        </div>
                        <div className="pokemonIcon dark">
                            <img src={darkIcon} alt="dark" />
                            <div>Dark</div>
                        </div>
                        <div className="pokemonIcon dragon">
                            <img src={dragonIcon} alt="dragon" />
                            <div>Dragon</div>
                        </div>
                        <div className="pokemonIcon electric">
                            <img src={electricIcon} alt="electric" />
                            <div>Electric</div>
                        </div>
                        <div className="pokemonIcon fairy">
                            <img src={fariyIcon} alt="fairy" />
                            <div>Fairy</div>
                        </div>
                        <div className="pokemonIcon fighting">
                            <img src={fightingIcon} alt="fighting" />
                            <div>Fighting</div>
                        </div>
                        <div className="pokemonIcon fire">
                            <img src={fireIcon} alt="fire" />
                            <div>Fire</div>
                        </div>
                        <div className="pokemonIcon flying">
                            <img src={flyingIcon} alt="flying" />
                            <div>Flying</div>
                        </div>
                        <div className="pokemonIcon ghost">
                            <img src={ghostIcon} alt="ghost" />
                            <div>Ghost</div>
                        </div>
                        <div className="pokemonIcon grass">
                            <img src={grassIcon} alt="grass" />
                            <div>Grass</div>
                        </div>
                        <div className="pokemonIcon ground">
                            <img src={groundIcon} alt="ground" />
                            <div>Ground</div>
                        </div>
                        <div className="pokemonIcon ice">
                            <img src={iceIcon} alt="ice" />
                            <div>Ice</div>
                        </div>
                        <div className="pokemonIcon normal">
                            <img src={normalIcon} alt="normal" />
                            <div>Normal</div>
                        </div>
                        <div className="pokemonIcon poison">
                            <img src={poisonIcon} alt="poison" />
                            <div>Poison</div>
                        </div>
                        <div className="pokemonIcon psychic">
                            <img src={psychicIcon} alt="psychic" />
                            <div>Psychic</div>
                        </div>
                        <div className="pokemonIcon rock">
                            <img src={rockIcon} alt="rock" />
                            <div>Rock</div>
                        </div>
                        <div className="pokemonIcon steel">
                            <img src={steelIcon} alt="steel" />
                            <div>Steel</div>
                        </div>
                        <div className="pokemonIcon water">
                            <img src={waterIcon} alt="water" />
                            <div>Water</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}