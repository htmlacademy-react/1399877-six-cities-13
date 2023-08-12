import {createReducer} from '@reduxjs/toolkit';
import { TOffers } from '../types/offers-types';
import { AuthorizationStatus, DEFAULT_ACTIVE_CITY, DEFAULT_SORTING } from '../const';
import { changeSort, fetchOffers, fetchReviews, loadOffers, requireAuthorization, setActiveCity, setError, setOffersDataLoadingStatus } from './action';
import { Review } from '../types/reviews';

type initalState = {
  activeCity: string;
  offers: TOffers[];
  comments: Review[];
  sorting: string;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
}

const initalState: initalState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: [],
  comments: [],
  sorting: DEFAULT_SORTING,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(fetchOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(fetchReviews, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
