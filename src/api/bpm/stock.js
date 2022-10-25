import { bpmServer } from 'api/bpm/bpm-server';

export async function getStock() {
  const response = await bpmServer
    .api()
    .url('/stock')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getStockItem(id) {
  const response = await bpmServer
    .api()
    .url('/stock/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addStockItem(data) {
  const response = await bpmServer
    .api()
    .url('/stock')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateStockItem(id, data) {
  const response = await bpmServer
    .api()
    .url('/stock/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
