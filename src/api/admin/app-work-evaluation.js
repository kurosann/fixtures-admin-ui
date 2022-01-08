import request from '@/utils/request'

// 查询AppWorkEvaluation列表
export function listAppWorkEvaluation(query) {
    return request({
        url: '/api/v1/app-work-evaluation',
        method: 'get',
        params: query
    })
}

// 查询AppWorkEvaluation详细
export function getAppWorkEvaluation (id) {
    return request({
        url: '/api/v1/app-work-evaluation/' + id,
        method: 'get'
    })
}


// 新增AppWorkEvaluation
export function addAppWorkEvaluation(data) {
    return request({
        url: '/api/v1/app-work-evaluation',
        method: 'post',
        data: data
    })
}

// 修改AppWorkEvaluation
export function updateAppWorkEvaluation(data) {
    return request({
        url: '/api/v1/app-work-evaluation/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppWorkEvaluation
export function delAppWorkEvaluation(data) {
    return request({
        url: '/api/v1/app-work-evaluation',
        method: 'delete',
        data: data
    })
}

