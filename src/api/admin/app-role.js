import request from '@/utils/request'

// 查询AppRole列表
export function listAppRole(query) {
  return request({
    url: '/api/v1/app-role',
    method: 'get',
    params: query
  })
}

// 查询AppRole详细
export function getAppRole(id) {
  return request({
    url: '/api/v1/app-role/' + id,
    method: 'get'
  })
}

// 新增AppRole
export function addAppRole(data) {
  return request({
    url: '/api/v1/app-role',
    method: 'post',
    data: data
  })
}

// 修改AppRole
export function updateAppRole(data) {
  return request({
    url: '/api/v1/app-role/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除AppRole
export function delAppRole(data) {
  return request({
    url: '/api/v1/app-role',
    method: 'delete',
    data: data
  })
}

