import { PlaceCard } from '../../components/place-card/place-card';
import { TOffers } from '../../types/offers-types';

type NearbyPlacesListProps = {
  offers: TOffers[] | null;
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
}

function NearbyPlacesList ({handleCardMouseEnter, handleCardMouseLeave, offers}: NearbyPlacesListProps): JSX.Element {

  return (
    <div className="near-places__list places__list">
      {offers?.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={'near-places'}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;
