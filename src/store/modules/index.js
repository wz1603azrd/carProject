import { getBrandList, getMakeList } from '../../api/index';
const state = {
    getBrandList: [],
    getMakeList: [],
}

const mutations = {
    BandList(state, payload) {
        var obj = {};
        payload.forEach((item) => {
            var key = item.Spelling.substr(0, 1).toUpperCase();
            if (!obj[key]) {
                obj[key] = {
                    title: key,
                    list: []
                }
            }
            obj[key].list.push(item);
        });
        var arr = [];
        for (var k in obj) {
            arr.push(obj[k])
        }
        arr.sort(function(x, y) {
            return x.title.charCodeAt(0) - y.title.charCodeAt(0)
        });
        console.log(arr)
        state.getBrandList = arr
    },
    carType(state, payload) {
        state.getMakeList = payload
        console.log(state.getMakeList)
    }
}

const actions = {
    getBrandList({ commit }, payload) {
        getBrandList().then(res => {
            commit('BandList', res.data)
        })
    },
    getCarType({ commit }, payload) {
        getMakeList(payload).then(res => {
            commit('carType', res.data)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}