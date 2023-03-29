import {request} from 'umi';

export async function fakeSubmitForm(params) {
  return request('https://air.pcat.top/subjects/add', {
    method: 'POST',
    data: params,
    params: {
      subjectName: params.subjectName,
      subjectDesc: params.subjectDesc,
      subjectPrivate: params.subjectPrivate,
    },
  });
}
