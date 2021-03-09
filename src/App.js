import React from 'react';
import './App.css';
import io from 'socket.io-client';

export default class App extends React.Component {
    componentDidMount() {
        const socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:5000');

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