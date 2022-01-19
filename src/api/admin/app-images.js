import request from '@/utils/request'

// 查询AppImages列表
export function listAppImages(query) {
    return request({
        url: '/api/v1/app-images',
        method: 'get',
        params: query
    })
}

// 查询AppImages详细
export function getAppImages (id) {
    return request({
        url: '/api/v1/app-images/' + id,
        method: 'get'
    })
}


// 新增AppImages
export function addAppImages(data) {
    return request({
        url: '/api/v1/app-images',
        method: 'post',
        data: data
    })
}

// 修改AppImages
export function updateAppImages(data) {
    return request({
        url: '/api/v1/app-images/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppImages
export function delAppImages(data) {
    return request({
        url: '/api/v1/app-images',
        method: 'delete',
        data: data
    })
}

