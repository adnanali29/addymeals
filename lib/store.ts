import { create } from 'zustand';

interface AppState {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOrderModalOpen: boolean;
    setIsOrderModalOpen: (open: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    activeTab: 'Home',
    setActiveTab: (tab) => set({ activeTab: tab }),
    isOrderModalOpen: false,
    setIsOrderModalOpen: (open) => set({ isOrderModalOpen: open }),
    isAdmin: false,
    setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
