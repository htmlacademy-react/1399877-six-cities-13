import {createReducer} from '@reduxjs/toolkit';
import { TOffers } from '../types/offers-types';
import { DEFAULT_ACTIVE_CITY, DEFAULT_SORTING } from '../const';
import { changeSort, fetchOffers, fetchReviews, setActiveCity } from './action';
import { offers } from '../mocks/offers/offers';
import { Reviews } from '../mocks/reviews/reviews';
import { Review } from '../types/reviews';

type initalState = {
  activeCity: string;
  offers: TOffers[];
  reviews: Review[];
  sorting: string;
}

const initalState: initalState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: offers,
  reviews: Reviews,
  sorting: DEFAULT_SORTING,
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchOffers, (state) => {
      state.offers = offers;
    })
    .addCase(changeSort, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = Reviews;
    });
});
