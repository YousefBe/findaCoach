<template>
  <div>
    <base-dialog :show="!!error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <coach-filter @change-filters="setFilters"></coach-filter>
    <div>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth" v-if="!isLoggedIn"
            >Login to register as coach</base-button
          >
          <base-button v-if="!isCoach && isLoggedIn" link to="/register"
            >Register a new Coach</base-button
          >
        </div>
        <div v-if="loading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <single-coach
            v-for="coach in filterdCoaches"
            :key="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :id="coach.id"
            :rate="coach.hourlyRate"
          >
            {{ coach.firstName }}
          </single-coach>
        </ul>
        <h2 v-else>No Coaches</h2>
      </base-card>
    </div>
  </div>
</template>

<script>
import CoachFilter from '../../components/coaches/coachFilter.vue';
import singleCoach from '../../components/coaches/singleCoach.vue';
import BaseSpinner from '../../Globals/BaseSpinner.vue';

export default {
  components: { singleCoach, CoachFilter, BaseSpinner },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      },
      loading: false,
      error: null
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    setFilters(updatedfilters) {
      this.activeFilters = updatedfilters;
    },
    async loadCoaches(refresh = false) {
      this.loading = true;
      try {
        await this.$store.dispatch('coachesModule/loadCoaches', {
          forceRefresh: refresh
        });
      } catch (error) {
        this.error = error.message || 'some thing went wrong';
        console.log(error);
      }
      this.loading = false;
    }
  },
  created() {
    this.loadCoaches(false);
  },
  computed: {
    filterdCoaches() {
      const coaches = this.$store.getters['coachesModule/coaches'];
      return coaches.filter(coach => {
        // ana hb3tlk el 7aga lw 3andk hatly el dg3 da
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }

        return false;
      });
    },
    hasCoaches() {
      return !this.loading && this.$store.getters['coachesModule/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coachesModule/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuth;
    }
  }
};
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
