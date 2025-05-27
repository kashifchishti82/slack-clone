import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketService from "@/clients/socket-client";
import { setChannelMessages } from "@/store/channelSlice";
import { GET_CHANNEL_MESSAGES } from "@/chat-server/quries/WorkspaceQuery";
export default function MainChat() {
  const dispatch = useDispatch();
  const activeWorkspace = useSelector(
    (state) => state.workspace.activeWorkspace
  );
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  const channelMessages = useSelector((state) => state.channel.channelMessages);
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [getChannelMessages, { loadingChates, loadingError, data }] =
    useLazyQuery(GET_CHANNEL_MESSAGES);

  useEffect(() => {
    if (activeChannel) {
      setButtonDisabled(false);
      socketService.joinChannel(activeChannel.id, activeChannel.workspace.id);
      socketService.onMessage((body) => {
        let message = JSON.parse(body);
        let workspaceId = message.workspaceId;
        dispatch(
          setChannelMessages({ channelId: message.receiver, messages: message })
        );
      });
      getChannelMessages({ variables: { channel_id: activeChannel.id } });
    }
  }, [activeChannel]);

  const onKeyPressHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && activeChannel) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const body = {
      workspaceId: activeWorkspace.id,
      sender: user.id,
      receiver_type: activeChannel.__typename,
      receiver: activeChannel.id,
      type: activeChannel.type,
      content: message,
      when: Date.now(),
    };
    setMessage("");
    socketService.publishMessage(body);
  };

  useEffect(() => {
    if (data) {
      data.channelMessages.messages.map((serverMessage) => {
        let message = JSON.parse(serverMessage.message);
        console.log(message);
        dispatch(
          setChannelMessages({ channelId: message.receiver, messages: message })
        );
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col flex-1">
      {/* Chat Header */}
      <div className="bg-white p-4 shadow-md flex items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {activeChannel ? activeChannel.name : ""}
        </h2>
      </div>

      {/* Chat Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-white">
        {((activeChannel && channelMessages[activeChannel.id]) || []).map(
          (msg, index) => (
            <div className="flex items-start space-x-3" key={index}>
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/40"
                alt="User"
              />
              <div
                className={`p-2 rounded-lg ${
                  msg.sender === user.id ? "bg-blue-500 ml-auto" : "bg-gray-700"
                }`}
              >
                <h4 className="font-semibold text-gray-800 text-sm">
                  {msg.sender}{" "}
                  <span className="text-xs text-gray-500 ml-2">{msg.when}</span>
                </h4>
                <strong>{msg.content}:</strong>
              </div>
            </div>
          )
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-100 border-t flex items-center">
        <input
          type="text"
          placeholder="Message #general"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none bg-white text-sm"
          value={message}
          onKeyUp={onKeyPressHandler}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          disabled={isButtonDisabled}
          onClick={() => sendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
}
