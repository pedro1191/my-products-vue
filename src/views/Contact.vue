<template>
  <div class="container">
    <gws-map />

    <div class="row">
      <div class="col-md-8 my-4 mx-auto">
        <div>
          <div>
            <h1 class="text-center text-danger">Contact Us</h1>
          </div>
          <div>
            <form>
              <div class="form-group">
                <label for="name">Name*</label>
                <input type="text" class="form-control" id="name" v-model.trim="$v.form.name.$model" :class="{ 'is-invalid': ($v.form.name.$error || formValidationMessages.name) }">
                <div class="invalid-feedback" v-if="formValidationMessages.name">{{ formValidationMessages.name }}</div>
              </div>
              <div class="form-group">
                <label for="email">Email*</label>
                <input type="email" class="form-control" id="email" v-model.trim="$v.form.email.$model" :class="{ 'is-invalid': ($v.form.email.$error || formValidationMessages.email) }">
                <div class="invalid-feedback" v-if="formValidationMessages.email">{{ formValidationMessages.email }}</div>
              </div>
              <div class="form-group">
                <label for="phone">Phone</label>
                <input type="phone" class="form-control" id="phone" aria-describedby="phoneHelp" v-model.trim="$v.form.phone.$model" :class="{ 'is-invalid': ($v.form.phone.$error || formValidationMessages.phone) }">
                <div class="invalid-feedback" v-if="formValidationMessages.phone">{{ formValidationMessages.phone }}</div>
                <small id="phoneHelp" class="text-muted">
                  It must be a brazilian valid phone number.
                </small>
              </div>
              <div class="form-group">
                <label for="message">Message*</label>
                <textarea class="form-control" id="message" v-model.trim="$v.form.message.$model" :class="{ 'is-invalid': ($v.form.message.$error || formValidationMessages.message) }"></textarea>
                <div class="invalid-feedback" v-if="formValidationMessages.message">{{ formValidationMessages.message }}</div>
              </div>
              <button type="submit" class="btn btn-outline-secondary" :disabled="$v.$invalid" @click.prevent="onSubmit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <gws-modal v-if="modal.success || modal.error">
      <div class="local-modal-header" slot="header"> My Food</div>
      <div class="local-modal-body" slot="body">{{ modal.message }}</div>
      <div class="local-modal-footer" slot="footer">
        <button class="btn btn-secondary" @click="onModalClose">OK</button>
      </div>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default';
import { required, email, maxLength, helpers } from 'vuelidate/lib/validators';
import ContactMap from '@/components/Map.vue';
import Modal from '@/components/Modal.vue';

const phoneRegex = helpers.regex(
  'phoneRegex',
  /^(\(?\+?55\)?)?[- ]?\(?\d{2}\)?[- ]?(\d{1})?[- ]?(\d{4})[- ]?(\d{4})$/
);

export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        phone: null,
        message: null
      },
      formValidationMessages: {
        name: null,
        email: null,
        phone: null,
        message: null
      },
      modal: {
        success: false,
        error: false,
        message: null
      }
    };
  },
  computed: {
    formName() {
      return this.form.name;
    },
    formEmail() {
      return this.form.email;
    },
    formPhone() {
      return this.form.phone;
    },
    formMessage() {
      return this.form.message;
    }
  },
  watch: {
    formName: function() {
      if (!this.$v.form.name.$dirty) {
        return;
      }
      if (!this.$v.form.name.maxLength) {
        this.formValidationMessages.name = `The name may not be greater than ${
          this.$v.form.name.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.form.name.required) {
        this.formValidationMessages.name = 'The name field is required.';
      } else {
        this.formValidationMessages.name = null;
      }
    },
    formEmail: function() {
      if (!this.$v.form.email.$dirty) {
        return;
      }
      if (!this.$v.form.email.maxLength) {
        this.formValidationMessages.email = `The email may not be greater than ${
          this.$v.form.email.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.form.email.required) {
        this.formValidationMessages.email = 'The email field is required.';
      } else if (!this.$v.form.email.email) {
        this.formValidationMessages.email =
          'The email must be a valid email address.';
      } else {
        this.formValidationMessages.email = null;
      }
    },
    formPhone: function() {
      if (!this.$v.form.phone.$dirty) {
        return;
      }
      if (!this.$v.form.phone.phoneRegex) {
        this.formValidationMessages.phone = 'The phone format is invalid.';
      } else {
        this.formValidationMessages.phone = null;
      }
    },
    formMessage: function() {
      if (!this.$v.form.message.$dirty) {
        return;
      }
      if (!this.$v.form.message.maxLength) {
        this.formValidationMessages.message = `The message may not be greater than ${
          this.$v.form.message.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.form.message.required) {
        this.formValidationMessages.message = 'The message field is required.';
      } else {
        this.formValidationMessages.message = null;
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('setLoading', true);
      const data = new FormData();

      for (let key in this.form) {
        if (this.form[key]) {
          data.append(key, this.form[key]);
        }
      }

      axios
        .post('/contacts', data)
        .then(response => {
          this.onStopLoading();
          console.log(response.data);
          this.modal.success = true;
          this.modal.message = 'Message sent successfully';
          this.resetForm();
        })
        .catch(error => {
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
      this.modal.message = null;
      this.modal.error = false;
      this.modal.success = false;
    },
    resetForm() {
      this.$v.$reset();
      this.form.name = null;
      this.form.email = null;
      this.form.phone = null;
      this.form.message = null;
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(100)
      },
      email: {
        required,
        email,
        maxLength: maxLength(100)
      },
      phone: {
        phoneRegex
      },
      message: {
        required,
        maxLength: maxLength(1000)
      }
    }
  },
  components: {
    gwsMap: ContactMap,
    gwsModal: Modal
  }
};
</script>

<style scoped>
.local-modal-header,
.local-modal-body,
.local-modal-footer {
  padding: 0.5rem;
  background-color: #fff;
  width: 100%;
}

.local-modal-header {
  text-align: left;
  color: #dc3545;
  font-weight: bold;
}

.local-modal-footer {
  text-align: right;
}
</style>
