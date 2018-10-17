import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/index';
import detail from './modules/detail';
import question from './modules/question';
import img from './modules/img';
import logger from 'vuex/dist/logger';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        index,
        detail,
        question,
        img
    },
    plugins: [
        logger()
    ]
})