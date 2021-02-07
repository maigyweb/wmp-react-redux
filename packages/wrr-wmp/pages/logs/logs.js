const {
  dispatch,
  connect,
  stateSelector,
  createSelector,
} = require("wmp-redux");
const { actions } = require("wrr-wmp-libs");
const { aysncTest } = actions;

const selector = createSelector(
  (state) => state.account.own,
  (state) => state.tt.test,
  (own, test) => ({ ...own, ...test })
);

Component({
  behaviors: [connect],
  selector: (data) => stateSelector(selector, data),

  stateUpdated(preState) {
    console.log(preState);
  },

  methods: {
    handleDispatch() {
      dispatch(aysncTest({ name: "test-changed" }));
    },
  },
});
