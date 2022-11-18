import { bpmServer } from 'api/bpm/bpm-server';

export async function getLead(id) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getLeads() {
  const response = await bpmServer
    .api()
    .url('/leads')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addLead(data) {
  const response = await bpmServer
    .api()
    .url('/leads')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateLead(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addLeadItem(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/items')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateLeadItem(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/items')
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function deleteLeadItem(id, item_id) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/items/' + item_id)
    .delete()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addLeadLog(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/logs')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getLeadLogs(id) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/logs')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addLeadFile(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/files')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function getLeadFiles(id) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/files')
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function deleteLeadFile(lead_id, file_id) {
  const response = await bpmServer
    .api()
    .url('/leads/' + lead_id + '/files/' + file_id)
    .delete()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addLeadSystemItem(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/system')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function deleteLeadSystemItem(id, item) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/system/' + item)
    .delete()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateLeadSystemItem(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/system/' + data.id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function addLeadExtra(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/extras')
    .post(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function deleteLeadExtra(id, item) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/extras/' + item)
    .delete()
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function updateLeadExtra(id, data) {
  const response = await bpmServer
    .api()
    .url('/leads/' + id + '/extras/' + data.id)
    .patch(data)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}
