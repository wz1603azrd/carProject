//动态判断域名
const host = /localhost/.test(window.location.host) ? 'http://baojia.chelun.com' : 'https://baojia.chelun.com';

function sendRequest(url, method = 'GET', data = {}) {
    let parmas = {
        method
    };
    //判断如果是一个post请求，带上请求体信息
    if (method == 'POST') {
        parmas.body = JSON.stringify(data);
    }
    //判断请求查询url是否携带query
    if (url.indexOf('?') == -1) {
        url += `?_=${+new Date()}`
    } else {
        url += `&_=${+new Date()}`
    }
    return fetch(host + url, parmas).then(res => res.json()).then(body => body)
}

/**
 * 获取车轮品牌数据
 * @return promise
 */
export let getBrandList = () => {
    return sendRequest('/v2-car-getMasterBrandList.html')
}

/**
 * 获取车系数据
 * @param id 车牌品牌id
 * @return promise
 */
export let getMakeList = (id) => {
    return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}

/**
 * 获取品牌详情
 * @param id
 * @return promise
 */
export let getDetail = (id) => {
    return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`)
}

/**
 * 获取车系价格
 * @param id
 * @return promise
 */
export let getPrice = (id) => {
    return sendRequest(`/v2-dealer-alllist.html?carId=${id}&cityId=201&_1539317031461`)
}

/**
 * 获取图片列表的接口
 * @param {*} serialId 车系id
 * @param {*} imgId 图片分类id
 * @param {*} page 分页页码数
 * @param {*} pageSize 分页每页数量
 * @param {*} carId 车型id
 * @param {*} colorId 颜色Id
 */
export let getCategoryImgList = (param) => {
    let search = ``;
    for (let i in param) {
        search += `&${i}=${param[i]}`;
    }
    // 补充page与pageSize
    if (!param['Page']) {
        search += `&Page=1`;
    }
    if (!param['PageSize']) {
        search += `&PageSize=30`;
    }
    return sendRequest(`/v2-car-getCategoryImageList.html?${search.slice(1, search.length)}`);
}

/**
 * 
 *  获取图片列表的接口
 * @param {*} serialId 车系id
 * @param {*} imgId 图片分类id
 * @param {*} page 分页页码数
 * @param {*} pageSize 分页每页数量
 * @param {*} carId 车型id
 * @param {*} colorId 颜色Id
 */
export let getImageList = (param) => {
    let search = ``;
    for (let i in param) {
        search += `&${i}=${param[i]}`;
    }
    // 补充page与pageSize
    if (!param['Page']) {
        search += `&Page=1`;
    }
    if (!param['PageSize']) {
        search += `&PageSize=30`;
    }
    return sendRequest(`/v2-car-getImageList.html?${search.slice(1, search.length)}`);
}

/**
 * 获取所有省份信息
 */
export let getCityAlllist = () => {
    return sendRequest(`/v1-city-alllist.html`)
}

/**
 * 获取城市信息
 * @param id 省份id
 */
export let getProvince = (id) => {
    return sendRequest(`/v1-city-alllist.html?provinceid=${id}`)
}

/**
 * 获取城市信息
 */
export let getCityInfo = () => {
    return sendRequest(`/location-client.html`);
}

/**
 * 获取城市信息
 * @param carId 车系id
 * @param cityId 城市id
 */
export let getQuestionInfo = (carId, cityId) => {
    return sendRequest(`/v2-dealer-alllist.html?carId=${carId}&cityId=${cityId}`);
}