# Intro

Vue Fly Routes is a small and easy-to-use VueJS router plugin that helps you create fluid and smooth transitions between your website’s pages. 

It helps to control the transitions between your views, improves your site navigation and enhance your users' web experience.

**Inspired by [Barba.js](https://barba.js.org/), with all the power of Vue.**

### Demo

[Vue Fly Routes Site](https://flyroutes.ml)

---

> **Notice**: the next content assumes intermediate knowledge of VueJS, Vue Router, CSS and JavaScript. It is worth mentioning that all code examples use ES6+ syntax. If you are not comfortable with this syntax, we would encourage you to grasp the basics then come back.

# Installing

To install `vue-flyroutes` you must previously install `vue-router`, then you can continue with the following steps:

### NPM - Vue Cli / Node:

    npm i vue-flyroutes --save

Then **import it** inside your `/src/main.js` file, and use it on your vue instance.

    //...
    import Vue from 'vue'
    import { VueFlyRoutes } from 'vue-flyroutes'
    
    Vue.use(VueFlyRoutes, {
      //Options...
    })

It is **recommended to use it globally**, but you can **install it as a component**.

    import { FlyTransitions } from 'vue-flyroutes'
    
    //...
    components: {
      FlyTransitions
    }
    //...

### CDN - Window:

SOON...

# Markup & Component placement

VueFlyRoutes registers the fly-transitions component that allows you to handle all transitions on your SPA route change.

To use it, **just place it** on your App component template:

    <template>
      ...
      <fly-transition/>
      ...
    </template>

Or you can mount it on your `/src/main.js` file:

    import Vue from 'vue'
    import {VueFlyRoutes, FlyTransitions } from 'vue-flyroutes'
    import App from './App.vue'

    Vue.use(VueFlyRoutes, {
      //Options...
    })

    new Vue({
      el: '#app',
      render: (h) => h(FlyTransitions, [h(App)])
    }).$mount()

Then you have to do nothing, the component is now mounted in your app root.

### Using with slot:

If you want to transition just the content inside the component, you must wrap your router-view component and all the components you want manipulate.

    <template>
      ...
      <fly-transitions>
        <router-view/>
        <foo-comp/>
      <fly-transitions/>
      ...
    </template>

# Transitions

In the options, the most important thing you will use is `transitions`.

> **Note**: You can run VFR with almost no configuration, later we'll show you the option references.

A transition run between two pages of your site, and VFS takes advantage of vue-router to handle route changes in a smooth way and maintains the continuity and aesthetics of your websites.

## What is a transition?

Transitions are objects that contain the cofiguration and the lifecycle hooks (handler functions) to **manage animations** when there is a page change on your website. You must specify your transitions on the plugin installation and you can place as many as you want.

See how the [lifecycle](/#lifecycle) works.

A basic transition is made of a `leave` animation, that is executed when leaving the current page, and an `enter` animation that is executed when entering the next page:

    Vue.use(VueFlyRoutes, {
      transitions: [
        {
          name: 'basic',
          leave(done) {
            myLeaveAnimation()
            done()
          },
          enter() {
            myEnterAimation()
          }
        }
      ]
    })

> **Note**: This animations will be triggered on all your pages.

**You must see** the [Advanced transitioning](/#atp) props.

## Animation

The important part for a good transition is animation. As VFS is not an animation plugin, you will need to import one in order to animate elements on the interface to create your transition.

There is a lot of javascript animation libraries on the web, here is a good start:

- [gsap](https://greensock.com/gsap/) — professional-grade animation for the modern web
- [popmotion](https://popmotion.io/) — simple libraries for delightful interfaces
- [animejs](https://animejs.com/) — a lightweight library with a simple and powerful API
- [mojs](https://mojs.github.io/) — the motion graphics toolbelt for the web
- [spirit](https://spiritjs.io/) — the ultimate tool to create high-quality animations directly in the browser

For the demonstration, here is a basic **opacity transition** with **animejs** that consist of making the current page transparent, while the next page become opaque:

    Vue.use(VueFlyRoutes, {
      transitions: [
        {
          name: 'animejs',
          async leave(done) {
            await anime({
              targets: '.content',
              delay: 1000,
              opacity: [0, 1],
              duration: 2000,
            }).finished;
            done()
          },
          enter() {
            anime({
              targets: '.content',
              delay: 0,
              opacity: [1, 0],
              duration: 2000,
            }).finished;
          }
        }
      ]
    })

> **Note**: VFS is currently only capable of transitioning with direct DOM manipulation. Soon will be available the data object in each lifecycle hook, that contains the element that is called through the :fly-trantision prop, also the data object contains the data of the whole transition.