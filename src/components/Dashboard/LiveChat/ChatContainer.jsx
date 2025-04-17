import { React, useEffect, useState, useRef } from "react";
import { useChatStore } from "../../../Store/useChatStore";
import { useAuthStore } from "../../../Store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../../../lib/utils";
import AudioCallUI from "./AudioCallUI";

const ChatContainer = () => {
  const { socket } = useAuthStore();
  const endCall = useChatStore((state) => state.endCall);

  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    audioCallUser,
    incomingCall,
    setIncomingCall,
    clearIncomingCall,
    setAudioCallUser,
  } = useChatStore();

  const [authUser, setAuthUser] = useState(null);
  const messageEndRef = useRef(null);

  const rejectCall = () => {
    if (socket && incomingCall?._id) {
      socket.emit("reject-call", { to: incomingCall._id });
    }
    clearIncomingCall();
  };

  useEffect(() => {
    if (socket) {
      socket.on("call-rejected", () => {
        console.log("Call was rejected by the user.");
        endCall(); // this should clean up the UI and reset state
      });
  
      // Cleanup
      return () => {
        socket.off("call-rejected");
      };
    }
  }, [socket]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!socket) return;
  
    const handleIncomingCall = ({ from }) => {
      setIncomingCall(from);
    };
  
    socket.on("incoming-audio-call", handleIncomingCall);
  
    return () => {
      socket.off("incoming-audio-call", handleIncomingCall);
    };
  }, [socket, setIncomingCall]);
  
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (audioCallUser) {
    return <AudioCallUI />;
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const acceptCall = () => {
    setAudioCallUser(incomingCall); 
    clearIncomingCall();
    };
  


  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {incomingCall && (
  <div className="absolute top-10 right-10 bg-white p-4 shadow rounded z-50">
    <p className="mb-2 font-semibold">{incomingCall.FullName} is calling you...</p>
    <div className="flex gap-2">
      <button
        onClick={acceptCall}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Accept
      </button>
      <button
        onClick={rejectCall}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Reject
      </button>
    </div>
  </div>
)}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?._id
                      ? authUser?.ProfilePicture || "/avatar.png"
                      : selectedUser?.ProfilePicture || "/avatar.png"
                  }
                  alt="profile pic"
                  onError={(e) => (e.target.src = "/avatar.png")}
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {message.createdAt ? formatMessageTime(message.createdAt) : ""}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        {/* Empty div used for scrolling into view */}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;