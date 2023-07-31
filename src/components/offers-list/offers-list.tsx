import { Card } from '../../types/offers-types';
import { PlaceCard } from '../place-card/place-card';
type OffersListProps = {
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
  currentOffers: Card[];
}

export function OffersList({handleCardMouseEnter, handleCardMouseLeave, currentOffers}:OffersListProps): JSX.Element{
  return(
    <div className="cities__places-list places__list tabs__content">
      {currentOffers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={'cities'}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}
