import Vue from 'vue'
import store from './store'
import './plugins/vuetify'
import App from './App.vue'
import BuyModalComponent from '@/components/Shared/BuyModal'
import router from './router'
import * as fb from 'firebase' // импортируем все из Firebase
import './registerServiceWorker'
import './stylus/main.styl'

Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyAfBif9QuP04uXMYdkun4x1UX5uRZCjuEA",
      authDomain: "mm-ads.firebaseapp.com",
      databaseURL: "https://mm-ads.firebaseio.com",
      projectId: "mm-ads",
      storageBucket: "mm-ads.appspot.com",
      messagingSenderId: "844040774783"
    })

    fb.auth().onAuthStateChanged(user => {
      // console.log('user is' + user)
      if (user) {
        // console.log('user is here ' + user.uid)
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },
  render: h => h(App)
}).$mount('#app')
