<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>intersted kalmo yabo 5alo</h2>

          <base-button link :to="contactLink">Contact </base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <base-card>
      <section>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>
          {{ description }}
        </p>
      </section></base-card
    >
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: ''
    };
  },
  created() {
    this.selectedCoach = this.$store.getters['coachesModule/coaches'].find(
      coach => coach.id === this.id
    );
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return  '/coaches/' + this.id + '/contact';
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    }
  }
};
</script>

<style></style>
