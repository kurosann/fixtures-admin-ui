import request from '@/utils/request'

// 查询AppRefundOrder列表
export function listAppRefundOrder(query) {
    return request({
        url: '/api/v1/app-refund-order',
        method: 'get',
        params: query
    })
}

// 查询AppRefundOrder详细
export function getAppRefundOrder (id) {
    return request({
        url: '/api/v1/app-refund-order/' + id,
        method: 'get'
    })
}


// 新增AppRefundOrder
export function addAppRefundOrder(data) {
    return request({
        url: '/api/v1/app-refund-order',
        method: 'post',
        data: data
    })
}

// 修改AppRefundOrder
export function updateAppRefundOrder(data) {
    return request({
        url: '/api/v1/app-refund-order/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppRefundOrder
export function delAppRefundOrder(data) {
    return request({
        url: '/api/v1/app-refund-order',
        method: 'delete',
        data: data
    })
}

