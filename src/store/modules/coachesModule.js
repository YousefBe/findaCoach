export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }
      ]
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setLastFetch(state) {
      state.lastFetch = new Date().getTime();
    }
  },
  actions: {
    async loadCoaches(context, payload) {
      // console.log('created');
      // console.log(context);
      // we don't wanna load every time we refresh so use this pattern
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }
      const Coaches = await fetch(
        `https://coachesproject-ae2c8-default-rtdb.firebaseio.com/coaches.json`
      );
      const response = await Coaches.json();

      if (!Coaches.ok) {
        const error = new Error(response.message || 'failed to fetch!');
        throw error;
      }

      const coaches = [];

      for (const id in response) {
        const coach = {
          id,
          firstName: response[id].firstName,
          lastName: response[id].lastName,
          areas: response[id].areas,
          description: response[id].description,
          hourlyRate: response[id].hourlyRate
        };
        coaches.push(coach);
      }
      context.commit('setCoaches', coaches);
      context.commit('setLastFetch');
    },
    async saveCoach(context, payload) {
      const UserId = context.rootGetters.userId;
      // console.log(context.rootGetters);
      // console.log(UserId);
      const coachStructure = {
        firstName: payload.first,
        lastName: payload.last,
        areas: payload.areas,
        description: payload.desc,
        hourlyRate: payload.rate
      };

      const token = context.rootGetters.token;

      const response = await fetch(
        `https://coachesproject-ae2c8-default-rtdb.firebaseio.com/coaches/${UserId}.json?auth=` +
          token,
        {
          method: 'PUT',
          body: JSON.stringify(coachStructure)
        }
      );

      const responseData = await response.json();

      if (!responseData.ok) {
        //doSomething
      }

      context.commit('registerCoach', {
        ...coachStructure,
        id: UserId
      });
    }
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rooteGetters) {
      const coaches = getters.coaches;
      const userId = rooteGetters.userId;
      return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
  }
};
