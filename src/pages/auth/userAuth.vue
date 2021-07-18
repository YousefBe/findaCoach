<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">please enter a valid email and password</p>
        <base-button>{{ modeButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import baseButton from '../../Globals/baseButton.vue';
import BaseCard from '../../Globals/baseCard.vue';
import BaseDialog from '../../Globals/BaseDialog.vue';
import BaseSpinner from '../../Globals/BaseSpinner.vue';
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    };
  },
  computed: {
    switchButtonCaption() {
      if (this.mode === 'login') {
        return 'signup';
      } else {
        return 'login';
      }
    },
    modeButtonCaption() {
      if (this.mode === 'login') {
        return 'login';
      } else {
        return 'signup';
      }
    }
  },

  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        this.password.length < 6 ||
        !this.email.includes('@')
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPaylpad = {
        email: this.email,
        password: this.password
      };
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPaylpad);
        } else {
          await this.$store.dispatch('signup', actionPaylpad);
        }
        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error;
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    }
  },
  components: { baseButton, BaseCard, BaseSpinner, BaseDialog }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
