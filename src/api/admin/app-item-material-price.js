import request from '@/utils/request'

// 查询AppItemMaterialPrice列表
export function listAppItemMaterialPrice(query) {
    return request({
        url: '/api/v1/app-item-material-price',
        method: 'get',
        params: query
    })
}

// 查询AppItemMaterialPrice详细
export function getAppItemMaterialPrice (id) {
    return request({
        url: '/api/v1/app-item-material-price/' + id,
        method: 'get'
    })
}


// 新增AppItemMaterialPrice
export function addAppItemMaterialPrice(data) {
    return request({
        url: '/api/v1/app-item-material-price',
        method: 'post',
        data: data
    })
}

// 修改AppItemMaterialPrice
export function updateAppItemMaterialPrice(data) {
    return request({
        url: '/api/v1/app-item-material-price/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppItemMaterialPrice
export function delAppItemMaterialPrice(data) {
    return request({
        url: '/api/v1/app-item-material-price',
        method: 'delete',
        data: data
    })
}

