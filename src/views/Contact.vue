<template>
  <div class="container">
    <gws-map/>
    <div class="row">
      <div class="col my-4">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center text-muted">Contact Us</h1>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="name">Name*</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model.trim="$v.form.name.$model"
                  :class="{ 'is-invalid': ($v.form.name.$error || formValidationMessages.name) }"
                >
                <div
                  class="invalid-feedback"
                  v-if="formValidationMessages.name"
                >{{ formValidationMessages.name }}</div>
              </div>
              <div class="form-group">
                <label for="email">Email*</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model.trim="$v.form.email.$model"
                  :class="{ 'is-invalid': ($v.form.email.$error || formValidationMessages.email) }"
                >
                <div
                  class="invalid-feedback"
                  v-if="formValidationMessages.email"
                >{{ formValidationMessages.email }}</div>
              </div>
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="phone"
                  class="form-control"
                  id="phone"
                  aria-describedby="phoneHelp"
                  v-model.trim="$v.form.phone.$model"
                  :class="{ 'is-invalid': ($v.form.phone.$error || formValidationMessages.phone) }"
                >
                <div
                  class="invalid-feedback"
                  v-if="formValidationMessages.phone"
                >{{ formValidationMessages.phone }}</div>
                <small
                  id="phoneHelp"
                  class="text-muted">
                  It must be a brazilian valid phone number.
                </small>
              </div>
              <div class="form-group">
                <label for="message">Message*</label>
                <textarea
                  class="form-control"
                  id="message"
                  v-model.trim="$v.form.message.$model"
                  :class="{ 'is-invalid': ($v.form.message.$error || formValidationMessages.message) }"
                ></textarea>
                <div
                  class="invalid-feedback"
                  v-if="formValidationMessages.message"
                >{{ formValidationMessages.message }}</div>
              </div>
              <button
                type="submit"
                class="btn btn-outline-primary"
                :disabled="$v.$invalid"
                @click.prevent="onSubmit"
              >Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <gws-modal v-if="modal.success || modal.error">
      <div slot="header"> My Products</div>
      <div slot="body">{{ modal.message }}</div>
      <button class="btn btn-primary" @click="onModalClose" slot="footer">OK</button>
    </gws-modal>
    <gws-modal v-if="modal.loading">
      <gws-spinner slot="body"></gws-spinner>
    </gws-modal>
  </div>
</template>

<script>
import axios from '@/axios-default'
import { required, email, maxLength, helpers } from 'vuelidate/lib/validators'
import ContactMap from '@/components/Map.vue'
import Modal from '@/components/Modal.vue'
import Spinner from '@/components/Spinner.vue'

const phoneRegex = helpers.regex('phoneRegex', /^(\(?\+?55\)?)?[- ]?\(?\d{2}\)?[- ]?(\d{1})?[- ]?(\d{4})[- ]?(\d{4})$/)

export default {
  data () {
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
        loading: false,
        success: false,
        error: false,
        message: null
      }
    }
  },
  computed: {
    formName () {
      return this.form.name
    },
    formEmail () {
      return this.form.email
    },
    formPhone () {
      return this.form.phone
    },
    formMessage () {
      return this.form.message
    }
  },
  watch: {
    formName: function () {
      if (!this.$v.form.name.$dirty) {
        return
      }
      if (!this.$v.form.name.maxLength) {
        this.formValidationMessages.name = `The name may not be greater than ${this.$v.form.name.$params.maxLength.max} characters.`
      } else if (!this.$v.form.name.required) {
        this.formValidationMessages.name = 'The name field is required.'
      } else {
        this.formValidationMessages.name = null
      }
    },
    formEmail: function () {
      if (!this.$v.form.email.$dirty) {
        return
      }
      if (!this.$v.form.email.maxLength) {
        this.formValidationMessages.email = `The email may not be greater than ${this.$v.form.email.$params.maxLength.max} characters.`
      } else if (!this.$v.form.email.required) {
        this.formValidationMessages.email = 'The email field is required.'
      } else if (!this.$v.form.email.email) {
        this.formValidationMessages.email = 'The email must be a valid email address.'
      } else {
        this.formValidationMessages.email = null
      }
    },
    formPhone: function () {
      if (!this.$v.form.phone.$dirty) {
        return
      }
      if (!this.$v.form.phone.phoneRegex) {
        this.formValidationMessages.phone = 'The phone format is invalid.'
      } else {
        this.formValidationMessages.phone = null
      }
    },
    formMessage: function () {
      if (!this.$v.form.message.$dirty) {
        return
      }
      if (!this.$v.form.message.maxLength) {
        this.formValidationMessages.message = `The message may not be greater than ${this.$v.form.message.$params.maxLength.max} characters.`
      } else if (!this.$v.form.message.required) {
        this.formValidationMessages.message = 'The message field is required.'
      } else {
        this.formValidationMessages.message = null
      }
    }
  },
  methods: {
    onSubmit () {
      this.modal.loading = true
      const data = new FormData()

      for (let key in this.form) {
        if (this.form[key]) {
          data.append(key, this.form[key])
        }
      }

      axios.post('/contacts', data)
        .then(response => {
          this.modal.loading = false
          this.modal.success = true
          this.modal.message = 'Message sent successfully'
          this.resetForm()
        })
        .catch(error => {
          this.onHttpRequestError(error)
        })
    },
    onHttpRequestError (error) {
      this.modal.loading = false
      this.modal.error = true
      console.log(error.response)

      switch (error.response.status) {
        case 422:
          this.modal.message = error.response.data.message

          const errors = error.response.data.errors

          for (let key in errors) {
            this.formValidationMessages[key] = errors[key].join(' ')
          }
          break
        default:
          this.modal.message = 'Oops! Something went wrong.'
      }
    },
    onModalClose () {
      this.modal.loading = false
      this.modal.message = null
      this.modal.error = false
      this.modal.success = false
    },
    resetForm () {
      this.$v.$reset()
      this.form.name = null
      this.form.email = null
      this.form.phone = null
      this.form.message = null
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
    gwsModal: Modal,
    gwsSpinner: Spinner
  }
}
</script>

<style scoped>

</style>
