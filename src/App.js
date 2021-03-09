import React from 'react';
import './App.css';
import io from 'socket.io-client';
import { Menu, Loader, Button } from 'semantic-ui-react';
import pokeballImage from './images/pokeball.svg';

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
                    </Menu.Item>
                    <Menu.Item>
                        Pokémon Trivia Game
                    </Menu.Item>
                </Menu>

                <div style={{ marginTop: "15px" }}>
                    <div style={{ height: "20rem", display: "flex", justifyContent: "center" }}>
                        {image}
                    </div>
                    <div style={{ textAlign: "center" }}>This should be in the centered</div>
                    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
                        <Button style={{ padding: "15px", margin: "15px" }}>A</Button>
                        <Button>B</Button>
                        <Button>C</Button>
                        <Button>D</Button>
                        <Button>E</Button>
                        <Button>F</Button>
                        <Button>G</Button>
                        <Button>H</Button>
                        <Button>I</Button>
                    </div>
                </div>
            </>
        );
    }
}