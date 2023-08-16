import cn from 'classnames';
import { Link, generatePath} from 'react-router-dom';
import { TOffers } from '../../types/offers-types';
import { AppRoute } from '../../const';

type PlaceCardProps = {
  offer: TOffers;
  variant: 'cities' | 'favorites' | 'near-places';
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
};

export function PlaceCard({offer, variant, handleCardMouseEnter, handleCardMouseLeave}: PlaceCardProps): JSX.Element {
  const calcRating = (rating: number) => `${Math.round(rating) / 5 * 100}%`;
  const {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage,
  } = offer;
  return (
    <article
      className={cn(
        [`${variant}__card`],
        'place-card',
      )}

      onMouseEnter={() => {
        handleCardMouseEnter?.(offer.id);
      }}

      onMouseLeave={() => {
        handleCardMouseLeave?.();
      }}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div
        className={cn(
          [`${variant}__image-wrapper`],
          'place-card__image-wrapper'
        )}
      >
        <Link to={`/offer/:${offer.id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={variant === 'cities' ? '260' : '150'}
            height={variant === 'cities' ? '200' : '110'}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn(
              'place-card__bookmark-button',
              'button',
              {'place-card__bookmark-button--active': isFavorite},
            )}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calcRating(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, {id: id})}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
