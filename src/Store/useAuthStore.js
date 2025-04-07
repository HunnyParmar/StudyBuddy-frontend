import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:7000"; 

export const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  socket: null,

  connectSocket: () => {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (!user || get().socket?.connected) return; 

    const socket = io(BASE_URL, {
      query: { userId: user._id }, 
    });
    
    socket.connect();
    
    set({ socket });
    socket.on("connect", () => {
      console.log("Socket connected!", socket.id);
    });
  
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
      console.log("Online users updated:", userIds);
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
      console.log("Socket disconnected manually");
    }
  },
}));
