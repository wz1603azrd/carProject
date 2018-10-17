import { getCityAlllist, getProvince, getCityInfo, getQuestionInfo } from '@/api/index'
const state = {
    cityAlllist: [],
    provinceList: [],
    CityCar: {},
    questionInfo: [],
    isHidden: true,
    ShowCity: undefined,
    carId: 0,
    isShowAlertContent: false
}

const mutations = {
    updateAlllist(state, payload) {
        state.cityAlllist = payload
    },
    updateProvince(state, payload) {
        state.provinceList = payload
    },
    updateCityCar(state, payload) {
        state.CityCar = payload
    },
    updateQuestionInfo(state, payload) {
        state.questionInfo = payload
    },
    updataisHidden(state) {
        state.isHidden = !state.isHidden
    },
    updataShowCity(state, payload) {
        state.ShowCity = payload
    },
    updataCarId(state, payload) {
        state.carId = payload
    },
    updataAlertContent(state) {
        state.isShowAlertContent = !state.isShowAlertContent
    }
}

const actions = {
    //获取所有省份信息
    getCityAlllist({ commit }) {
        getCityAlllist().then(res => {
            console.log(res.data)
            commit('updateAlllist', res.data)
        })
    },
    //获取城市的信息
    getProvince({ commit }, payload) {
        getProvince(payload).then(res => {
            console.log(res.data)
            commit('updateProvince', res.data)
        })
    },
    //获取返回的城市信息车系
    getCityInfo({ commit }, payload) {
        getCityInfo().then(res => {
            console.log(res.data)
            commit('updateCityCar', res.data)
        })
    },
    //获取当前页面信息
    getQuestionInfo({ commit }, payload) {
        getCityInfo().then(res => {
            getQuestionInfo(payload.carId, payload.cityId || res.data.CityID).then(body => {
                console.log(body.data)
                commit('updateQuestionInfo', body.data)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}