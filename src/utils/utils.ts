import { Card } from '../types/offers-types';

const COUNT_STARS = 5;

export const calcRating = (rating: number) => `${Math.round(rating) / COUNT_STARS * 100}%`;

export const SortingCallback: {
  [key: string]: (arg0: Card, arg1: Card) => number;
  } = {
    Popular: () => 0,
    LowToHigh: (a: Card, b: Card) => a.price - b.price,
    HighToLow: (a: Card, b: Card) => b.price - a.price,
    TopRated: (a: Card, b: Card) => b.rating - a.rating
  };

export function filterOffersByCity(offersList: Card[], city: string | undefined, sorting: string) {
  return offersList.filter((offer) => offer.city.name === city).sort(SortingCallback[sorting]);
}

