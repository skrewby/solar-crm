import { bpmServer } from 'api/bpm/bpm-server';

export async function getStates() {
  const response = await bpmServer
    .api()
    .url('/options/states')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addState(data) {
  const response = await bpmServer
    .api()
    .url('/options/states')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateState(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/states/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getState(id) {
  const response = await bpmServer
    .api()
    .url('/options/states/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
