import { createContext, ReactNode, useState } from "react";

export interface FavoritesContextProps {
    favoriteCards: string[]
    isOnFavoriteList: (id: string) => boolean
    toggleFavorites: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextProps | null>(null)

interface FavoritesProviderProps {
    children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
    const [favoriteCards, setFavoriteCards] = useState<string[]>(['d3d8c502-e053-425f-ba40-27a627ca12a0']);

    function isOnFavoriteList(id: string) {
        return !!favoriteCards.find((item) => id === item)
    }

    function toggleFavorites(id: string) {
        isOnFavoriteList(id) ? setFavoriteCards(state => state.filter((item) =>
            id !== item
        )) : setFavoriteCards(state => [...state, id])
    }

    return (
        <FavoritesContext.Provider
            value={{favoriteCards, isOnFavoriteList, toggleFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}