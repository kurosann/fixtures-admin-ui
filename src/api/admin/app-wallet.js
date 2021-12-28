import request from '@/utils/request'

// 查询AppWallet列表
export function listAppWallet(query) {
    return request({
        url: '/api/v1/app-wallet',
        method: 'get',
        params: query
    })
}

// 查询AppWallet详细
export function getAppWallet (id) {
    return request({
        url: '/api/v1/app-wallet/' + id,
        method: 'get'
    })
}


// 新增AppWallet
export function addAppWallet(data) {
    return request({
        url: '/api/v1/app-wallet',
        method: 'post',
        data: data
    })
}

// 修改AppWallet
export function updateAppWallet(data) {
    return request({
        url: '/api/v1/app-wallet/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppWallet
export function delAppWallet(data) {
    return request({
        url: '/api/v1/app-wallet',
        method: 'delete',
        data: data
    })
}

