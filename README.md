# FoodClub

Hello and welcome!

This is a Progressive Web Application built using [Vue.js](https://vuejs.org/) that shows things divided by categories. The "theme" chosen here relates to culinary, but it could have been anything else. It consumes a [REST API](https://github.com/pedro1191/my-products-rest) to load the categories and things and links a [Dashboard](https://github.com/pedro1191/my-products-dashboard-vue) with authentication where the administrator can manage them.

The following technologies are being used:
- [axios](https://github.com/axios/axios): to consume the [REST API](https://github.com/pedro1191/my-personal-portfolio-rest)
- [bootstrap](https://getbootstrap.com/)
- [cypress](https://www.cypress.io/): for end-to-end testing
- [font awesome](https://fontawesome.com/)
- [jest](https://jestjs.io/): for unit testing
- [vue-gtag](https://github.com/MatteoGabriele/vue-gtag): to send event data to Google Analytics
- [vuelidate](https://github.com/vuelidate/vuelidate): to validate the contact form

Please visit [https://foodclub.pedrohsalmeida.com](https://foodclub.pedrohsalmeida.com) for a live demo.

## Project setup
### Install dependencies
```
npm install
```

### Create a **.env.local** file from **.env.example** and set the environment variable values
```
cp .env.example .env.local
```

- **PORT**: optional. The port in which the application should run
- **VUE_APP_DASHBOARD_APP_URL**: mandatory. It should point to a running instance of the [Dashboard](https://github.com/pedro1191/my-products-dashboard-vue) it links
- **VUE_APP_DEFAULT_BACKEND_API_URL**: mandatory. It should point to a running instance of the [REST API](https://github.com/pedro1191/my-personal-portfolio-rest) it consumes

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Runs unit tests
```
npm run test:unit
```

### Runs end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```