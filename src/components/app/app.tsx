import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import NotFoundPage from '../../pages/not-found-page/notFoundPage';
import { Favorites } from '../../pages/favorites/favorites';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Card, OfferCard, Review } from '../../types/offers-types';
import { Offer } from '../../pages/offer/offer';

type AppProps = {
  cardList: Card[];
  offerList: OfferCard[];
  reviewList: Review[];
  favoriteList: Card[];
};

function App({
  cardList,
  offerList,
  reviewList,
  favoriteList,
}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main cardList={cardList} />} />
          <Route
            path={AppRoute.Login}
            element={<Login authorizationStatus={AuthorizationStatus.NoAuth} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <Favorites favoriteList={favoriteList} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <Offer
                cardList={cardList}
                offerList={offerList}
                reviewList={reviewList}
              />
            }
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>

  );
}

export default App;
