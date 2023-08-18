import { createAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({payload: city}));

export const fetchOffers = createAction(`${NameSpace.Offers}/fetch`);

export const fetchReviews = createAction(`${NameSpace.Reviews}/fetch`);

export const changeSort = createAction('offers/changeSort', (sorting: string) => ({payload: sorting}));
