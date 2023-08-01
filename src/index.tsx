import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import { OfferList } from './mocks/offer-list/offer-list';
import { ReviewsList } from './mocks/reviews/reviews';
import { FavoritesList } from './mocks/favorites/favorites';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        offerList={OfferList}
        reviewList={ReviewsList}
        favoriteList={FavoritesList}
      />
    </Provider>
  </React.StrictMode>
);
