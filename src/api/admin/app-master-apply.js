import request from '@/utils/request'

// 查询AppMasterApply列表
export function listAppMasterApply(query) {
    return request({
        url: '/api/v1/app-master-apply',
        method: 'get',
        params: query
    })
}

// 查询AppMasterApply详细
export function getAppMasterApply (id) {
    return request({
        url: '/api/v1/app-master-apply/' + id,
        method: 'get'
    })
}


// 新增AppMasterApply
export function addAppMasterApply(data) {
    return request({
        url: '/api/v1/app-master-apply',
        method: 'post',
        data: data
    })
}

// 修改AppMasterApply
export function updateAppMasterApply(data) {
    return request({
        url: '/api/v1/app-master-apply/'+data.id,
        method: 'put',
        data: data
    })
}

// 修改AppMasterApply
export function auditAppMasterApply(data) {
    return request({
        url: '/api/v1/app-master-apply/update_pass/'+data.id+'/'+data.state,
        method: 'put',
        data: data
    })
}
// 修改AppMasterApply
export function sendAppMasterApply(data) {
    return request({
        url: '/api/v1/app-master-apply/veto/'+data.id,
        method: 'get'
    })
}

// 删除AppMasterApply
export function delAppMasterApply(data) {
    return request({
        url: '/api/v1/app-master-apply',
        method: 'delete',
        data: data
    })
}

