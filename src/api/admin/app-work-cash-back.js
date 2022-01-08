import request from '@/utils/request'

// 查询AppWorkCashBack列表
export function listAppWorkCashBack(query) {
    return request({
        url: '/api/v1/app-work-cash-back',
        method: 'get',
        params: query
    })
}

// 查询AppWorkCashBack详细
export function getAppWorkCashBack (id) {
    return request({
        url: '/api/v1/app-work-cash-back/' + id,
        method: 'get'
    })
}


// 新增AppWorkCashBack
export function addAppWorkCashBack(data) {
    return request({
        url: '/api/v1/app-work-cash-back',
        method: 'post',
        data: data
    })
}

// 修改AppWorkCashBack
export function updateAppWorkCashBack(data) {
    return request({
        url: '/api/v1/app-work-cash-back/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppWorkCashBack
export function delAppWorkCashBack(data) {
    return request({
        url: '/api/v1/app-work-cash-back',
        method: 'delete',
        data: data
    })
}

