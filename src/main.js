import Vue from 'vue'
import { Button, Row, Col, Tabs, TabPane, Table, TableColumn, Card, Loading, MessageBox, Message } from 'element-ui';


import router from '@/router/router.config.js';
import { store } from '@/vuex/pos.vuex.js';
import App from '@/App.vue';

Vue.use(Row);
Vue.use(Col);
Vue.use(Button)
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Card);
Vue.use(Loading);
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
