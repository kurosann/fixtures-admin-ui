import request from '@/utils/request'

// 查询AppBadOrder列表
export function listAppBadOrder(query) {
    return request({
        url: '/api/v1/app-bad-order',
        method: 'get',
        params: query
    })
}

// 查询AppBadOrder详细
export function getAppBadOrder (id) {
    return request({
        url: '/api/v1/app-bad-order/' + id,
        method: 'get'
    })
}


// 新增AppBadOrder
export function addAppBadOrder(data) {
    return request({
        url: '/api/v1/app-bad-order',
        method: 'post',
        data: data
    })
}

// 修改AppBadOrder
export function updateAppBadOrder(data) {
    return request({
        url: '/api/v1/app-bad-order/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppBadOrder
export function delAppBadOrder(data) {
    return request({
        url: '/api/v1/app-bad-order',
        method: 'delete',
        data: data
    })
}

