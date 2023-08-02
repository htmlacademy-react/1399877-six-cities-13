import { Helmet } from 'react-helmet-async';
import { Card, CityNames} from '../../types/offers-types';
import { Header } from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';
import { useState } from 'react';
import { CITIES } from '../../const';
import { MainEmpty } from '../../components/main-empty/main-empty';
import Map from '../../components/map/map';
import { OffersList } from '../../components/offers-list/offers-list';

type MainProps = {
  cardList: Card[];
}

function Main({cardList}: MainProps): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<CityNames>(CITIES[3]);
  const currentOffers = cardList.filter(({city}) => activeCity === city.name);
  const handleCardMouseEnter = (id: string) => setSelectedPoint(id);
  const handleCardMouseLeave = () => setSelectedPoint(null);
  const isNotEmpty = !!currentOffers.length;
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs activeCity={activeCity} setActiveCity={setActiveCity} />
        <div className="cities">
          {isNotEmpty ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentOffers.length} places to stay in Amsterdam</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                  Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <OffersList
                  currentOffers={currentOffers}
                  handleCardMouseEnter={handleCardMouseEnter}
                  handleCardMouseLeave={handleCardMouseLeave}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  selectedPoint={selectedPoint}
                  points={currentOffers}
                />
              </div>
            </div>
          ) : (
            <MainEmpty activeCity={activeCity} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;
