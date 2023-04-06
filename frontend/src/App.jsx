import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const [health, setHealth] = useState('');

    useEffect(function () {
        fetch('http://localhost:4000/health')
            .then((response) => response.json())
            .then((data) => setHealth(JSON.stringify(data)));
    }, []);

    return <div className="App">{health}</div>;
}

export default App;
