let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didLogOut: false
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      console.log(state.token);
      return state.token;
    },
    isAuth(state) {
      return !!state.token;
    },
    didAutoLogOut(state) {
      return state.didLogOut;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
      state.didLogOut = false;
    },
    hisTimeIsOut(state) {
      state.didLogOut = true;
    }
  },

  actions: {
    async login(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'login'
      });
    },
    async signup(context, payload) {
      return context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      });
    },
    logout(context) {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      clearTimeout(timer);

      context.commit('setUser', {
        token: null,
        userId: null,
        tokenExpiration: null
      });
    },
    KeepAlive(context) {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const tokernExpireation = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokernExpireation - new Date().getTime();

      if (expiresIn < 1000) {
        return;
      }

      setTimeout(() => {
        timer = context.dispatch('LoghimOut');
      }, expiresIn);

      if (token && userId) {
        context.commit('setUser', {
          token,
          userId,
          tokenExpiration: null
        });
      }
    },
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlk67Vivhpsy4Xxwx8PxBHFcGPLdS_Xe4';
      if (mode === 'signup') {
        url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlk67Vivhpsy4Xxwx8PxBHFcGPLdS_Xe4';
      }
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message ||
            'some thing went wrong with the firbase signup '
        );
        throw error;
      }
      //   console.log(responseData);

      //   const expiresIn = 5000;
      const expiresIn = responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(() => {
        context.dispatch('LoghimOut');
      }, expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: expirationDate
      });
    },
    LoghimOut(context) {
      context.dispatch('logout');
      context.commit('hisTimeIsOut');
    }
  }
};
