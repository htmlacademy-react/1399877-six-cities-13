import { ReviewForm } from '../review-form/review-form';
import { Review } from '../../types/offers-types';
import { MONTHS, AuthorizationStatus, STAR_RATIO } from '../../const';

type ReviewsProps = {
  reviewList: Review[];
  authorizationStatus: (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];
};

export function Reviews(props: ReviewsProps): JSX.Element {
  const { reviewList, authorizationStatus } = props;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviewList.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewList.map(({ id, date, user, comment, rating }) => {
          const reviewDate = date.split('T')[0];
          const year = reviewDate.split('-')[0];
          const month = MONTHS[+reviewDate.split('-')[1] - 1];

          return (
            <li className="reviews__item" key={id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={user.avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span
                      style={{
                        width: `${rating * STAR_RATIO}%`,
                      }}
                    />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">{comment}</p>
                <time className="reviews__time" dateTime={reviewDate}>
                  {month} {year}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm />}
    </section>
  );
}
