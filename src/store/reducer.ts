import {createReducer} from '@reduxjs/toolkit';
import { OfferList } from '../mocks/offer-list/offer-list';
import { Card } from '../types/offers-types';
import {changeCity} from './action';
import { DEFAULT_ACTIVE_CITY } from '../const';

function getStartPlaces(offersList: Card[], city: string) {
  return offersList.filter((offer) => offer.city.name === city);
}

const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  offers: getStartPlaces(OfferList, DEFAULT_ACTIVE_CITY)
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.offers = getStartPlaces(OfferList, state.city);
    });
});

export {reducer};
