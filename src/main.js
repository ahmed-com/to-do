import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import Vuelidate from 'vuelidate';

axios.defaults.baseURL = 'http://localhost:3000/tenth';
axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.config.productionTip = false
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
