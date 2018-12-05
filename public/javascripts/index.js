import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from './board'

import '../stylesheets/board.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'smartwizard/dist/css/smart_wizard.min.css'
import 'smartwizard/dist/css/smart_wizard_theme_arrows.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [{
    path: '/:boardId',
    name: 'board',
    component: Board
}];

const router = new VueRouter({
    base: '/board',
    mode: 'history',
    routes
});

var app = new Vue({
    el: '#app',
    router,
    data: {
        message: 'Hello Vue!'
    },
    components: {
        Board,
        FontAwesomeIcon
    }
});