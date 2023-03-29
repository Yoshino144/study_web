import { request } from 'umi';
export async function queryFakeList(params) {
  return request('https://air.pcat.top/subjects/all', {
    method: 'GET',
  });
}
