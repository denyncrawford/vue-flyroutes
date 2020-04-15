
const version = '__VERSION__'

import VueFly from './components/VueFly.vue'

// Install the components
export function install (Vue, opts) {
  if (!opts) opts = {transitions:[]}
  Vue.component('vue-fr', VueFly);
  Vue.prototype.$vfr = {
    opts: opts,
    transitions: opts.transitions
  }
}

// Expose the components
export {
  VueFly,
}

// Plugin
const plugin = {
  version,
  install,
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
