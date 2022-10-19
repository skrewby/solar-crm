import { bpmServer } from 'api/bpm/bpm-server';

export async function getPhases() {
  const response = await bpmServer
    .api()
    .url('/options/phases')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function createPhase(data) {
  const response = await bpmServer
    .api()
    .url('/options/phases')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updatePhase(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/phases/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getPhase(id) {
  const response = await bpmServer
    .api()
    .url('/options/phases/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
