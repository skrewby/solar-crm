import { bpmServer } from 'api/bpm/bpm-server';

export async function getLeadSources() {
  const response = await bpmServer
    .api()
    .url('/options/lead-sources')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function createLeadSource(data) {
  const response = await bpmServer
    .api()
    .url('/options/lead-sources')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateLeadSource(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/lead-sources/' + id)
    .put(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getLeadSource(id) {
  const response = await bpmServer
    .api()
    .url('/options/lead-sources/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
