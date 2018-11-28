import Vue from 'vue'
import Board from './board'

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    components: { Board }
});