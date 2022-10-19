import { bpmServer } from 'api/bpm/bpm-server';

export async function getStockTypes() {
  const response = await bpmServer
    .api()
    .url('/options/stock-types')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addStockType(data) {
  const response = await bpmServer
    .api()
    .url('/options/stock-types')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateStockType(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/stock-types/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getStockType(id) {
  const response = await bpmServer
    .api()
    .url('/options/stock-types/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
