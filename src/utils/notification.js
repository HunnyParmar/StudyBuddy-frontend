// Create and cache the audio element
let notificationSound = null;

export const playNotificationSound = () => {
    try {
        // Create audio element if it doesn't exist
        if (!notificationSound) {
            notificationSound = new Audio('/notification.mp3');
            notificationSound.volume = 0.5; // Set volume to 50%
        }

        // Reset the audio to the beginning and play
        notificationSound.currentTime = 0;
        notificationSound.play().catch(error => {
            console.error('Error playing notification sound:', error);
        });
    } catch (error) {
        console.error('Error initializing notification sound:', error);
    }
};

// Request notification permission
export const requestNotificationPermission = async () => {
    try {
        if (!("Notification" in window)) {
            console.log("This browser does not support notifications");
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === "granted";
    } catch (error) {
        console.error("Error requesting notification permission:", error);
        return false;
    }
};

// Show browser notification
export const showNotification = (title, options = {}) => {
    try {
        if (Notification.permission === "granted") {
            const notification = new Notification(title, {
                icon: "/logo.png", // Make sure you have a logo.png in your public folder
                badge: "/logo.png",
                ...options
            });

            // Close notification after 5 seconds
            setTimeout(() => notification.close(), 5000);

            // Handle notification click
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
        }
    } catch (error) {
        console.error("Error showing notification:", error);
    }
}; 