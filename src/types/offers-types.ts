import { CITIES } from '../const';

export type CityNames = (typeof CITIES)[number];

export type City = {
  name: string;
  location: Location;
};

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Card = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
};

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferCard = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
} & Card;

export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};
