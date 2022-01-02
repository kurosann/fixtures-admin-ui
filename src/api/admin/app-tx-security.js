import request from '@/utils/request'

// 查询AppTxSecurity列表
export function listAppTxSecurity(query) {
    return request({
        url: '/api/v1/app-tx-security',
        method: 'get',
        params: query
    })
}

// 查询AppTxSecurity详细
export function getAppTxSecurity (id) {
    return request({
        url: '/api/v1/app-tx-security/' + id,
        method: 'get'
    })
}


// 新增AppTxSecurity
export function addAppTxSecurity(data) {
    return request({
        url: '/api/v1/app-tx-security',
        method: 'post',
        data: data
    })
}

// 修改AppTxSecurity
export function updateAppTxSecurity(data) {
    return request({
        url: '/api/v1/app-tx-security/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppTxSecurity
export function delAppTxSecurity(data) {
    return request({
        url: '/api/v1/app-tx-security',
        method: 'delete',
        data: data
    })
}

