<template>
  <div class="container">
    <gws-map />

    <div class="row">
      <div class="col-md-8 pb-5 mx-auto">
        <div>
          <div>
            <h1 class="text-center">Contact Us</h1>
          </div>
          <div>
            <form>
              <div class="form-group">
                <label for="name">Name *</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model.trim="v$.form.name.$model"
                  :class="{
                    'is-invalid':
                      v$.form.name.$error || formValidationMessages.name,
                  }"
                />
                <div
                  class="invalid-feedback"
                  v-if="formValidationMessages.name"
                >
                  {{ formValidationMessages.name }}
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email *</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model.trim="v$.form.email.$model"
                  :class="{
                    'is-invalid':
                      v$.form.email.$error || formValidationMessages.email,
                  }"
                />
                <div
                  class="invalid-feedback"
                  v-if="formValidationMessages.email"
                >
                  {{ formValidationMessages.email }}
                </div>
              </div>
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  class="form-control"
                  id="message"
                  v-model.trim="v$.form.message.$model"
                  :class="{
                    'is-invalid':
                      v$.form.message.$error || formValidationMessages.message,
                  }"
                >
                </textarea>
                <div
                  class="invalid-feedback"
                  v-if="formValidationMessages.message"
                >
                  {{ formValidationMessages.message }}
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="v$.$invalid"
                @click.prevent="onSubmit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <gws-modal v-if="modal.success || modal.error">
      <template v-slot:header>FoodClub</template>
      <template v-slot:body>
        {{ modal.message }}
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary py-1" @click="onModalClose">OK</button>
      </template>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default';
import useVuelidate from '@vuelidate/core';
import { helpers, required, email, maxLength } from '@vuelidate/validators';
import ContactMap from '@/components/Map.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'AppMap',
  components: {
    gwsMap: ContactMap,
    gwsModal: Modal,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      formValidationMessages: {
        name: '',
        email: '',
        message: '',
      },
      modal: {
        success: false,
        error: false,
        message: '',
      },
    };
  },
  computed: {
    formName() {
      return this.form.name;
    },
    formEmail() {
      return this.form.email;
    },
    formMessage() {
      return this.form.message;
    },
  },
  watch: {
    formName: function () {
      this.setValidationMessage('name');
    },
    formEmail: function () {
      this.setValidationMessage('email');
    },
    formMessage: function () {
      this.setValidationMessage('message');
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('setLoading', true);
      const data = {};

      for (let key in this.form) {
        if (this.form[key]) {
          data[key] = this.form[key];
        }
      }

      axios
        .post('/messages', data)
        .then(() => {
          this.onStopLoading();
          this.modal.success = true;
          this.modal.message = 'The message has been sent successfully!';
          this.resetForm();
        })
        .catch((error) => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.onStopLoading();
      this.modal.error = true;
      const errors = error.response.data.errors;

      switch (error.response.status) {
        case 422:
          this.modal.message = error.response.data.message;

          for (let key in errors) {
            this.formValidationMessages[key] = errors[key].join(' ');
          }
          break;
        default:
          this.modal.message = 'Oops! Something went wrong.';
      }
    },
    onStopLoading() {
      this.$store.dispatch('setLoading', false);
    },
    onModalClose() {
      this.modal.message = '';
      this.modal.error = false;
      this.modal.success = false;
    },
    resetForm() {
      this.v$.$reset();
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
    setValidationMessage(key) {
      if (!this.v$.form[key].$dirty) {
        return;
      }
      if (this.v$.form[key].$invalid) {
        this.formValidationMessages[key] = this.v$.form[key].$errors
          .map((error) => error.$message)
          .join('. ');
      } else {
        this.formValidationMessages[key] = null;
      }
    },
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage(
            'The name field is required.',
            required
          ),
          maxLength: maxLength(100),
        },
        email: {
          required: helpers.withMessage(
            'The email field is required.',
            required
          ),
          email,
          maxLength: maxLength(100),
        },
        message: {
          required: helpers.withMessage(
            'The message field is required.',
            required
          ),
          maxLength: maxLength(1000),
        },
      },
    };
  },
};
</script>

<style scoped>
h1 {
  font-family: PatrickHand, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
}
</style>
