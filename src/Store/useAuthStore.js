import { create } from "zustand";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore";
import { playNotificationSound, requestNotificationPermission, showNotification } from "../utils/notification";


const BASE_URL = "https://study-buddy-aryh.onrender.com"; // Use the correct HTTPS URL

export const useAuthStore = create((set, get) => ({
  // other state variables and methods

  connectSocket: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || get().socket?.connected) return;

    console.log('Connecting socket for user:', user._id);

    // Request notification permission when connecting
    requestNotificationPermission();

    const socket = io(BASE_URL, {
      query: { userId: user._id },
      transports: ["websocket"], // Force WebSocket connection
    });

    socket.connect();
    set({ socket });

    socket.on("connect", () => {
      console.log('Socket connected successfully');
    });

    socket.on("disconnect", () => {
      console.log('Socket disconnected');
    });

    socket.on("getOnlineUsers", (userIds) => {
      console.log('Online users updated:', userIds);
      set({ onlineUsers: userIds });
    });

    // Handle incoming messages
    socket.on("newMessage", (message) => {
      console.log('Received new message:', message);
      const chatStore = useChatStore.getState();
      const { selectedUser, users } = chatStore;

      // If message is from another user, increment unread count and show notifications
      if (message.senderId !== selectedUser?._id) {
        const currentUnreadCounts = chatStore.unreadCounts || {};
        const newUnreadCounts = {
          ...currentUnreadCounts,
          [message.senderId]: (currentUnreadCounts[message.senderId] || 0) + 1
        };
        console.log('Updating unread counts:', newUnreadCounts);
        useChatStore.setState({ unreadCounts: newUnreadCounts });

        // Play notification sound
        playNotificationSound();

        // Show browser notification
        const sender = users.find(u => u._id === message.senderId);
        if (sender) {
          showNotification(`New message from ${sender.FullName}`, {
            body: message.message,
            tag: message._id,
            requireInteraction: false,
            silent: true
          });
        }
      }
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