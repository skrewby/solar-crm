import { bpmServer } from './bpm-server';

export async function login(email, password) {
  const res = await bpmServer
    .api()
    .url('/auth/login')
    .post({ email, password })
    .json((response) => {
      return response;
    });

  return Promise.resolve(res);
}

export async function refresh() {
  const res = await bpmServer
    .api()
    .url('/auth/refresh')
    .post()
    .json((response) => {
      return response;
    });

  return Promise.resolve(res);
}

export async function getCurrentUser() {
  const res = await bpmServer
    .api()
    .url('/auth/me')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(res);
}

export async function logout() {
  window.sessionStorage.removeItem('idToken');
  bpmServer.api().url('/auth/logout').get();

  return Promise.resolve();
}
