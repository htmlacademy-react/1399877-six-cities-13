import Main from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import NotFoundPage from '../../pages/not-found-page/notFoundPage';
import { Favorites } from '../../pages/favorites/favorites-page';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { useAppSelector } from '../../hooks';
import LoadingPage from '../../pages/loading-page/loading-page';


function App(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if(authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingPage/>
    );
  }

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
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPage />
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
