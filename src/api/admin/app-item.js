import request from '@/utils/request'

// 查询AppItem列表
export function listAppItem(query) {
    return request({
        url: '/api/v1/app-item',
        method: 'get',
        params: query
    })
}

// 查询AppItem详细
export function getAppItem (id) {
    return request({
        url: '/api/v1/app-item/' + id,
        method: 'get'
    })
}


// 新增AppItem
export function addAppItem(data) {
    return request({
        url: '/api/v1/app-item',
        method: 'post',
        data: data
    })
}

// 修改AppItem
export function updateAppItem(data) {
    return request({
        url: '/api/v1/app-item/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppItem
export function delAppItem(data) {
    return request({
        url: '/api/v1/app-item',
        method: 'delete',
        data: data
    })
}

