import {createSelector} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {NearbyData, State} from '../../types/state';

export const getOffersNearby = createSelector(
  (state: State) => state[NameSpace.NearPlaces],
  (state: NearbyData) => state.nearby,
);
