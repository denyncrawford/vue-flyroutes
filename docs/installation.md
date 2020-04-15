# Installation

## Direct Download / CDN

https://unpkg.com/vue-flyroutes/dist/vue-flyroutes 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-flyroutes@{{ $version }}/dist/vue-flyroutes.js
 
Include vue-flyroutes after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-flyroutes/dist/vue-flyroutes.js"></script>
```

## NPM

```sh
$ npm install vue-flyroutes
```

## Yarn

```sh
$ yarn add vue-flyroutes
```

When used with a module system, you must explicitly install the `vue-flyroutes` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vue-flyroutes from 'vue-flyroutes'

Vue.use(vue-flyroutes)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `vue-flyroutes` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//vue-flyroutes.git node_modules/vue-flyroutes
$ cd node_modules/vue-flyroutes
$ npm install
$ npm run build
```

