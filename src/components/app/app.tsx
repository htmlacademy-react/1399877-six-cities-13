import Main from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import NotFoundPage from '../../pages/not-found-page/notFoundPage';
import { Favorites } from '../../pages/favorites/favorites';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Card} from '../../types/offers-types';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { Review } from '../../types/reviews';

type AppProps = {
  offerList: Card[];
  reviewList: Review[];
  favoriteList: Card[];
};

function App({
  offerList,
  reviewList,
  favoriteList,
}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
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
              <OfferPage
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
