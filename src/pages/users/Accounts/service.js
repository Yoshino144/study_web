// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function rule(params, options) {
  return request('https://air.pcat.top/users/all', {
    params,
    method: 'GET',
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(data, options) {
  return request('https://air.pcat.top/users/pageModifyUser', {
    data,
    method: 'POST',

  });
}
/** 新建规则 POST /api/rule */

export async function addRule(data) {
  return request('https://air.pcat.top/users/pageAddUser', {
    data,
    changeOrigin: true,
    method: 'POST',
    // ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(data, options) {
  return request('https://air.pcat.top/users/pageDeleteUser', {
    data,
    method: 'POST',
    // ...(options || {}),
  });
}
