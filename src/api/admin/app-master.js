import request from '@/utils/request'

// 查询AppMaster列表
export function listAppMaster(query) {
    return request({
        url: '/api/v1/app-master',
        method: 'get',
        params: query
    })
}

// 查询AppMaster详细
export function getAppMaster (id) {
    return request({
        url: '/api/v1/app-master/' + id,
        method: 'get'
    })
}


// 新增AppMaster
export function addAppMaster(data) {
    return request({
        url: '/api/v1/app-master',
        method: 'post',
        data: data
    })
}

// 修改AppMaster
export function updateAppMaster(data) {
    return request({
        url: '/api/v1/app-master/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppMaster
export function delAppMaster(data) {
    return request({
        url: '/api/v1/app-master',
        method: 'delete',
        data: data
    })
}

