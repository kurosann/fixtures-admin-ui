import request from '@/utils/request'

// 查询AppOrders列表
export function listAppOrders(query) {
    return request({
        url: '/api/v1/app-orders',
        method: 'get',
        params: query
    })
}

// 查询AppOrders详细
export function getAppOrders (id) {
    return request({
        url: '/api/v1/app-orders/' + id,
        method: 'get'
    })
}


// 新增AppOrders
export function addAppOrders(data) {
    return request({
        url: '/api/v1/app-orders',
        method: 'post',
        data: data
    })
}

// 修改AppOrders
export function updateAppOrders(data) {
    return request({
        url: '/api/v1/app-orders/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppOrders
export function delAppOrders(data) {
    return request({
        url: '/api/v1/app-orders',
        method: 'delete',
        data: data
    })
}

