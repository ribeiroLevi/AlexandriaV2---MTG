import { Card } from '../views/cardsList';

interface CardViewProps {
  card: Card;
}

export function CardView({ card }: CardViewProps) {
  const { id, image_uris } = card;

  return (
    <div>
      {image_uris && image_uris.normal && (
        <img id={id} src={image_uris.normal} className="rounded-3xl" />
      )}
    </div>
  );
}
