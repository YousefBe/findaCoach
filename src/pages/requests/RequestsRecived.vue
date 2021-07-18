<template>
  <div>
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Recived</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <single-request
            v-for="request in recivedRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.userMessage"
          ></single-request>
        </ul>

        <h3 v-else>
          you have no requests yet
        </h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import SingleRequest from '../../components/requests/singleRequest.vue';
import baseCard from '../../Globals/baseCard.vue';
import BaseSpinner from '../../Globals/BaseSpinner.vue';
export default {
  components: { baseCard, SingleRequest, BaseSpinner },

  data() {
    return {
      isLoading: false,
      error: null
    };
  },

  computed: {
    recivedRequests() {
      return this.$store.getters['requestsModule/allRequests'];
    },
    hasRequests() {
      return this.$store.getters['requestsModule/hasRequests'];
    }
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requestsModule/fetchRequsets');
      } catch (error) {
        this.error = error.message || 'feh 7aga 8alt';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
