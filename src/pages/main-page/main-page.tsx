import { Helmet } from 'react-helmet-async';
import { Header } from '../../components/header/header';
import { Tabs } from '../../components/tabs/tabs';
import { useEffect, useState } from 'react';
import Map from '../../components/map/map';
import { OffersList } from '../../components/offers-list/offers-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PlacesSorting } from '../../components/places-sorting/places-sorting';
import { fetchOffers } from '../../store/action';
import { filterOffersByCity } from '../../utils/utils';


function Main(): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => setSelectedPoint(id);
  const handleCardMouseLeave = () => setSelectedPoint(null);

  const dispatch = useAppDispatch();
  const currentOffers = useAppSelector((state) => state.offers);
  const currentCity: string = useAppSelector((state) => state.activeCity);
  const sortOffers = useAppSelector((state) => state.sorting);
  const offersByCity = filterOffersByCity(currentOffers, currentCity, sortOffers);
  const city = offersByCity[0]?.city;


  useEffect(() => {
    dispatch(fetchOffers(currentOffers));
  },[dispatch, currentOffers]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs currentCity={currentCity} />
        <div className="cities">

          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>
              <PlacesSorting sorting={sortOffers}/>
              <OffersList
                handleCardMouseEnter={handleCardMouseEnter}
                handleCardMouseLeave={handleCardMouseLeave}
                offers={offersByCity}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={offersByCity}
                city={city}
                selectedPoint={selectedPoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;


