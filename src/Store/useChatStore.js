import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

const getToken = () => localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://study-buddy-aryh.onrender.com/user",
  // baseURL: "https://localhost:7000/user",
});

// Zustand Store
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  unreadCounts: {}, // Track unread messages per user

  setSelectedUser: (user) => {
    const { unsubscribeFromMessages, subscribeToMessages, getMessages } = get();
    unsubscribeFromMessages();

    // Clear unread count when selecting a user
    if (user) {
      console.log('Setting selected user:', user._id);
      set((state) => {
        const newState = {
          selectedUser: user,
          messages: [],
          unreadCounts: { ...state.unreadCounts, [user._id]: 0 }
        };
        console.log('New state after selecting user:', newState);
        return newState;
      });
      getMessages(user._id);
      subscribeToMessages();
    } else {
      set({ selectedUser: null, messages: [] });
    }
  },

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
      console.log('Fetched messages for user:', userId, res.data);
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

    console.log('Socket connection status:', !!socket);
    console.log('Current socket:', socket);

    if (!socket) {
      console.log('No socket connection available');
      return;
    }

    console.log('Subscribing to messages. Selected user:', selectedUser?._id);
    console.log('Current messages:', messages);
    console.log('Current unread counts:', get().unreadCounts);

    // Remove any existing listeners to prevent duplicates
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      console.log('New message received:', newMessage);
      console.log('Current selected user:', selectedUser?._id);
      console.log('Current unread counts:', get().unreadCounts);

      const isRelevant =
        newMessage.senderId === selectedUser?._id ||
        newMessage.receiverId === selectedUser?._id;

      // Prevent duplicates
      const alreadyExists = get().messages.some(
        (msg) => msg._id === newMessage._id
      );

      if (alreadyExists) {
        console.log('Message already exists, skipping');
        return;
      }

      // If message is from selected user, add to messages
      if (isRelevant) {
        console.log('Adding message to current chat');
        set((state) => ({ messages: [...state.messages, newMessage] }));
      }

      // If message is from another user, increment unread count
      if (newMessage.senderId !== selectedUser?._id) {
        console.log('Incrementing unread count for user:', newMessage.senderId);
        set((state) => {
          const newUnreadCounts = {
            ...state.unreadCounts,
            [newMessage.senderId]: (state.unreadCounts[newMessage.senderId] || 0) + 1
          };
          console.log('New unread counts:', newUnreadCounts);
          return { unreadCounts: newUnreadCounts };
        });
      }
    });

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
      console.log('Unsubscribing from messages');
      socket.off("newMessage");
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