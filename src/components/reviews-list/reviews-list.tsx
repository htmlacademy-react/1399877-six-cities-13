import { Review } from '../../types/reviews';
import { ReviewItem } from '../review-item/review-item';

type ReviewsListProps = {
  reviewList: Review[];
}

function ReviewsList ({reviewList}: ReviewsListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviewList.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
