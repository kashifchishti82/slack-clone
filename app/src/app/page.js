"use client"
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import Login from "@/components/Login";

export default function Home() {
    return (
        <ApolloProviderWrapper>
            <Login/>
        </ApolloProviderWrapper>
    );
}
