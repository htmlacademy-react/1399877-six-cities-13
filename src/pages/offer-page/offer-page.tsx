import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import {TOffers} from '../../types/offers-types';
import NotFoundPage from '../not-found-page/notFoundPage';
import {STAR_RATIO, OFFER_IMAGES } from '../../const';
import { OffersList } from '../../components/offers-list/offers-list';
import { useEffect, useState } from 'react';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviews } from '../../store/action';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ReviewForm } from '../../components/review-form/review-form';
import { filterOffersByCity } from '../../utils/utils';


export function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews);
  const currentOffers = useAppSelector((state) => state.offers);
  const currentCity: string = useAppSelector((state) => state.activeCity);
  const sortOffers = useAppSelector((state) => state.sorting);

  const offersByCity = filterOffersByCity(currentOffers, currentCity, sortOffers);
  const city = offersByCity[0]?.city;


  const { id } = useParams();
  const card = currentOffers.find((item: TOffers) => item.id === id);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleCardMouseEnter = (offerId: string) => setSelectedPoint(offerId);
  const handleCardMouseLeave = () => setSelectedPoint(null);

  useEffect(() => {
    dispatch(fetchReviews());
  },[dispatch]);

  if (!card) {
    return <NotFoundPage />;
  }

  const {
    isFavorite,
    isPremium,
    price,
    rating,
    title,
    type,
    bedrooms,
    maxAdults,
    goods,
    host,
    images,
  } = card;
  const { name, avatarUrl, isPro } = host;

  return (
    <div className="page">
      <Helmet>
        <title>Hotel &quot;{title}&quot;</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image: string, index) => {
                if (OFFER_IMAGES > index) {
                  return (
                    <div className="offer__image-wrapper" key={image}>
                      <img
                        className="offer__image"
                        src={image}
                        alt="Photo studio"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={cn('offer__bookmark-button', 'button', {
                    'place-card__bookmark-button--active': isFavorite,
                  })}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${Math.round(rating) * STAR_RATIO}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good: string) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={cn(
                      'offer__avatar-wrapper',
                      'user__avatar-wrapper',
                      { 'offer__avatar-wrapper--pro': isPro }
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{name}</span>
                  {isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  {card.description
                    .split('.')
                    .filter((item) => item !== '')
                    .map((item) => item.replace(/^ +/, ''))
                    .map((item) => (
                      <p className="offer__text" key={item}>
                        {`${item}.`}
                      </p>
                    ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                {reviews && <ReviewsList reviews={reviews} />}
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            offers={offersByCity}
            city={city}
            selectedPoint={selectedPoint}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                offers={offersByCity}
                handleCardMouseEnter={handleCardMouseEnter}
                handleCardMouseLeave={handleCardMouseLeave}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
