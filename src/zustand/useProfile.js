import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

export const useProfileStore = create(
    persist(
        (set) => ({
            profile: {},
            updateProfile: (newProfile) => set({ profile: newProfile }),
        }),
        {
            name: 'profile',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);

export default useProfileStore;