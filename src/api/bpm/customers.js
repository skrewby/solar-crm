import { bpmServer } from 'api/bpm/bpm-server';

export async function getCustomer(id) {
  const response = await bpmServer
    .api()
    .url('/customers/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getCustomers() {
  const response = await bpmServer
    .api()
    .url('/customers')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addCustomer(data) {
  const response = await bpmServer
    .api()
    .url('/customers')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateCustomer(id, data) {
  const response = await bpmServer
    .api()
    .url('/customers/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
