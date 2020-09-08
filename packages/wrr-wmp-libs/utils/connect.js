import { getStore } from "./store";
import { getType, isEqualForArray } from "./util";

const listener = {};

function trySubscribe() {
  if (listener[this.__wxExparserNodeId__]) {
    return;
  }

  this.unsubscript = getStore().subscribe(this._checkState.bind(this));
  listener[this.__wxExparserNodeId__] = true;
  this._checkState();
}

function tryUnsubscript() {
  if (this.unsubscript) {
    if (!listener[this.__wxExparserNodeId__]) {
      return;
    }

    this.unsubscript();
    listener[this.__wxExparserNodeId__] = false;
  }
}

const connect = Behavior({
  attached() {
    trySubscribe.call(this);
  },

  detached() {
    tryUnsubscript.call(this);
  },

  pageLifetimes: {
    show() {
      trySubscribe.call(this);
    },

    hide() {
      tryUnsubscript.call(this);
    },
  },

  definitionFilter(defFields) {
    const selector = defFields.selector;
    if (!selector) {
      throw new Error("no selector function");
    }

    defFields.data = defFields.data || {};
    defFields.data._preDevs = null;

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

      const { _preDevs } = this.data;
      if (!_preDevs) {
        this.setData({ ...result, _preDevs: devs });
        return;
      }

      const needUpdate = !isEqualForArray(devs, _preDevs);
      if (!needUpdate) {
        return;
      }

      this.setData({ ...result, _preDevs: devs });

      if (this._stateUpdated) {
        setTimeout(() => {
          this._stateUpdated(renderFn(..._preDevs));
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
