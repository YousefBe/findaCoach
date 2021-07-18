import { createStore } from 'vuex';
import coachesModule from './modules/coachesModule.js';
import requestsModule from './modules/requestsModule.js';
import authModule from './modules/authModule.js';
const store = createStore({
  modules: {
    coachesModule,
    requestsModule,
    authModule
  },

  mutations: {},
  getters: {},
  actions: {}
});

export default store;
