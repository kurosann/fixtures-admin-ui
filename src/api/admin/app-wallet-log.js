import request from '@/utils/request'

// 查询AppWalletLog列表
export function listAppWalletLog(query) {
    return request({
        url: '/api/v1/app-wallet-log',
        method: 'get',
        params: query
    })
}

// 查询AppWalletLog详细
export function getAppWalletLog (id) {
    return request({
        url: '/api/v1/app-wallet-log/' + id,
        method: 'get'
    })
}


// 新增AppWalletLog
export function addAppWalletLog(data) {
    return request({
        url: '/api/v1/app-wallet-log',
        method: 'post',
        data: data
    })
}

// 修改AppWalletLog
export function updateAppWalletLog(data) {
    return request({
        url: '/api/v1/app-wallet-log/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppWalletLog
export function delAppWalletLog(data) {
    return request({
        url: '/api/v1/app-wallet-log',
        method: 'delete',
        data: data
    })
}

