import { bpmServer } from 'api/bpm/bpm-server';

export async function getRoles() {
  const response = await bpmServer
    .api()
    .url('/options/roles')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateRole(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/roles/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
