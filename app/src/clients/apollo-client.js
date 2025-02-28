import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const authLink = setContext((_, { headers }) => {
    // Get the authentication token from cookies
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});
// Create an error link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            // Handle GraphQL errors
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            // Here you can show a notification or log the error globally
            alert(`GraphQL error: ${message}`); // Example alert for demo purposes
        });
    }

    if (networkError) {
        // Handle network errors
        console.error(`[Network error]: ${networkError}`);
        alert(`Network error: ${networkError.message}`); // Example alert for demo purposes
    }
});

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    //credentials: "include",
});

const client = new ApolloClient({
    link: authLink.concat(errorLink.concat(httpLink)),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    messages: {
                        merge(existing = [], incoming) {
                            return [...incoming];
                        },
                    },
                },
            },
        },
    }),
});

export default client;
