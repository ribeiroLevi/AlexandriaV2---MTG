import { useFavorites } from "../context/UseFavorites"

export function FavoriteCards() {
    const { favoriteCards } = useFavorites()

    return (
        <div>
            {favoriteCards.map((card: String) =>
                <p>{card}</p>
            )}
            <h1>TESTE</h1>
        </div>

    )
}