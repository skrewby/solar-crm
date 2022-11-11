import { bpmServer } from 'api/bpm/bpm-server';

const userHasRole = (user, roles) => {
  const has_role = user.roles.some((a) => roles.includes(a.label));
  return has_role;
};

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

export async function getSalesUsers() {
  const response = await bpmServer
    .api()
    .url('/users')
    .get()
    .json((response) => {
      if (response.data) {
        const sales = response.data.filter((user) => userHasRole(user, ['Sales']));
        return { data: sales };
      }
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

export async function createUserPassword(id, data) {
  const response = await bpmServer
    .api()
    .url('/users/' + id + '/create-password')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
