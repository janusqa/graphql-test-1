import { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import './App.css';

function App() {
    const [books, setBooks] = useState([]);

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
            .then((result) => setBooks(result.data.books));
    }, []);

    return (
        <ul className="App">
            {books.map((book) => (
                <li key={book.title}>
                    {book.title} - {book.author}
                </li>
            ))}
        </ul>
    );
}

export default App;
