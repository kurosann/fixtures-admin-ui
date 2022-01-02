import request from '@/utils/request'

// 查询AppItemMaterial列表
export function listAppItemMaterial(query) {
    return request({
        url: '/api/v1/app-item-material',
        method: 'get',
        params: query
    })
}

// 查询AppItemMaterial详细
export function getAppItemMaterial (id) {
    return request({
        url: '/api/v1/app-item-material/' + id,
        method: 'get'
    })
}


// 新增AppItemMaterial
export function addAppItemMaterial(data) {
    return request({
        url: '/api/v1/app-item-material',
        method: 'post',
        data: data
    })
}

// 修改AppItemMaterial
export function updateAppItemMaterial(data) {
    return request({
        url: '/api/v1/app-item-material/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppItemMaterial
export function delAppItemMaterial(data) {
    return request({
        url: '/api/v1/app-item-material',
        method: 'delete',
        data: data
    })
}

