import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { useQuery } from '@tanstack/react-query';
import './App.css';

function App() {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache(),
    });

    const {
        isLoading,
        isError,
        data: books,
        error,
    } = useQuery({
        queryKey: ['books'],
        queryFn: () =>
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
                .then((result) => result.data.books),
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (isError)
        return error instanceof Error ? (
            <h1>{error.message}</h1>
        ) : (
            <h1>Something went wrong</h1>
        );

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
