"use client"; // This makes it a client component

import { ApolloProvider } from "@apollo/client";
import client from "@/clients/apollo-client";
export default function ApolloProviderWrapper({ children }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}