import cn from 'classnames';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import NotFoundPage from '../not-found-page/notFoundPage';
import {AuthorizationStatus, STAR_RATIO } from '../../const';
import { useEffect, useState } from 'react';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { ReviewForm } from '../../components/review-form/review-form';
import { fetchNearbyOffersAction, fetchOfferAction, fetchReviewsOfferAction } from '../../store/api-actions';
import LoadingPage from '../loading-page/loading-page';
import NearbyPlacesList from '../nearby-places-list/nearby-places-list';


export function OfferPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const currentId = String(useParams().id);
  const isDetailsOfferLoaded = useAppSelector((state) => state.isDetailsOfferDataLoading);
  const isOfferNearbyError = useAppSelector((store) => store.isOfferNearbyError);
  const currentOffer = useAppSelector((store) => store.offer);
  const nearby = useAppSelector((state) => state.nearby);
  const isReviewsDataLoading = useAppSelector((store) => store.isReviewsDataLoading);
  const currentComments = useAppSelector((state) => state.comments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const nearbyOffersList = nearby?.slice(0, 3);

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => setSelectedPoint(id);
  const handleCardMouseLeave = () => setSelectedPoint(null);

  useEffect(() => {
    dispatch(fetchOfferAction(currentId));
    dispatch(fetchNearbyOffersAction(currentId));
    dispatch(fetchReviewsOfferAction(currentId));
  }, [dispatch, currentId]);


  if (isDetailsOfferLoaded || isOfferNearbyError || isReviewsDataLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!currentOffer) {
    return <NotFoundPage/>;
  }


  return (
    <div className="page">
      <Helmet>
        <title>Hotel &quot;{currentOffer.title}&quot;</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={cn('offer__bookmark-button', 'button', {
                    'place-card__bookmark-button--active': currentOffer.isFavorite,
                  })}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${Math.round(currentOffer.rating) * STAR_RATIO}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good: string) => (
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
                      { 'offer__avatar-wrapper--pro': currentOffer.host.isPro }
                    )}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  {currentOffer.description
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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentComments?.length}</span></h2>
                {currentComments && <ReviewsList reviews={currentComments} />}
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={currentId} />}
              </section>
            </div>
          </div>
          {nearby &&
          <Map
            city={nearby[0].city}
            offers={nearby}
            selectedPoint={selectedPoint}
          />}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffersList &&
              <NearbyPlacesList
                offers={nearbyOffersList}
                handleCardMouseEnter={handleCardMouseEnter}
                handleCardMouseLeave={handleCardMouseLeave}
              />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
