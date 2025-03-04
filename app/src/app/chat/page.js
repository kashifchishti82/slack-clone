"use client"
import {useState, useEffect} from "react"
import {useQuery} from "@apollo/client";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import {GET_WORKSPACES, GET_CHANNELS} from "@/chat-server/quries/WorkspaceQuery";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMain from "@/components/MainChat";

export default function Page() {
    // [messages, setMessages] = useState([])
    // const { loading, error, channels } = useQuery(GET_MESSAGES)

    return (
        <div className="flex h-screen bg-gray-100">
            <ApolloProviderWrapper>
                {/* Sidebar */}
                <ChatSidebar/>

                {/* Main Chat Area */}
                <ChatMain/>
            </ApolloProviderWrapper>
        </div>


    );

}