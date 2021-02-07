const { actions } = require("wrr-wmp-libs");
const {
  dispatch,
  getState,
  connect,
  stateSelector,
  createSelector,
} = require("wmp-redux");
const { aysncTest, getApiTest, postApiTest } = actions;

const number = 2;
const numberAdd = (number, addNum) => number + (addNum || 0);

const selector = createSelector(
  (state) => state.account.own,
  (state) => state.tt.test,
  (_, data) => data.number,
  (_, data) => data.addNum,
  (own, test, number, addNum) => {
    const numberAccount = numberAdd(number, addNum);

    return {
      ...own,
      ...test,
      numberAccount,
    };
  }
);

Component({
  behaviors: [connect],
  selector: (data) => stateSelector(selector, { ...data, number }),

  data: {
    addNum: 2,
  },

  stateUpdated(preState) {
    console.log('preState', preState);
    console.log('this.data', this.data);
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
