import request from '@/utils/request'

// 查询AppInvitateCashBack列表
export function listAppInvitateCashBack(query) {
    return request({
        url: '/api/v1/app-invitate-cash-back',
        method: 'get',
        params: query
    })
}

// 查询AppInvitateCashBack详细
export function getAppInvitateCashBack (id) {
    return request({
        url: '/api/v1/app-invitate-cash-back/' + id,
        method: 'get'
    })
}


// 新增AppInvitateCashBack
export function addAppInvitateCashBack(data) {
    return request({
        url: '/api/v1/app-invitate-cash-back',
        method: 'post',
        data: data
    })
}

// 修改AppInvitateCashBack
export function updateAppInvitateCashBack(data) {
    return request({
        url: '/api/v1/app-invitate-cash-back/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppInvitateCashBack
export function delAppInvitateCashBack(data) {
    return request({
        url: '/api/v1/app-invitate-cash-back',
        method: 'delete',
        data: data
    })
}

