<template>
  <div class="vue-flyroutes-wrapper">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "fly-transitions",
    data() {
      return {
        firstLoad: true
      }
    },
    mounted() {
      var transitions = this.$vfr.transitions;
      this.$router.beforeEach((to, from, next) => {
        let selected;
        if (this.firstLoad && from.name == null || this.firstLoad && from.name == "/") return next();
        if (!transitions.length) return next();
        var findFrom = transitions.filter( tr  => {
          if (tr.from) return from.name === tr.from || tr.from.includes(from.name)
        });
        var findTo = findFrom.filter( tr => {
          if (tr.to) return to.name === tr.to || tr.to.includes(to.name)
        });
        var globalAn = transitions.filter( tr => {
          return !tr.from && !tr.to;
        })
        if (!findTo.length && !globalAn.length) return next();
        if (!findTo.length && globalAn.length) selected = globalAn;
        if (findTo.length && !globalAn.length) selected = findTo;
        if (findTo.length && globalAn.length) selected = findTo;
        if (selected[0].leave) {
          selected[0].leave(() => {
            return next()
          })
        } else {
          return next()
        }
      })
      this.$router.afterEach((to, from) => {
        let selected;
        if (!transitions.length) return;
        var findFrom = transitions.filter( tr  => {
          if (tr.from) return from.name === tr.from || tr.from.includes(from.name)
        });
        var findTo = findFrom.filter( tr => {
          if (tr.to) return to.name === tr.to || tr.to.includes(to.name)
        });
        var globalAn = transitions.filter( tr  => {
          return !tr.from && !tr.to;
        })
        if (!findTo.length && !globalAn.length) return;
        if (!findTo.length && globalAn.length) selected = globalAn;
        if (findTo.length && !globalAn.length) selected = findTo;
        if (findTo.length && globalAn.length) selected = findTo;
        if (this.firstLoad && from.name == null || this.firstLoad && from.name == "/") {
          if (selected[0].once) {
            this.$nextTick()
            .then(() => {
              selected[0].once();
              return this.firstLoad = false
            })
          }
          return this.firstLoad = false;
        }
        this.$nextTick()
        .then(() => {
          selected[0].enter();
          return this.firstLoad = false
        })
      })
    }
  }
</script>
