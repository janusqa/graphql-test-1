import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import './App.css';

function App() {
    const [health, setHealth] = useState('');

    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
    });

    useEffect(function () {
        client
            .query({
                query: gql`
                    query {
                        books {
                            title
                            author
                        }
                    }
                `,
            })
            .then((result) => setHealth(JSON.stringify(result)));
    }, []);

    return <div className="App">{health}</div>;
}

export default App;
