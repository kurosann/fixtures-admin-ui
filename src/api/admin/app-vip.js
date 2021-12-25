import request from '@/utils/request'

// 查询AppVip列表
export function listAppVip(query) {
  return request({
    url: '/api/v1/app-vip',
    method: 'get',
    params: query
  })
}

// 查询AppVip详细
export function getAppVip(id) {
  return request({
    url: '/api/v1/app-vip/' + id,
    method: 'get'
  })
}

// 新增AppVip
export function addAppVip(data) {
  return request({
    url: '/api/v1/app-vip',
    method: 'post',
    data: data
  })
}

// 修改AppVip
export function updateAppVip(data) {
  return request({
    url: '/api/v1/app-vip/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除AppVip
export function delAppVip(data) {
  return request({
    url: '/api/v1/app-vip',
    method: 'delete',
    data: data
  })
}

