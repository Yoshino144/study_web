// @ts-ignore

/* eslint-disable */
import { request } from 'umi';

/** 获取规则列表 GET /api/rule */
export async function rule(params) {

  console.log("arams");
  console.log(params.q);
  return request('https://air.pcat.top/chapters/page/'+params.q, {
    method: 'GET',
  });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/rule */

export async function addRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */
export async function removeRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
