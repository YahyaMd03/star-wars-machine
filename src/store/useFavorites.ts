import { create } from "zustand";

type FavoritesStore = {
    favorites: string[];
    toggleFavorite: (url: string) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
    favorites: [],
    toggleFavorite: (url) =>
        set((state) => ({
            favorites: state.favorites.includes(url)
                ? state.favorites.filter((favUrl) => favUrl !== url)
                : [...state.favorites, url],
        })),
    removeFavorite: (url: string) => set((state) => ({
        favorites: state.favorites.filter(favorite => favorite !== url),
    })),
}));
