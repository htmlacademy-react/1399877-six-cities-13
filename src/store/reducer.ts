import {createReducer} from '@reduxjs/toolkit';
import { TOffers } from '../types/offers-types';
import { AuthorizationStatus, DEFAULT_ACTIVE_CITY, DEFAULT_SORTING } from '../const';
import { changeSort, loadComments, loadNearbyOffers, loadOffer, loadOffers, requireAuthorization, setActiveCity, setDetailsOfferDataLoadingStatus, setOfferNearbyError, setOffersDataLoadingStatus, setReviewsDataLoadingStatus, setUserInfo } from './action';
import { Review } from '../types/reviews';
import { UserData } from '../types/user-data';

type initalState = {
  activeCity: string;
  offers: TOffers[];
  offer: TOffers | null;
  comments: Review[];
  sorting: string;
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
  isOffersDataLoading: boolean;
  isDetailsOfferDataLoading: boolean;
  nearby: TOffers[] | null;
  isOfferNearbyError: boolean;
  isReviewsDataLoading: boolean;
}

const initalState: initalState = {
  activeCity: DEFAULT_ACTIVE_CITY,
  offers: [],
  offer: null,
  comments: [],
  sorting: DEFAULT_SORTING,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  isOffersDataLoading: false,
  isDetailsOfferDataLoading: false,
  nearby: [],
  isOfferNearbyError: false,
  isReviewsDataLoading: false,
};

export const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(setActiveCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setDetailsOfferDataLoadingStatus, (state, action) => {
      state.isDetailsOfferDataLoading = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(setOfferNearbyError, (state, action) => {
      state.isOfferNearbyError = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});
