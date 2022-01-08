import request from '@/utils/request'

// 查询AppAfterOrder列表
export function listAppAfterOrder(query) {
    return request({
        url: '/api/v1/app-after-order',
        method: 'get',
        params: query
    })
}

// 查询AppAfterOrder详细
export function getAppAfterOrder (id) {
    return request({
        url: '/api/v1/app-after-order/' + id,
        method: 'get'
    })
}


// 新增AppAfterOrder
export function addAppAfterOrder(data) {
    return request({
        url: '/api/v1/app-after-order',
        method: 'post',
        data: data
    })
}

// 修改AppAfterOrder
export function updateAppAfterOrder(data) {
    return request({
        url: '/api/v1/app-after-order/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppAfterOrder
export function delAppAfterOrder(data) {
    return request({
        url: '/api/v1/app-after-order',
        method: 'delete',
        data: data
    })
}

