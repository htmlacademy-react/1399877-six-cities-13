import {createReducer} from '@reduxjs/toolkit';
import { Card } from '../types/offers-types';
import { DEFAULT_ACTIVE_CITY } from '../const';
import { getOffers, setActiveCity } from './action';
import { OfferList } from '../mocks/offer-list/offer-list';

type initalState = {
  activeCity: string;
  offers: Card[];
}

const initalState: initalState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: OfferList
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    });
});
