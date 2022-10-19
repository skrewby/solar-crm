import { bpmServer } from 'api/bpm/bpm-server';

export async function getUser(id) {
  const response = await bpmServer
    .api()
    .url('/users/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getUsers() {
  const response = await bpmServer
    .api()
    .url('/users')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addUser(data) {
  const response = await bpmServer
    .api()
    .url('/users')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateUser(id, data) {
  const response = await bpmServer
    .api()
    .url('/users/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function changeUserPassword(id, data) {
  const response = await bpmServer
    .api()
    .url('/users/' + id + '/change-password')
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function setUserRoles(id, data) {
  const response = await bpmServer
    .api()
    .url('/users/' + id + '/roles')
    .put(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
