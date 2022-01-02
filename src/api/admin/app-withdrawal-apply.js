import request from '@/utils/request'

// 查询AppWithdrawalApply列表
export function listAppWithdrawalApply(query) {
    return request({
        url: '/api/v1/app-withdrawal-apply',
        method: 'get',
        params: query
    })
}

// 查询AppWithdrawalApply详细
export function getAppWithdrawalApply (id) {
    return request({
        url: '/api/v1/app-withdrawal-apply/' + id,
        method: 'get'
    })
}


// 新增AppWithdrawalApply
export function addAppWithdrawalApply(data) {
    return request({
        url: '/api/v1/app-withdrawal-apply',
        method: 'post',
        data: data
    })
}

// 修改AppWithdrawalApply
export function updateAppWithdrawalApply(data) {
    return request({
        url: '/api/v1/app-withdrawal-apply/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppWithdrawalApply
export function delAppWithdrawalApply(data) {
    return request({
        url: '/api/v1/app-withdrawal-apply',
        method: 'delete',
        data: data
    })
}

