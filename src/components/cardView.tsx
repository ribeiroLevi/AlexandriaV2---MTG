import { Card } from '../views/cardsList';

interface CardViewProps {
  card: Card;
}

export function CardView({ card }: CardViewProps) {
  const { id, image_uris } = card;

  return (
    <div className=" hover:scale-125 w-80 mx-6 my-6  hover:cursor-pointer transition-all ease-in-out delay-150">
      {image_uris && image_uris.normal && (
        <img id={id} src={image_uris.normal} className="rounded-3xl" />
      )}
    </div>
  );
}
