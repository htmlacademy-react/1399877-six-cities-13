import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../const';
import { TOffers } from '../types/offers-types';
import { Review } from '../types/reviews';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({payload: city}));

export const fetchOffers = createAction(`${NameSpace.Offers}/fetch`, (offers: TOffers[]) => ({payload: offers}));

export const fetchReviews = createAction(`${NameSpace.Reviews}/fetch`, (comments: Review[]) => ({payload: comments}));

export const changeSort = createAction('offers/changeSort', (sorting: string) => ({payload: sorting}));

export const loadOffers = createAction<TOffers[]>('loading/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');
