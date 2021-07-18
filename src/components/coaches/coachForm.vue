<template>
  <form action="" @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearError('firstName')"
      />
      <p v-if="!firstName.isValid">You must enter a First name</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearError('lastName')"
      />
      <p v-if="!lastName.isValid">You must enter a last name</p>
    </div>
    <div class="form-control" :class="{ invalid: !desicription.isValid }">
      <label for="description">Description</label>
      <input
        type="text"
        id="description"
        v-model.trim="desicription.val"
        @blur="clearError('desicription')"
      />
      <p v-if="!desicription.isValid">
        You must enter a desicription about the coach
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="Rate">Rate</label>
      <input
        type="number"
        id="Rate"
        v-model.number="rate.val"
        @blur="clearError('rate')"
      />
      <p v-if="!rate.isValid">You must enter Valid hourly rate</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>areas of experiances</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearError('areas')"
        />
        <label for="frontend">frontend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          @blur="clearError('areas')"
          v-model="areas.val"
        />
        <label for="backend">backend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearError('areas')"
        />
        <label for="career">career advisory</label>
      </div>
      <p v-if="!areas.isValid">
        You must chick at least one area of experiance
      </p>
    </div>
    <base-button>Submit</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        isValid: true,
        val: ''
      },
      lastName: {
        isValid: true,
        val: ''
      },
      areas: {
        isValid: true,
        val: []
      },
      rate: {
        isValid: true,
        val: null
      },
      desicription: {
        isValid: true,
        val: ''
      },
      fromValid: true
    };
  },
  methods: {
    clearError(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.fromValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.fromValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.fromValid = false;
      }
      if (this.desicription.val === '') {
        this.desicription.isValid = false;
        this.fromValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.fromValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.fromValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.fromValid) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        rate: this.rate.val,
        desc: this.desicription.val,
        areas: this.areas.val
      };
      console.log(formData);
      this.$emit('saveData', formData);
    }
  },

  emits: ['saveData']
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
