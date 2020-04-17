
import Vue from 'vue'
import VueFlyRoutes from './index'
import {pageTransition, contentAnimation} from './transitions'
import {delay} from './transitions/helpers.js'

Vue.use(VueFlyRoutes, {
  transitions: [
    {
      async leave(data, done) {
        pageTransition();
        await delay(1500)
        done()
      },
      enter(data) {
        contentAnimation(.29);
      },
      once(data) {
        contentAnimation(0);
      }
    }
  ]
})
