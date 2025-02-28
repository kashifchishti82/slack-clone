"use client"
 import { useState, useEffect } from "react"
import {useQuery} from "@apollo/client";

export default function Page() {
    [messages, setMessages] = useState([])
    const { loading, error, channels } = useQuery(GET_MESSAGES)

    return (
        <div className="bg-gray-100">

            <div className="flex h-screen">

                <div className="w-64 bg-gray-800 text-white p-4">
                    <h2 className="text-lg font-bold">Channels</h2>
                    <ul>
                        <li className="mt-2"># General</li>
                        <li className="mt-2"># Random</li>
                    </ul>
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex-1 p-4 overflow-y-scroll">
                        <template x-for="message in messages" key="message.id">
                            <div className="flex items-start space-x-2">
                                <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
                                <div>
                                    <strong x-text="message.user_id"></strong>
                                    <p x-text="message.message" className="bg-white p-2 rounded shadow"></p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>

                <div className="p-4 bg-white border-t">
                    <input x-model="message" type="text" className="w-full p-2 border rounded"
                           placeholder="Type a message..."/>
                    <button class="bg-blue-500 text-white p-2 mt-2">Send
                    </button>
                </div>
            </div>
        </div>


    )
}