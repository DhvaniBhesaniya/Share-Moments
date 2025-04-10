import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      theme: 'light',
      selectedEvent: null,
      notifications: [],
      
      // Auth actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Theme actions
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      
      // Event actions
      setSelectedEvent: (event) => set({ selectedEvent: event }),
      
      // Notification actions
      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, { id: Date.now(), ...notification }],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'share-movements-storage',
    }
  )
);

export default useStore; 