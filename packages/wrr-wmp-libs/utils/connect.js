import { getStore } from "./store";
import { getType, isEqualForArray } from "./util";

const connect = Behavior({
  attached() {
    this.unsubscript = getStore().subscribe(this._checkState.bind(this));
    this._checkState();
  },

  detached() {
    this.unsubscript && this.unsubscript();
  },

  definitionFilter(defFields) {
    var selector = defFields.selector;
    if (!selector) {
      throw new Error("no selector function");
    }

    defFields.data = defFields.dat || {};
    defFields.data.preDevs = null;

    if (!defFields.methods) {
      defFields.methods = {};
    }
    defFields.methods._selector = selector;

    if (defFields.stateUpdated) {
      defFields.methods._stateUpdated = defFields.stateUpdated;
    }
  },

  methods: {
    _checkState() {
      const { devs, result, renderFn } = this._selector(this.data);
      if (!result) {
        return;
      }

      const { preDevs } = this.data;
      if (!preDevs) {
        this.setData({ ...result, preDevs: devs });
        return;
      }

      const needUpdate = !isEqualForArray(devs, preDevs);
      if (!needUpdate) {
        return;
      }

      this.setData({ ...result, preDevs: devs });

      if (this._stateUpdated) {
        setTimeout(() => {
          this._stateUpdated(renderFn(...preDevs));
        }, 0);
      }
    },
  },
});

function stateSelector(_createSelector, data) {
  if (data && getType(data) !== "Object") {
    throw new Error(
      "the second arg of stateSelector should be object or undefined"
    );
  }

  return _createSelector(data);
}

function createSelector(...args) {
  return (data) => {
    if (!args || (args && args.length <= 1)) {
      return null;
    }

    const devFnList = args.slice(0, -1);
    const renderFn = args[args.length - 1];

    const devResList = devFnList.map((getDev) =>
      getDev(getStore().getState(), data)
    );

    return { devs: devResList, result: renderFn(...devResList), renderFn };
  };
}

export { connect, stateSelector, createSelector };
