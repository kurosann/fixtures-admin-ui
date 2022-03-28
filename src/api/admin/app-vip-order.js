import request from '@/utils/request'

// 查询AppVipOrder列表
export function listAppVipOrder(query) {
    return request({
        url: '/api/v1/app-vip-order',
        method: 'get',
        params: query
    })
}

// 查询AppVipOrder详细
export function getAppVipOrder (id) {
    return request({
        url: '/api/v1/app-vip-order/' + id,
        method: 'get'
    })
}


// 新增AppVipOrder
export function addAppVipOrder(data) {
    return request({
        url: '/api/v1/app-vip-order',
        method: 'post',
        data: data
    })
}

// 修改AppVipOrder
export function updateAppVipOrder(data) {
    return request({
        url: '/api/v1/app-vip-order/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppVipOrder
export function delAppVipOrder(data) {
    return request({
        url: '/api/v1/app-vip-order',
        method: 'delete',
        data: data
    })
}

