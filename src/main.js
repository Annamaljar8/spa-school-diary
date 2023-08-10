import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { format } from 'date-fns';
import { pl } from 'date-fns/locale'; // Polish locale

Vue.config.productionTip = false

Vue.prototype.$dateFormatter = (date, dateFormat) =>
  format(date, dateFormat, { locale: pl });

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
