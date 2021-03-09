import React from 'react';
import './App.css';
import io from 'socket.io-client';

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
        var image = this.state.image === null ? <></> : <img src={this.state.image} alt="Pokémon" />

        return (
            <div>
                Hello World!
                {image}
            </div>
        );
    }
}