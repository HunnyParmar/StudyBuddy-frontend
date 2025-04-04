import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
// Get token from localStorage once
const token = localStorage.getItem("token");

// Create a global axios instance with token
const api = axios.create({
  baseURL: "http://localhost:7000/user", // Base URL for API requests
  headers: { Authorization: `Bearer ${token}` }, // Set global token
});

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await api.get("/users"); // Use global axios instance
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
      const res = await api.get(`/${userId}`); // Use global axios instance
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
      const { selectedUser, messages } = get(); // Get current state
      if (!selectedUser) throw new Error("No user selected"); // Prevent sending without a selected user

      const res = await api.post(`/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  subscribeToMessages: () => {
  const { selectedUser, messages } = get(); // Get current state
  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== selectedUser._id) return;

    set({ messages: [...messages, newMessage] });
  });
},

unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  socket.off("newMessage");
},

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
