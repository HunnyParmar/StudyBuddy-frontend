import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://study-buddy-aryh.onrender.com/user",
});

// Zustand Store
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),

  audioCallUser: null,
  setAudioCallUser: (user) => set({ audioCallUser: user }),

  incomingCall: null,
  setIncomingCall: (data) => {
    // Play ringtone when a call comes in
    const ringtone = new Audio("/maes.mp3");
    ringtone.loop = true;
    ringtone.play();

    set({ incomingCall: data, ringtone });
  },
  clearIncomingCall: () => {
    const { ringtone } = get();
    if (ringtone) {
      ringtone.pause();
      ringtone.currentTime = 0;
    }
    set({ incomingCall: null, ringtone: null });
  },
  

  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      set({ users: res.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await api.get(`/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      set({ messages: res.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    set({ isMessagesLoading: true });
    try {
      const { selectedUser, messages } = get();
      if (!selectedUser) throw new Error("No user selected");

      const res = await api.post(
        `/send/${selectedUser._id}`,
        messageData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      set({ messages: [...messages, res.data] });

      const socket = useAuthStore.getState().socket;
      if (socket && selectedUser) {
        socket.emit("sendMessage", {
          receiverId: selectedUser._id,
          message: res.data,
          
        });
        console.log(sendMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, messages } = get();
    const socket = useAuthStore.getState().socket;
    if (!selectedUser || !socket) return;
  
    socket.on("newMessage", (newMessage) => {
      const isRelevant =
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id;
        
      // Prevent duplicates
      const alreadyExists = get().messages.some(
        (msg) => msg._id === newMessage._id
      );
  
      if (!isRelevant || alreadyExists) return;
  
      set((state) => ({ messages: [...state.messages, newMessage] }));
    });
        // 🔔 Listen for incoming call
        socket.on("incomingCall", (callData) => {
          set({ incomingCall: callData });
        });

        socket.on("call-ended", () => {
          const { ringtone } = get();
          if (ringtone) {
            ringtone.pause();
            ringtone.currentTime = 0;
          }
          set({ audioCallUser: null, incomingCall: null, ringtone: null });
          toast("Call ended");
        });        
        
        socket.on("call-rejected", () => {
          set({ audioCallUser: null });
          toast("Call rejected");
        });
    },
  

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
      socket.off("incomingCall");
    }
  },

  setSelectedUser: (selectedUser) => {
    const {
      unsubscribeFromMessages,
      subscribeToMessages,
      getMessages,
    } = get();

    unsubscribeFromMessages();
    set({ selectedUser, messages: [] });

    if (selectedUser) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
  },

  endCall: () => {
    const { ringtone } = get();
    if (ringtone) {
      ringtone.pause();
      ringtone.currentTime = 0;
    }
    set({
      audioCallUser: null,
      incomingCall: null,
      ringtone: null,
    });
  },
}));