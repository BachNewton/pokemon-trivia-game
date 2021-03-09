import React from 'react';
import './App.css';
import io from 'socket.io-client';

export default class App extends React.Component {
    componentDidMount() {
        const socket = io();

        socket.on('temp', () => {
            console.log('Hello!');
        });
    }

    render() {
        return (
            <div>
                Hello World!
            </div>
        );
    }
}