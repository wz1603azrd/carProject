import { getDetail } from '@/api/index'
import { mergeCar, sortCar, filter } from '@/utils/index'
const state = {
    detailList: {},
    obj: {},
    topList: ['全部']
}

const mutations = {
    detailList(state, payload) {
        state.detailList = payload
        console.log(state.detailList)
        state.topList = ['全部']
        payload.list.forEach(item => {
            if (state.topList.indexOf(item.market_attribute.year) == -1) {
                state.topList.push(item.market_attribute.year)
            }
        })
        console.log(state.topList)
        state.obj = mergeCar(sortCar(payload.list))
        console.log(mergeCar(sortCar(payload.list)))
            // margeCar(sortCar(payload.list)),
            // mergeCar(sortCar(filter(2018, payload.list))))
    },
    filter(state, payload) {
        if (isNaN(Number(state.topList[payload]))) {
            state.obj = mergeCar(sortCar(state.detailList.list))
        } else {
            state.obj = mergeCar(sortCar(filter(Number(state.topList[payload]), state.detailList.list)))
        }

    }
}


const actions = {
    getDetailList({ commit }, payload) {
        getDetail(payload).then(res => {
            commit('detailList', res.data)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}