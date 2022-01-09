import request from '@/utils/request'

// 查询SysContent列表
export function listSysContent(query) {
  return request({
    url: '/api/v1/app-content',
    method: 'get',
    params: query
  })
}

// 查询SysContent详细
export function getSysContent(id) {
  return request({
    url: '/api/v1/app-content/' + id,
    method: 'get'
  })
}

// 新增SysContent
export function addSysContent(data) {
  return request({
    url: '/api/v1/app-content',
    method: 'post',
    data: data
  })
}

// 修改SysContent
export function updateSysContent(data) {
  return request({
    url: '/api/v1/app-content/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除SysContent
export function delSysContent(data) {
  return request({
    url: '/api/v1/app-content',
    method: 'delete',
    data: data
  })
}

