import { useChatStore } from "../../../Store/useChatStore";
import { useAuthStore } from "../../../Store/useAuthStore";

const AudioCallUI = () => {
  const socket = useAuthStore.getState().socket;
  const { audioCallUser } = useChatStore();
  const endCall = useAuthStore((state) => state.endCall); 

  const handleEndCall = () => {
    if (socket && audioCallUser?._id) {
      socket.emit("end-call", { to: audioCallUser._id });
    }
    endCall();
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h2>Calling {audioCallUser.FullName}...</h2>
        <button
          onClick={handleEndCall}
          className="mt-4 px-4 py-2 bg-red-500 rounded"
        >
          End Call
        </button>
      </div>
    </div>
  );
};

export default AudioCallUI;