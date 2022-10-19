import { bpmServer } from 'api/bpm/bpm-server';

export async function getStories() {
  const response = await bpmServer
    .api()
    .url('/options/stories')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function createStory(data) {
  const response = await bpmServer
    .api()
    .url('/options/stories')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateStory(id, data) {
  const response = await bpmServer
    .api()
    .url('/options/stories/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getStory(id) {
  const response = await bpmServer
    .api()
    .url('/options/stories/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
