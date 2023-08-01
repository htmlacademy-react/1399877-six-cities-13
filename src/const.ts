export const STAR_RATIO = 20;
export const OFFER_IMAGES = 6;
export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const RATINGS = [
  { star: 5, title: 'perfect' },
  { star: 4, title: 'good' },
  { star: 3, title: 'not bad' },
  { star: 2, title: 'badly' },
  { star: 1, title: 'terribly' },
] as const;

export const TextLength = {
  min: 50,
  max: 300,
} as const;

export enum TypeOffer {
  apartment = 'Apartment',
  room = 'Private Room',
  house = 'House',
  hotel = 'Hotel',
}

export const URL_MARKER_DEFAULT =
  'img/pin.svg';

export const URL_MARKER_CURRENT =
  'img/pin-active.svg';

export const DEFAULT_ACTIVE_CITY = CITIES[3];
