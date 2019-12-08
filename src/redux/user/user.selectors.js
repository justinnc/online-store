import { createSelector } from "reselect";

const selectUser = state => state.user;

export const selectCurrnetUser = createSelector(
  [selectUser],
  user => user.currentUser
);
