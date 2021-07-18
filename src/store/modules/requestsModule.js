export default {
  namespaced: true,
  state() {
    return {
      requests: []
    };
  },
  mutations: {
    addNewRequests(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      console.log(payload);
      state.requests = payload;
    }
  },
  actions: {
    async addRequest(context, payload) {
      const NewRequest = {
        userEmail: payload.email,
        userMessage: payload.message
      };
      const response = await fetch(
        `https://coachesproject-ae2c8-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(NewRequest)
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(response.message || 'failed to send request ');
        throw error;
      }
      NewRequest.id = responseData.name;
      NewRequest.coachId = payload.coachId;
      context.commit('addNewRequests', NewRequest);
    },

    async fetchRequsets(context) {
      const coachId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      console.log(token);
      const response = await fetch(
        `https://coachesproject-ae2c8-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
          token
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || 'feh error');
        throw error;
      }

      const requests = [];

      for (const key in responseData) {
        const request = {
          id: key,
          coachId,
          userEmail: responseData[key].userEmail,
          message: responseData[key].userMessage
        };

        requests.push(request);
      }

      context.commit('setRequests', requests);
    }
  },
  getters: {
    allRequests(state, _, _2, rootGetters) {
      const CoachId = rootGetters.userId;
      const val = state.requests.filter(req => req.coachId === CoachId);
      return val;
    },
    hasRequests(_, getters) {
      return getters.allRequests && getters.allRequests.length > 0;
    }
  }
};
