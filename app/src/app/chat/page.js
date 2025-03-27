"use client"

import  {useEffect} from "react";
import {useQuery} from "@apollo/client";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMain from "@/components/MainChat";
import {useDispatch} from "react-redux";
import {setUser} from "@/store/userSlice";
import {GET_AUTH_USER} from "@/chat-server/quries/User";

export default function Page() {
    const dispatch = useDispatch();
    const {data} = useQuery(GET_AUTH_USER);
    useEffect(() => {
        if (data) {
            console.log(data)
            dispatch(setUser(data.me));
        }
    }, [data])
    return (
        <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <ChatSidebar/>

                {/* Main Chat Area */}
                <ChatMain/>
        </div>


    );

}