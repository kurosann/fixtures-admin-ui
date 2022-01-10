import request from '@/utils/request'

// 查询AppUser列表
export function listAppUser(query) {
  return request({
    url: '/api/v1/app-user',
    method: 'get',
    params: query
  })
}

// 查询AppUser详细
export function getAppUser(id) {
  return request({
    url: '/api/v1/app-user/' + id,
    method: 'get'
  })
}

// 新增AppUser
export function addAppUser(data) {
  return request({
    url: '/api/v1/app-user',
    method: 'post',
    data: data
  })
}

// 修改AppUser
export function updateAppUser(data) {
  return request({
    url: '/api/v1/app-user/' + data.id,
    method: 'put',
    data: data
  })
}

// 用户状态修改AppUser
export function updateAppUserState(data) {
  return request({
    url: '/api/v1/app-user/state/' + data.id,
    method: 'put',
    data: data
  })
}

// 查询子用户list
export function findSubUser(data) {
  return request({
    url: '/api/v1/app-user/sub_user/' + data.id,
    method: 'get'
  })
}

// 查询子用户list
export function GetByOrder(data) {
  return request({
    url: '/api/v1/app-user/user_order/' + data.id,
    method: 'get'
  })
}

// 查询子用户list
export function GetUserStateNum() {
  return request({
    url: '/api/v1/app-user/state_num',
    method: 'get'
  })
}

// 删除AppUser
export function delAppUser(data) {
  return request({
    url: '/api/v1/app-user',
    method: 'delete',
    data: data
  })
}

