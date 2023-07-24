import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { CardList } from './mocks/offers';
import { OfferList } from './mocks/offer-list/offer-list';
import { ReviewsList } from './mocks/reviews/reviews';
import { FavoritesList } from './mocks/favorites/favorites';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      cardList={CardList}
      offerList={OfferList}
      reviewList={ReviewsList}
      favoriteList={FavoritesList}
    />
  </React.StrictMode>
);
