import { PlaceCard } from '../place-card/place-card';
import { TOffers } from '../../types/offers-types';

type OffersListProps = {
  offers: TOffers[];
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
}

export function OffersList({offers, handleCardMouseEnter, handleCardMouseLeave}:OffersListProps): JSX.Element{


  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
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
