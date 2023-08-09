import { createAction } from '@reduxjs/toolkit';
import { Card } from '../types/offers-types';

export const setActiveCity = createAction('setActiveCity', (city: string) => ({payload: city}));

export const getOffers = createAction('getOffers', (offers: Card[]) => ({payload: offers}));
