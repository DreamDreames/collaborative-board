import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from './board'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueRouter);

const routes = [ 
    { 
        path: '/:boardId', 
        name: 'board',
        component: Board 
    }
];

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
    components: { Board }
});