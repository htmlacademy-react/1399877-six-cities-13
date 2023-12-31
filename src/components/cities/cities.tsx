import { useState, useMemo, useCallback } from 'react';
import { sorting } from '../../utils/utils';
import { City, Offer } from '../../types/offers-types';
import { PlaceSortingMemo as PlaceSorting } from '../places-sorting/places-sorting';
import { OffersListMemo as OffersList } from '../offers-list/offers-list';
import Map from '../map/map';
import MainEmpty from '../main-empty/main-empty';

type CitiesProps = {
  offers: Offer[];
  activeCity: City;
};

function Cities({ offers, activeCity }: CitiesProps): JSX.Element {
  const [currentSort, setCurrentSort] = useState('popular');

  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const sortOffersByCity = useMemo(
    () => offers.slice().filter((item) => item.city.name === activeCity.name),
    [activeCity.name, offers]
  );

  const sortOffersByCategory = useMemo(
    () => sorting[currentSort](sortOffersByCity),
    [currentSort, sortOffersByCity]
  );

  const handleChangeSort = useCallback((newSort: string) => {
    setCurrentSort(newSort);
  }, []);

  const handleOfferCardHover = useCallback(
    (id: string | undefined) => {
      if (!id) {
        setSelectedPoint(undefined);
      }

      const currentPoint = sortOffersByCity.find(
        (sortOffer) => sortOffer.id === id
      );

      setSelectedPoint(currentPoint);
    },
    [sortOffersByCity]
  );

  return sortOffersByCity.length ? (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {sortOffersByCity.length} place{sortOffersByCity.length > 1 && 's'}{' '}
            to stay in {activeCity.name}
          </b>
          <PlaceSorting onChange={handleChangeSort} />
          <OffersList
            offers={sortOffersByCategory}
            type="cities"
            onOfferCardHover={handleOfferCardHover}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              city={activeCity}
              points={sortOffersByCity}
              detailedOffer={undefined}
              selectedPoint={selectedPoint}
            />
          </section>
        </div>
      </div>
    </div>
  ) : (
    <MainEmpty />
  );
}

export default Cities;
