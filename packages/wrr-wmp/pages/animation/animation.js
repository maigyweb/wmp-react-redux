Component({
  data: {
    introdType: "shrink",
    introd:
      "React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。以声明式编写 UI，可以让你的代码更加可靠，且方便调试。创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。组件逻辑使用 JavaScript 编写而非模版，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。",
  },

  methods: {
    handleShrink() {
      this.setData({ introdType: "shrink" });
    },
    handleUnfold() {
      this.setData({ introdType: "unfold" });
    },
  },
});
