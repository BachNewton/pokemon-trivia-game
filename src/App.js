import React from 'react';
import './App.css';
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
    constructor(props) {
        super(props);

        this.state = { image: null };
    }

    componentDidMount() {
        const socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:5000');

        socket.on('temp', (response) => {
            console.log(response);
            this.setState({ image: response.sprites.other['official-artwork'].front_default });
        });
    }

    render() {
        var image = this.state.image === null ? <Loader active inline="centered" size="massive" /> : <img src={this.state.image} alt="Pokémon" height="100%" />

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
                    <div style={{ height: "20rem", display: "flex", justifyContent: "center" }}>
                        {image}
                    </div>
                    <div style={{ textAlign: "center" }}>This should be in the centered</div>
                    <div className="wrapper">
                        <div className="pokemonIcon bug">
                            <img src={bugIcon} />
                        </div>
                        <div className="pokemonIcon dark">
                            <img src={darkIcon} />
                        </div>
                        <div className="pokemonIcon dragon">
                            <img src={dragonIcon} />
                        </div>
                        <div className="pokemonIcon electric">
                            <img src={electricIcon} />
                        </div>
                        <div className="pokemonIcon fairy">
                            <img src={fariyIcon} />
                        </div>
                        <div className="pokemonIcon fighting">
                            <img src={fightingIcon} />
                        </div>
                        <div className="pokemonIcon fire">
                            <img src={fireIcon} />
                        </div>
                        <div className="pokemonIcon flying">
                            <img src={flyingIcon} />
                        </div>
                        <div className="pokemonIcon ghost">
                            <img src={ghostIcon} />
                        </div>
                        <div className="pokemonIcon grass">
                            <img src={grassIcon} />
                        </div>
                        <div className="pokemonIcon ground">
                            <img src={groundIcon} />
                        </div>
                        <div className="pokemonIcon ice">
                            <img src={iceIcon} />
                        </div>
                        <div className="pokemonIcon normal">
                            <img src={normalIcon} />
                        </div>
                        <div className="pokemonIcon poison">
                            <img src={poisonIcon} />
                        </div>
                        <div className="pokemonIcon psychic">
                            <img src={psychicIcon} />
                        </div>
                        <div className="pokemonIcon rock">
                            <img src={rockIcon} />
                        </div>
                        <div className="pokemonIcon steel">
                            <img src={steelIcon} />
                        </div>
                        <div className="pokemonIcon water">
                            <img src={waterIcon} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}