<template>
  <base-card>
    <h2>Find you coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend"  @change="setFilter" />
      <label for="frontend">frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend"  @change="setFilter" />
      <label for="backend">backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career"  @change="setFilter" />
      <label for="career">career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  emits: ['change-filters'],
  methods: {
    setFilter(eve) {
      const inputId = eve.target.id;
      const changed = eve.target.checked;
      console.log(inputId , changed);
      const updateFilters = {
        //   gdeda d
        ...this.filters,
        [inputId]: changed
      };
      this.filters = updateFilters;
      console.log(this.filters);
      this.$emit('change-filters',  this.filters);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
