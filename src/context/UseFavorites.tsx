import { useContext } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function useFavorites() {
    const context = useContext(FavoritesContext)

    if (!context) {
        throw new Error("No context found")
    }

    return context
}
