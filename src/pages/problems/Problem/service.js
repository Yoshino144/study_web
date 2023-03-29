import {history, request} from 'umi';
export async function queryAdvancedProfile(params) {

  console.log("请求服务");
  console.log(params);
  return request('https://air.pcat.top/problems/page/'+params.subjectId+'/'+params.chapterId, {
    method: 'GET',
  });
}
