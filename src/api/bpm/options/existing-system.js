import { bpmServer } from 'api/bpm/bpm-server';

export async function getExistingSystemOptions() {
  const response = await bpmServer
    .api()
    .url('/options/existing-system')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function createExistingSystemOption(data) {
  const response = await bpmServer
    .api()
    .url('/options/existing-system')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateExistingSystemOption(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/existing-system/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getExistingSystemOption(id) {
  const response = await bpmServer
    .api()
    .url('/options/existing-system/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
