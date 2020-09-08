const { connect, stateSelector, createSelector } = require("wmp-redux");

const selector = createSelector(
  (state) => state.account.own,
  (own) => own
);

Component({
  behaviors: [connect],
  selector: (data) => stateSelector(selector, data),
});
