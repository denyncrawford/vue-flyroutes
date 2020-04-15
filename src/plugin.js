
import Vue from 'vue'
import VueFlyRoutes from './index'
import {pageTransition, contentAnimation} from './transitions'

Vue.use(VueFlyRoutes, {
  transitions: [
    {
      leave(data, done) {
        pageTransition();
        setTimeout(() => {
          done()
        },1500)
      },
      enter(data) {
        contentAnimation();
      },
    }
  ]
})
