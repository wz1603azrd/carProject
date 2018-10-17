import { getCategoryImgList, getImageList } from '@/api/';
const state = {
    imgList: [],
    Page: 1,
    isFetching: false,
    imgAllList: {}
}

const mutations = {
    /**
     *  做数据处理
     * @param {*} state
     * @param {*} payload
     */
    updateImgList(state, payload) {
        state.imgList = state.imgList.concat(payload.List);
        state.Page++;
        state.isFetching = false;
    },
    startFetching(state) {
        state.isFetching = true;
    },
    upAllImgList(state, payload) {
        state.imgAllList = payload
    }
}

const actions = {
    getCategoryImgList({ commit, state }, payload) {
        console.log('payload...', payload);
        payload.Page = state.Page;
        if (state.isFetching) {
            return;
        }
        commit('startFetching');
        getCategoryImgList(payload).then(res => {
            console.log('res..', res);
            commit('updateImgList', res.data);
        })
    },
    getImageList({ commit }, payload) {
        getImageList(payload).then(res => {
            console.log('res...', res.data);
            commit('upAllImgList', res.data);
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}