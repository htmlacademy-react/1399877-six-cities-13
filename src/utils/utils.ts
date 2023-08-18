import { TOffers } from '../types/offers-types';

const COUNT_STARS = 5;

export const calcRating = (rating: number) => `${Math.round(rating) / COUNT_STARS * 100}%`;

export const SortingCallback: {
  [key: string]: (arg0: TOffers, arg1: TOffers) => number;
  } = {
    Popular: () => 0,
    LowToHigh: (a: TOffers, b: TOffers) => a.price - b.price,
    HighToLow: (a: TOffers, b: TOffers) => b.price - a.price,
    TopRated: (a: TOffers, b: TOffers) => b.rating - a.rating
  };

export function filterOffersByCity(offersList: TOffers[], city: string | undefined, sorting: string) {
  return offersList.filter((offer) => offer.city.name === city).sort(SortingCallback[sorting]);
}

