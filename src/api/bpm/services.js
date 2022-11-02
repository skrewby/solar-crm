import { bpmServer } from 'api/bpm/bpm-server';

export async function getService(id) {
  const response = await bpmServer
    .api()
    .url('/services/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getServices() {
  const response = await bpmServer
    .api()
    .url('/services')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addService(data) {
  const response = await bpmServer
    .api()
    .url('/services')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateService(id, data) {
  const response = await bpmServer
    .api()
    .url('/services/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addServiceItem(id, data) {
  const response = await bpmServer
    .api()
    .url('/services/' + id + '/items')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateServiceItem(id, data) {
  const response = await bpmServer
    .api()
    .url('/services/' + id + '/items')
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
