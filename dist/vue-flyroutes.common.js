/*!
 * vue-flyroutes v1.0.0 
 * (c) 2020 Crawford.
 * Released under the undefined License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));

//
var script = {
  name: "vue-fr",
  data: function data() {
    return {
      firstLoad: true
    };
  },
  mounted: function mounted() {
    var _this = this;

    var options = this.$vfr.options;
    var transitions = this.$vfr.transitions;
    this.$router.beforeEach(function (to, from, next) {
      var selected;
      if (_this.firstLoad && from.name == null || _this.firstLoad && from.name == "/") return next();
      if (!transitions.length) return next();

      var findFrom = _.filter(transitions, function (tr) {
        if (tr.from) return from.name === tr.from || tr.from.includes(from.name);
      });

      var findTo = _.filter(findFrom, function (tr) {
        if (tr.to) return to.name === tr.to || tr.to.includes(to.name);
      });

      var globalAn = _.filter(transitions, function (tr) {
        return !tr.from && !tr.to;
      });

      if (!findTo.length && !globalAn.length) return next();
      if (!findTo.length && globalAn.length) selected = globalAn;
      if (findTo.length && !globalAn.length) selected = findTo;
      if (findTo.length && globalAn.length) selected = findTo;

      if (selected[0].leave) {
        selected[0].leave(null, function () {
          return next();
        });
      } else {
        return next();
      }
    });
    this.$router.afterEach(function (to, from) {
      var selected;
      if (!transitions.length) return;

      var findFrom = _.filter(transitions, function (tr) {
        if (tr.from) return from.name === tr.from || tr.from.includes(from.name);
      });

      var findTo = _.filter(findFrom, function (tr) {
        if (tr.to) return to.name === tr.to || tr.to.includes(to.name);
      });

      var globalAn = _.filter(transitions, function (tr) {
        return !tr.from && !tr.to;
      });

      if (!findTo.length && !globalAn.length) return;
      if (!findTo.length && globalAn.length) selected = globalAn;
      if (findTo.length && !globalAn.length) selected = findTo;
      if (findTo.length && globalAn.length) selected = findTo;

      if (_this.firstLoad && from.name == null || _this.firstLoad && from.name == "/") {
        if (selected[0].once) {
          _this.$nextTick().then(function () {
            selected[0].once();
            return _this.firstLoad = false;
          });
        }

        return _this.firstLoad = false;
      }

      _this.$nextTick().then(function () {
        selected[0].enter();
        return _this.firstLoad = false;
      });
    });
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-flyroutes-wrapper"},[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VueFly = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var version = '1.0.0';

function install(Vue, opts) {
  if (!opts) opts = {
    transitions: []
  };
  Vue.component('vue-fr', VueFly);
  Vue.prototype.$vfr = {
    opts: opts,
    transitions: opts.transitions
  };
} // Expose the components

var plugin = {
  version: version,
  install: install
};

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

exports.VueFly = VueFly;
exports.default = plugin;
exports.install = install;
