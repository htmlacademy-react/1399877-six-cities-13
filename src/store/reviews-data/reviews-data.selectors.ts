import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ReviewsData, State} from '../../types/state';

export const getReviews = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.reviews,
);

export const getReviewSendingStatus = createSelector(
  (state: State) => state[NameSpace.Reviews],
  (state: ReviewsData) => state.sendingStatusReview,
);
