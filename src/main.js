import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);

import { format } from 'date-fns';
import { pl } from 'date-fns/locale'; // Polish locale

Vue.config.productionTip = false

Vue.prototype.$dateFormatter = (date, dateFormat) =>
  format(date, dateFormat, { locale: pl });

Vue.filter('parseCalendarDate', function(value) {
    // Split the string into date and time parts
    const [datePart, timePart] = value.split(' ');

    // Split the date part into year, month, and day
    const [year, month, day] = datePart.split('-');

    const CALENDAR_EN = {
    '01': 'January',
      '02': 'Fabuary',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    }
    
    return `${day} ${CALENDAR_EN[month]}`
});

Vue.filter('parseCalendarTime', function(value) {
    // Split the string into date and time parts
    const [datePart, timePart] = value.split(' ');

    // Split the time part into hour, minute, and second
    const [hour, minute, second] = timePart.split(':');
    
    return `${hour}:${minute}`
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
