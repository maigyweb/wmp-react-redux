const { actions } = require("wrr-wmp-libs");
const {
  getStore,
  connect,
  stateSelector,
  createSelector,
} = require("wmp-redux");
const { aysncTest, getApiTest, postApiTest } = actions;
const { dispatch, getState } = getStore();

const selector = createSelector(
  (state) => state.account.own,
  (state) => state.tt.test,
  (own, test) => ({ ...own, ...test })
);

Component({
  behaviors: [connect],
  selector: (data) => stateSelector(selector, data),

  data: {
    pageName: "index",
  },

  stateUpdated(preState) {
    console.log(preState);
  },

  methods: {
    handlePrintData() {
      console.log(this.data);
    },

    handleDispatch() {
      dispatch(aysncTest({ name: "test-change" }));
    },

    handleGetState() {
      console.log(getState());
    },

    handleGetApiTest() {
      dispatch(getApiTest());
    },

    handlePostApiTest() {
      dispatch(postApiTest("u003"));
    },
  },
});
