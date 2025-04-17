import { X,PhoneCall } from "lucide-react";
import { useAuthStore } from "../../../Store/useAuthStore";
import { useChatStore } from "../../../Store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser,setAudioCallUser } = useChatStore();
  const { socket,onlineUsers } = useAuthStore();

  const handleAudioCall = () => {
    const authUser = JSON.parse(localStorage.getItem("user"));
    console.log("Audio call started with", selectedUser.FullName);
    setAudioCallUser(selectedUser);

    console.log("CALLING FROM:", authUser.FullName, "TO:", selectedUser.FullName);

    if (socket && socket.connected && authUser) {
      socket.emit("audio-call-request", {
        to: selectedUser._id,
        from: authUser,
      });
    } else {
      console.warn("Socket not connected or user not found.");
    }
  };


  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.ProfilePicture || "/avatar.png"} alt={selectedUser.FullName} onError={(e) => (e.target.src = "/avatar.png")} />
            </div>
          </div>

          
          <div>
            <h3 className="font-medium">{selectedUser.FullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        {/* Right - Action Buttons */}
        <div className="flex items-center gap-3">
          <button onClick={handleAudioCall}>
            <PhoneCall className="text-green-600" />
          </button>
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;