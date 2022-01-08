import request from '@/utils/request'

// 查询AppWorkPlan列表
export function listAppWorkPlan(query) {
    return request({
        url: '/api/v1/app-work-plan',
        method: 'get',
        params: query
    })
}

// 查询AppWorkPlan详细
export function getAppWorkPlan (id) {
    return request({
        url: '/api/v1/app-work-plan/' + id,
        method: 'get'
    })
}


// 新增AppWorkPlan
export function addAppWorkPlan(data) {
    return request({
        url: '/api/v1/app-work-plan',
        method: 'post',
        data: data
    })
}

// 修改AppWorkPlan
export function updateAppWorkPlan(data) {
    return request({
        url: '/api/v1/app-work-plan/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除AppWorkPlan
export function delAppWorkPlan(data) {
    return request({
        url: '/api/v1/app-work-plan',
        method: 'delete',
        data: data
    })
}

