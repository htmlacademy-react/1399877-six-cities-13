import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card } from '../../types/offers-types';
import { AppRoute, CITIES } from '../../const';
import { Header } from '../../components/header/header';
import { FavoritesEmpty } from '../../components/favorites-empty/favorites-empty';
import { PlaceCard } from '../../components/place-card/place-card';
import { Footer } from '../../components/footer/footer';

type FavoritesProps = {
  favoriteList: Card[];
};


export function Favorites({ favoriteList }: FavoritesProps): JSX.Element {
  const isNotEmpty = !!favoriteList.length;

  return (
    <div className={cn('page', { 'page--favorites-empty': !isNotEmpty })}>
      <Helmet>
        <title>Избранные гостиницы</title>
      </Helmet>
      <Header />
      <main
        className={cn('page__main', 'page__main--favorites', {
          'page__main--favorites-empty': !isNotEmpty,
        })}
      >
        <div className="page__favorites-container container">
          <section
            className={cn('favorites', {
              'favorites--empty': !isNotEmpty,
            })}
          >
            {isNotEmpty ? (
              <>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {CITIES.map((city) => {
                    const favoritesSortCity = favoriteList.filter(
                      (card) => city === card.city.name
                    );

                    if (favoritesSortCity.length) {
                      return (
                        <li className="favorites__locations-items" key={city}>
                          <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                              <Link
                                className="locations__item-link"
                                to={AppRoute.Root}
                              >
                                <span>{city}</span>
                              </Link>
                            </div>
                          </div>
                          <div className="favorites__places">
                            {favoritesSortCity.map((card) => (
                              <PlaceCard
                                card={card}
                                className="favorites"
                                key={card.id}
                              />
                            ))}
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </>
            ) : (
              <FavoritesEmpty />
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
