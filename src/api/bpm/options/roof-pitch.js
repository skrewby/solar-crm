import { bpmServer } from 'api/bpm/bpm-server';

export async function getRoofPitches() {
  const response = await bpmServer
    .api()
    .url('/options/roof-pitch')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addRoofPitch(data) {
  const response = await bpmServer
    .api()
    .url('/options/roof-pitch')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateRoofPitch(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/roof-pitch/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getRoofPitch(id) {
  const response = await bpmServer
    .api()
    .url('/options/roof-pitch/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
