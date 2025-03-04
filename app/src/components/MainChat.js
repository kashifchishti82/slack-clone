export default function MainChat() {
    return (
        <div className="flex flex-col flex-1">
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-md flex items-center">
                <h2 className="text-lg font-semibold text-gray-800"># general</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-white">
                {/* Message 1 (Receiver) */}
                <div className="flex items-start space-x-3">
                    <img className="w-8 h-8 rounded-full" src="https://via.placeholder.com/40" alt="User"/>
                    <div>
                        <h4 className="font-semibold text-gray-800 text-sm">
                            User 1 <span className="text-xs text-gray-500 ml-2">10:30 AM</span>
                        </h4>
                        <p className="text-gray-900 text-sm leading-tight">Hello everyone! How are you all doing?</p>
                    </div>
                </div>

                {/* Message 2 (Sender - You) */}
                <div className="flex items-start space-x-3">
                    <img className="w-8 h-8 rounded-full" src="https://via.placeholder.com/40" alt="You"/>
                    <div>
                        <h4 className="font-semibold text-blue-600 text-sm">
                            You <span className="text-xs text-gray-500 ml-2">10:32 AM</span>
                        </h4>
                        <p className="text-gray-900 text-sm leading-tight">Hey! I'm doing great. What about you?</p>
                    </div>
                </div>

                {/* Message 3 (Receiver) */}
                <div className="flex items-start space-x-3">
                    <img className="w-8 h-8 rounded-full" src="https://via.placeholder.com/40" alt="User"/>
                    <div>
                        <h4 className="font-semibold text-gray-800 text-sm">
                            User 1 <span className="text-xs text-gray-500 ml-2">10:35 AM</span>
                        </h4>
                        <p className="text-gray-900 text-sm leading-tight">Just chilling and working on a project.</p>
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-100 border-t flex items-center">
                <input
                    type="text"
                    placeholder="Message #general"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none bg-white text-sm"
                />
                <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg">Send</button>
            </div>
        </div>
    )
}