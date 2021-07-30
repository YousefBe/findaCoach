<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
export default {
  components: {
    TheHeader
  },
  created() {
    this.$store.dispatch('KeepAlive');
  },
  computed: {
    didLogOut() {
      return this.$store.getters.didAutoLogOut;
    }
  },
  watch: {
    didLogOut(currentValue, oldValue) {
      if (currentValue && currentValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100vh;
}

body {
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.5s ease-out;
}
.route-leave.active {
  transition: all 0.5s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
