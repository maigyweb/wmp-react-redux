const needLogin = Behavior({
  data: { hold: true },

  created() {
    const {
      data: { hold },
      __data__: { createdFn },
    } = this;

    if (!hold && createdFn) {
      createdFn.call(this);
    }
  },

  ready() {
    const {
      data: { hold },
      __data__: { readyFn },
    } = this;

    if (!hold && readyFn) {
      readyFn.call(this);
    }
  },

  attached() {
    const {
      data: { hold },
      __data__: { attachedFn },
    } = this;

    if (!hold && attachedFn) {
      attachedFn.call(this);
    }
  },

  detached() {
    const {
      data: { hold },
      detachedFn,
    } = this;

    if (!hold && detachedFn) {
      detachedFn.call(this);
    }
  },

  pageLifetimes: {
    show() {
      const {
        data: { hold },
        showFn,
      } = this;
      if (!hold && showFn) {
        showFn.call(this);
      }
    },
    hide() {
      const {
        data: { hold },
        hideFn,
      } = this;

      if (!hold && hideFn) {
        hideFn.call(this);
      }
    },
  },

  definitionFilter(defFields) {
    defFields.methods = defFields.methods || {};

    defFields.methods.unhold = function () {
      this.setData({ hold: false }, () => {
        const {
          createdFn,
          attachedFn,
          onLoad,
          showFn,
          readyFn,
        } = defFields.methods;
        if (createdFn) createdFn.call(this);
        if (attachedFn) attachedFn.call(this);
        if (onLoad) onLoad.call(this);
        if (showFn) showFn.call(this);
        if (readyFn) readyFn.call(this);
      });
    };

    if (defFields.created) {
      defFields.methods.createdFn = defFields.created;
      defFields.created = null;
    }

    if (defFields.ready) {
      defFields.methods.readyFn = defFields.ready;
      defFields.ready = null;
    }

    if (defFields.lifetimes) {
      if (defFields.lifetimes.attached) {
        defFields.methods.attachedFn = defFields.lifetimes.attached;
        defFields.lifetimes.attached = null;
      }
      if (defFields.lifetimes.detached) {
        defFields.methods.detachedFn = defFields.lifetimes.detached;
        defFields.lifetimes.detached = null;
      }
    }

    if (defFields.methods.onLoad) {
      const onLoadFn = defFields.methods.onLoad;
      defFields.methods.onLoad = function () {
        if (!this.data.hold) {
          onLoadFn();
        }
      };
    }

    if (defFields.pageLifetimes) {
      if (defFields.pageLifetimes.show) {
        defFields.methods.showFn = defFields.pageLifetimes.show;
        defFields.pageLifetimes.show = null;
      }

      if (defFields.pageLifetimes.hide) {
        defFields.methods.hideFn = defFields.pageLifetimes.hide;
        defFields.pageLifetimes.hide = null;
      }
    }
  },
});

export default needLogin;
