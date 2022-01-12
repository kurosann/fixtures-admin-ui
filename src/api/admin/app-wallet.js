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

// 修改AppWallet/上传凭据
export function updateAppWallet(data) {
    return request({
        url: '/api/v1/app-wallet/'+data.id,
        method: 'put',
        data: data
    })
}

// 审核通过
export function appWalletWithdrawSuccess(data) {
    return request({
        url: '/api/v1/app-wallet/with-draw-success',
      method: 'post',
      data: data
    })
}

// 审核拒绝
export function appWalletWithdrawFail(data) {
    return request({
        url: '/api/v1/app-wallet/with-draw-fail',
        method: 'post',
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

