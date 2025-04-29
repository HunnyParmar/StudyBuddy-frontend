import { create } from "zustand";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = "https://study-buddy-aryh.onrender.com";

export const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  socket: null,
  incomingCall: null,
  audioCallUser: null,

  // Connect to socket
  connectSocket: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: user._id },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // Handle incoming audio call
    socket.on("incoming-audio-call", ({ from }) => {
      set({ incomingCall: from });
    });

    socket.on("call-ended", () => {
      useChatStore.getState().setAudioCallUser(null);
      useChatStore.getState().clearIncomingCall?.(); // optional if ringing
    });
       

  },

  endCall: () => {
    const socket = get().socket;
    const audioCallUser = useChatStore.getState().audioCallUser;
    if (!audioCallUser || !socket) return;
  
    socket.emit("end-call", { to: audioCallUser._id });
  
    // Local cleanup for current user
    useChatStore.getState().setAudioCallUser(null);
    useChatStore.getState().clearIncomingCall?.(); // optional
  },  

  // Disconnect the socket
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null, incomingCall: null, audioCallUser: null });
      console.log("Socket disconnected manually");
    }
  },

  // Accept incoming call
  acceptCall: () => {
    const { incomingCall, socket } = get();
    if (!incomingCall || !socket) return;

    socket.emit("accept-call", { to: incomingCall._id });
    set({ audioCallUser: incomingCall, incomingCall: null });
  },

  // Reject incoming call
  rejectCall: () => {
    const { incomingCall, socket } = get();
    if (!incomingCall || !socket) return;

    socket.emit("reject-call", { to: incomingCall._id });
    set({ incomingCall: null });
  },

  // Clear audio call user (used for ending call)
  setAudioCallUser: (user) => set({ audioCallUser: user }),
}));