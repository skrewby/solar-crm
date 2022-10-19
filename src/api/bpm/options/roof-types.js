import { bpmServer } from 'api/bpm/bpm-server';

export async function getRoofTypes() {
  const response = await bpmServer
    .api()
    .url('/options/roof-types')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addRoofType(data) {
  const response = await bpmServer
    .api()
    .url('/options/roof-types')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateRoofType(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/roof-types/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getRoofType(id) {
  const response = await bpmServer
    .api()
    .url('/options/roof-types/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
