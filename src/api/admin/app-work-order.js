import request from '@/utils/request'

// 查询AppWorkOrder列表
export function listAppWorkOrder(query) {
    return request({
        url: '/api/v1/app-work-order',
        method: 'get',
        params: query
    })
}

// 查询AppWorkOrder详细
export function getAppWorkOrder (id) {
    return request({
        url: '/api/v1/app-work-order/' + id,
        method: 'get'
    })
}


// 新增AppWorkOrder
export function addAppWorkOrder(data) {
    return request({
        url: '/api/v1/app-work-order',
        method: 'post',
        data: data
    })
}

// 修改AppWorkOrder
export function updateAppWorkOrder(data) {
    return request({
        url: '/api/v1/app-work-order/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppWorkOrder
export function delAppWorkOrder(data) {
    return request({
        url: '/api/v1/app-work-order',
        method: 'delete',
        data: data
    })
}

